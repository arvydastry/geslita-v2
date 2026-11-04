#!/usr/bin/env python3
"""Statinė patikra: nuorodos, inkarai, paveikslėliai, brūkšniai, šablonų liekanos, h1, eyebrow skaičius. python3 check.py <projektas>"""
import os, re, sys, html
from html.parser import HTMLParser
root=sys.argv[1]
pages=[f for f in os.listdir(root) if f.endswith('.html')]
class P(HTMLParser):
    def __init__(s): super().__init__(); s.ids=set(); s.links=[]; s.imgs=[]; s.h1=0; s.eyebrows=0; s.sections=0; s.text=[]; s.skip=0; s.iframes=0; s.noalt=0
    def handle_starttag(s,t,a):
        d=dict(a)
        if d.get('id'): s.ids.add(d['id'])
        if t=='a' and d.get('href'): s.links.append(d['href'])
        if t=='img':
            s.imgs.append(d.get('src','')); 
            if 'alt' not in d: s.noalt+=1
        if t=='h1': s.h1+=1
        if t=='section': s.sections+=1
        if 'eyebrow' in (d.get('class') or '').split(): s.eyebrows+=1
        if t in ('script','style'): s.skip+=1
        if t=='iframe': s.iframes+=1
    def handle_endtag(s,t):
        if t in ('script','style'): s.skip-=1
    def handle_data(s,d):
        if not s.skip: s.text.append(d)
data={}
for f in pages:
    p=P(); src=open(os.path.join(root,f),encoding='utf-8').read(); p.feed(src); data[f]=(p,src)
problems=0
for f,(p,src) in sorted(data.items()):
    txt=''.join(p.text); issues=[]
    if p.h1!=1: issues.append(f"h1 count {p.h1}")
    if '{{' in src or '}}' in src: issues.append("template leftovers {{ }}")
    if re.search(r'>\s*None\s*<', src): issues.append("'None' rendered")
    if '–' in txt or '—' in txt: issues.append(f"dashes in text: {txt.count('–')} en, {txt.count('—')} em")
    if p.noalt: issues.append(f"{p.noalt} img without alt")
    if p.sections and p.eyebrows > -(-p.sections//3): issues.append(f"eyebrows {p.eyebrows} > ceil({p.sections}/3)")
    for href in p.links:
        if href.startswith(('http','mailto:','tel:','#','javascript')):
            if href.startswith('#') and href!='#' and href[1:] not in p.ids: issues.append(f"missing anchor {href}")
            continue
        path,_,anchor=href.partition('#')
        if path and not os.path.exists(os.path.join(root,path)): issues.append(f"broken link {href}")
        elif anchor and path in data and anchor not in data[path][0].ids: issues.append(f"missing anchor {href}")
    for s in p.imgs:
        if s.startswith('http'): continue
        if not os.path.exists(os.path.join(root,s)): issues.append(f"missing image {s}")
    status='OK' if not issues else 'ISSUES'
    if issues: problems+=len(issues)
    print(f"{f:32s} {status:6s} sections={p.sections:2d} eyebrows={p.eyebrows} imgs={len(p.imgs):3d} links={len(p.links):3d} words={len(txt.split()):5d}" + (("\n   - "+"\n   - ".join(issues)) if issues else ''))
print("TOTAL problems:", problems)
