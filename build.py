#!/usr/bin/env python3
"""Geslita demo v2: statinis generatorius. python3 build.py -> sugeneruoja *.html iš templates/ ir content/*.json.
Nuotraukų nuorodos turinyje: "foto:<vardas>" (assets/img/foto), "geslita:<kelias svetainėje>" (katalogas / geslita archyvas,
trūkstamos parsisiunčiamos iš geslita.lt), arba tiesioginis kelias."""
import json, os, re, subprocess, sys, urllib.parse
from jinja2 import Environment, FileSystemLoader, select_autoescape

ROOT = os.path.dirname(os.path.abspath(__file__))
CONTENT = os.path.join(ROOT, 'content')
KAT = os.path.join(ROOT, 'assets', 'img', 'katalogas')
GES = os.path.join(ROOT, 'assets', 'img', 'geslita')
missing = []

def clean(o):
    """Brūkšniai tekste: ilgieji/vidutiniai brūkšniai keičiami į trumpą brūkšnelį (tipografinė taisyklė demo versijai)."""
    if isinstance(o, str): return o.replace(' – ', ' - ').replace(' — ', ' - ').replace('–', '-').replace('—', '-')
    if isinstance(o, list): return [clean(x) for x in o]
    if isinstance(o, dict): return {k: clean(v) for k, v in o.items()}
    return o

def load(name):
    p = os.path.join(CONTENT, name + '.json')
    if not os.path.exists(p):
        print(f'  ! trūksta content/{name}.json', file=sys.stderr); return {}
    with open(p, encoding='utf-8') as f: return clean(json.load(f))

def slug_v1(rel):
    """v1 katalogo vardų schema: uploads/images/<folder>/<file> -> <folder>--<file> (mažosios, tarpai -> '-')."""
    parts = rel.replace('uploads/images/', '').split('/')
    def s(x):
        base, ext = os.path.splitext(x)
        base = re.sub(r'[^a-z0-9]+', '-', base.lower().replace('ą','a').replace('č','c').replace('ę','e').replace('ė','e').replace('į','i').replace('š','s').replace('ų','u').replace('ū','u').replace('ž','z')).strip('-')
        return base + ext.lower()
    if len(parts) == 1: return s(parts[0])
    return s(parts[0]) + '--' + s(parts[-1])

def sanitized(rel):
    return re.sub(r'[^A-Za-z0-9._-]+', '_', urllib.parse.unquote(rel.split('/')[-1]))

def img(src):
    if not src: return ''
    if src.startswith('foto:'): return f'assets/img/foto/{src[5:]}.jpg'
    if src.startswith('geslita:'):
        rel = src[8:].lstrip('/').replace('../', '')
        c1 = slug_v1(rel)
        if os.path.exists(os.path.join(KAT, c1)): return f'assets/img/katalogas/{c1}'
        c2 = sanitized(rel)
        if os.path.exists(os.path.join(GES, c2)): return f'assets/img/geslita/{c2}'
        # parsisiųsti iš geslita.lt
        url = 'https://www.geslita.lt/' + urllib.parse.quote(rel)
        dst = os.path.join(GES, c2)
        try:
            subprocess.run(['curl', '-sL', '--max-time', '40', '-o', dst, url], check=True)
            if os.path.getsize(dst) > 500:
                print(f'  + parsisiųsta {rel} -> {c2}'); return f'assets/img/geslita/{c2}'
            os.remove(dst)
        except Exception as e:
            pass
        missing.append(rel); return url
    if src.startswith('katalogas:'): return f'assets/img/katalogas/{src[10:]}'
    return src

FOTO = os.path.join(ROOT, 'assets', 'img', 'foto')
IMG_RE = re.compile(r'<img([^>]*?)src="assets/img/foto/([a-z0-9-]+)\.jpg"([^>]*)>')

def add_srcset(html):
    """Pexels nuotraukoms prideda WebP srcset (640/1280/1920) ir numatytą sizes, jei šablonas jo nenurodė."""
    def rep(m):
        pre, name, post = m.group(1), m.group(2), m.group(3)
        tag = m.group(0)
        if 'srcset=' in tag or not os.path.exists(os.path.join(FOTO, f'{name}-640.webp')): return tag
        srcset = ', '.join(f'assets/img/foto/{name}-{w}.webp {w}w' for w in (640, 1280, 1920))
        sizes = '' if 'sizes=' in tag else ' sizes="(max-width: 960px) 92vw, 50vw"'
        return f'<img{pre}src="assets/img/foto/{name}.jpg" srcset="{srcset}"{sizes}{post}>'
    return IMG_RE.sub(rep, html)

LT_WORD = re.compile(r'(?<!\w)(Lietuvoje|Lietuva|Lietuvą)(?!\w)')
LT_SKIP = ('head', 'script', 'style', 'title', 'svg', 'textarea', 'option', 'select')

def add_lt_flags(html):
    """Prie žodžių „Lietuva“, „Lietuvoje“, „Lietuvą“ matomame tekste prideda Lietuvos vėliavėlę.
    „Lietuvos“ neliečiama (dažniausiai teisės aktų pavadinimai). Atributai, <head>, skriptai, SVG ir formos laukai praleidžiami."""
    out, skip = [], []
    for tok in re.split(r'(<[^>]+>)', html):
        if tok.startswith('<'):
            m = re.match(r'<(/?)([a-zA-Z0-9]+)', tok)
            if m:
                closing, name = m.group(1) == '/', m.group(2).lower()
                if name in LT_SKIP and not tok.endswith('/>'):
                    if closing:
                        if skip and skip[-1] == name: skip.pop()
                    else: skip.append(name)
            out.append(tok)
        elif skip or 'Lietuv' not in tok:
            out.append(tok)
        else:
            # visas teksto mazgas apgaubiamas vienu <span>, kad flex/grid tėvuose jis liktų vienu elementu (be papildomų tarpų)
            out.append('<span class="ltx">' + LT_WORD.sub(r'<span class="lt">\1<span class="lt-flag" aria-hidden="true"></span></span>', tok) + '</span>')
    return ''.join(out)

def main():
    env = Environment(loader=FileSystemLoader(os.path.join(ROOT, 'templates')), autoescape=select_autoescape(['html']), trim_blocks=True, lstrip_blocks=True)
    env.globals['img'] = img
    data = {k: load(k) for k in ['site', 'home', 'services', 'alarm', 'evacuation', 'lighting', 'training', 'products', 'signs', 'about', 'useful']}
    pages = [
        ('index.html', 'index.html', 'index'),
        ('paslaugos.html', 'paslaugos.html', 'paslaugos'),
        ('gesintuvu-patikra.html', 'gesintuvu-patikra.html', 'paslaugos'),
        ('gaisrine-signalizacija.html', 'gaisrine-signalizacija.html', 'paslaugos'),
        ('evakuacijos-planai.html', 'evakuacijos-planai.html', 'paslaugos'),
        ('avariniai-sviestuvai.html', 'avariniai-sviestuvai.html', 'paslaugos'),
        ('saugos-centras.html', 'saugos-centras.html', 'saugos-centras'),
        ('prekes.html', 'prekes.html', 'prekes'),
        ('prekes-gesintuvai.html', 'prekes-gesintuvai.html', 'prekes'),
        ('prekes-vandentiekis.html', 'prekes-vandentiekis.html', 'prekes'),
        ('prekes-zenklai.html', 'prekes-zenklai.html', 'prekes'),
        ('prekes-automatika.html', 'prekes-automatika.html', 'prekes'),
        ('apie-mus.html', 'apie-mus.html', 'apie'),
        ('naudinga-informacija.html', 'naudinga-informacija.html', 'naudinga'),
        ('kontaktai.html', 'kontaktai.html', 'kontaktai'),
        # Hero variantai klientui palyginti: tas pats pradžios puslapis, kitas hero
        # Pasirinktas 1 variantas (video) yra index.html; 2 ir 3 paliekami palyginimui
        ('index.html', 'hero-2-nuotraukos.html', 'index', {'hero_variant': 'photos', 'show_switch': True}),
        ('index.html', 'hero-3-slankiklis.html', 'index', {'hero_variant': 'slider', 'show_switch': True}),
    ]
    only = sys.argv[1:]
    for tpl, out, page, *extra in pages:
        if only and out not in only: continue
        if not os.path.exists(os.path.join(ROOT, 'templates', tpl)):
            print(f'  - nėra šablono {tpl}, praleidžiama'); continue
        ctx = dict(data, hero_variant='video', show_switch=False); ctx.update(extra[0] if extra else {})
        html = env.get_template(tpl).render(page=page, **ctx)
        html = add_srcset(html)
        html = add_lt_flags(html)
        with open(os.path.join(ROOT, out), 'w', encoding='utf-8') as f: f.write(html)
        print(f'  ✓ {out} ({len(html)//1024} KB)')
    if missing: print('  ! nerastos nuotraukos:', *missing, sep='\n    ')

if __name__ == '__main__': main()
