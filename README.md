# Geslita: demo dizainas v2 („šviesi inžinerija“)

Antroji demonstracinė **geslita.lt** svetainės versija. Pirmoji kryptis (tamsus grafitas, dūmų video, signalinė raudona) klientui netiko, todėl ši versija yra **visiškai kita kryptis**: šviesi, architektūriška, tiksli. Galutinė svetainė bus kuriama su **WordPress + Salient**, todėl kiekvienas blokas suplanuotas taip, kad jį būtų galima surinkti iš natyvių Salient elementų (žr. atitikmenų lentelę ir `docs/salient-brief.md`).

Projektas patvirtintas, todėl demo versijoje yra **visas senosios svetainės turinys**: 10 paslaugų su kainoraščiais ir 10 kitų paslaugų grupių, 4 prekių grupės (77 prekės su 103 kainų pozicijomis ir 102 saugos ženklai su 179 dydžių variantais), saugos centras su mokymų kainininku (29 programos), naudinga informacija (15 dokumentų, 4 vaizdo klipai), kontaktai su žemėlapiu.

## Peržiūra

- **Gyva versija:** <https://arvydastry.github.io/geslita-v2/> (GitHub Pages iš saugyklos <https://github.com/arvydastry/geslita-v2> `main` šakos šaknies). Atnaujinimas: `python3 build.py`, tada `git add -A && git commit -m "..." && git push`; Pages persigeneruoja per ~1 min. Failas `.nojekyll` reikalingas, kad Pages neapdorotų failų Jekyll.
- Atidaryti `index.html` naršyklėje arba paleisti `python3 serve.py` ir atverti <http://localhost:8130/> (`.claude/launch.json` sukonfigūruotas; `serve.py` yra paprastas serveris su gijomis).
- `?static=1` prie bet kurio puslapio adreso išjungia judesio efektus (visos animacijos baigtos): patogu ekrano nuotraukoms ir peržiūrai.
- Visi puslapiai turi `noindex, nofollow`; užklausos forma yra demonstracinė (tikrina laukus, bet duomenų niekur nesiunčia).
- Statinė patikra: `python3 build.py` sugeneruoja visus puslapius; `python3 tools/check.py .` patikrina nuorodas, inkarus, nuotraukas, h1, alt tekstus ir brūkšnius (šiuo metu 0 problemų). `python3 tools/shot.py <puslapis.html> 1440 8000 out.png 1400` padaro ekrano nuotrauką headless Chrome naršykle (plotis < 500 px imituoja telefoną).

## Kryptis

**Dizaino perskaitymas:** B2B paslaugų svetainė objektų administratoriams ir įmonių vadovams; kalba rami, profesionali, „inžinerinė“; daug gylio, bet jokio triukšmo.

| | v1 (atmesta) | v2 (ši versija) |
|---|---|---|
| Nuotaika | tamsi, dūmai, „ugnis nelaukia“ | šviesi, švarūs pastatų interjerai, tvarka ir dokumentai |
| Fonas | grafitas `#14161B` | vėsus šviesus `#F4F6F9`, baltos kortelės, viena tamsiai mėlyna juosta per puslapį |
| Akcentas | signalinė raudona visur | firminė liepsnos raudona `#D62828` tik veiksmams (CTA), rašalas tamsiai mėlynas `#0E1A2B` |
| Šriftai | Archivo / Manrope | **Schibsted Grotesk** (antraštės) / **Instrument Sans** (tekstas), abu su lietuviškais rašmenimis |
| Hero | Lietuvos žemėlapis, tamsus viso ekrano dūmų video | šviesus hero: tamsiai mėlyni dūmai (video) kyla už tikro Geslitos gesintuvo, stiklinė kortelė „20 metų patirtis“, evakuacijos plano linijų grafika, ženklelis „Dirbame visoje Lietuvoje“ |
| Grafinis motyvas | – | **tikro Geslitos evakuacijos plano linijos** (kontūrai ir žalias maršrutas) kaip gylio sluoksnis hero, tamsioje juostoje, poraštėje |
| Formos | 12 / 7 px | medija ir kortelės 18 px, mygtukai ir laukeliai 10 px, žymos pill |

### Gylio priemonės (santūrios, bet jų daug)

1. **Hero su dūmų video** (klientas pasirinko iš trijų variantų, žr. [`docs/hero-variantai.md`](docs/hero-variantai.md)): Pexels klipas apverstas į tamsiai mėlynus dūmus baltame fone, `mix-blend-mode: multiply` paslepia baltą foną, kaukė dūmus išblukina ties tekstu ir hero apačioje. Dūmuose stovi tikras Geslitos gesintuvas (išpjova iš katalogo nuotraukos), kuris lėtai plūduriuoja ir seka pelę. Šalia jo yra stiklinė kortelė „20 metų patirtis“ su skaičiavimo animacija. Dūmai, gesintuvas, kortelė ir plano linijos juda skirtingu parallax greičiu. Įėjimas yra viena seka: palaukiama šriftų ir gesintuvo nuotraukos (ne ilgiau kaip 0,9 s), tada ženklelis, antraštė, tekstas, gesintuvas, dūmai, mygtukai ir kortelė išryškėja paeiliui per ~1,2 s (CSS perėjimai su atskiromis `translate`/`scale` savybėmis, kad nesikirstų su parallax). Jei JS nesuveikia, viskas parodoma po 2,4 s; esant „mažiau judesio“ nustatymui elementai rodomi iš karto.
2. **Paslaugų kortelės** su nuotrauka, kylančios ant hover, laipsniškas atsiradimas (stagger).
3. **Evakuacijos juosta**: vienintelis tamsus blokas, plano linijų vandenženklis su parallax, žalias maršrutas „nusipiešia“ įslinkus į ekraną (clip-path), tikras Geslitos parengtas aukšto planas su užslenkančiu šviečiančio plano pavyzdžiu.
4. **„Kaip vyksta darbai“**: lipni kairė kolona (sticky) su nuotrauka, dešinėje trys numeruoti žingsniai, fone plano linijų vandenženklis su parallax.
5. **Prekių bento**: iškirptas gesintuvas su šešėliu (kyla ant hover), ženklų ikonų kolekcija, tyliai besisukantis automatikos video plytelėje.
6. **Mokymų programos lapas**: proporcinga 3 valandų laiko juosta (segmentų plotis pagal temų trukmę, išauga paeiliui), visos 5 temos su oficialiomis 2 ir 3 temos potemėmis, temos ir juostos segmento paryškinimas užvedus pelę, didelis kontūrinis „3:00“ fone su parallax. Šone privalomumo pagrindas, kas įeina į mokymus ir užsakymo mygtukas, apačioje nuorodos į kitas saugos centro paslaugas.
7. **Kontaktų skydelis** šviesiame brėžinio tinklelio fone su dviem švytėjimais, kurie slenka parallax. Kairė kortelės pusė tamsiai mėlyna: antraštė, dideli telefono numeriai, el. paštas, darbo laikas ir taškinis Lietuvos žemėlapis (Natural Earth kontūras, SVG raštas, 3 KB) su pulsuojančia Vilniaus žyma, „20 metų patirtis“ ir „Atvykstame į objektus visoje Lietuvoje“. Dešinėje forma su paslaugų žymomis „Ko reikia?“.
8. **Lietuvos vėliavėlė** automatiškai pridedama prie žodžių „Lietuva“, „Lietuvoje“, „Lietuvą“ visame matomame tekste (`build.py`, funkcija `add_lt_flags`). „Lietuvos“ neliečiama, nes tai dažniausiai teisės aktų pavadinimai. Vėliavėlė yra CSS elementas (3:5, oficialios spalvos), jos dydis priklauso nuo šrifto.
8. Vidiniai puslapiai: lipni šoninė navigacija ilguose puslapiuose, akordeonai teisės aktų tekstams, lentelės kainoms, galerijos tikroms Geslitos nuotraukoms.

Visi judesio efektai paiso `prefers-reduced-motion`; animuojamos tik `transform` ir `opacity`; parallax be `scroll` klausytojų (GSAP ScrollTrigger + IntersectionObserver).

## Puslapiai

| Puslapis | Failas | Turinys |
|---|---|---|
| Pradžia | `index.html` | hero, 7 paslaugų kortelės su kainomis (prioritetas iš geslita.lt/paslaugos), evakuacijos planai, procesas, prekių bento, mokymų programa, užklausos forma |
| Atmesti hero variantai | `hero-2-nuotraukos.html`, `hero-3-slankiklis.html` | palikti palyginimui: keturių paslaugų nuotraukų mozaika ir paslaugų slankiklis. Pasirinktas 1 variantas (video) yra `index.html`; palyginimas [`docs/hero-variantai.md`](docs/hero-variantai.md) |
| Paslaugos ir kainos | `paslaugos.html` | hero su technikės gaisrinio vandentiekio patalpoje nuotrauka, piktogramų nuotrauka, kainų kortele ir skaičiais, po juo 10 paslaugų rodyklė su ikonomis ir kainomis; toliau visos 10 paslaugų su kainoraščiais, periodiškumu, teisiniu pagrindu, PDF; „Kitos paslaugos verslui“ (10 grupių) |
| Gesintuvų patikra ir pildymas | `gesintuvu-patikra.html` | 3 kainų lentelės (MG-2…MG-100, AG-2…AG-50, VPG-5…VPG-100), gesintuvų tipai, pildymo įrangos nuotraukos, instrukcijos PDF |
| Gaisrinė signalizacija | `gaisrine-signalizacija.html` | paslaugos, kaina, sistemos komponentai, 7 Geslitos nuotraukos, eksploatavimo taisyklių santrauka ir pilnas tekstas akordeonuose, DUK |
| Evakuacijos planai | `evakuacijos-planai.html` | hero su tikru Geslitos planu rėmelyje: rėmelio spalvos ir šviesos jungiklis (išjungus hero patamsėja, planas šviečia kaip fotoliuminescencinis), privalumų juosta, slenkant ryškėjantis apibrėžimas, 3 teisės aktai, 9 reikalavimai su tikra sutartinių ženklų legenda, VDI pozicija su išvada, planų pavyzdžiai, kontrolinis sąrašas „ką atsiųsti“ ir užsakymo eiga |
| Avariniai šviestuvai | `avariniai-sviestuvai.html` | EN 1838 rekomendacijos: apšvietimo rūšys, priežiūra, matymo atstumas, 3 žingsniai su schemomis, akinimo lentelė, rekomendacijų lentelės, taisyklių ištrauka, 4 šviestuvai |
| Saugos centras | `saugos-centras.html` | darbuotojų mokymų programa (3 val.), mokymų kainininkas (21 + 3 + 5 programos), gaisrinės saugos instrukcija, ESVP, DSS dokumentacija, 2012 m. pakeitimų archyvas |
| Prekės | `prekes.html` | 4 grupių bento, „taip pat prekiaujame“, kaip užsakyti |
| Prekės: gesintuvai | `prekes-gesintuvai.html` | naujos kartos vandens putų gesintuvai (versijos ir techniniai duomenys), milteliniai, angliarūgštiniai, vandens putų, automatiniai, priedai (16 prekių) |
| Prekės: gaisrinis vandentiekis | `prekes-vandentiekis.html` | spintelės, galvutės, čiaupai, švirkštai, žarnos, skydai ir smėlio dėžės, dėžutės raktams, hidrantai, sprinkleriai (27 prekės) |
| Prekės: saugos ženklai | `prekes-zenklai.html` | 102 ženklai 9 grupėse su dydžiais ir kainomis su PVM, paieška pagal kodą ar pavadinimą, lipni grupių juosta |
| Prekės: automatika ir įranga | `prekes-automatika.html` | detektoriai, sirenos, pavojaus mygtukai, šviestuvai, kibirkščių gesikliai, nedegūs audeklai, saugos rinkiniai, darbo saugos priemonės (34 prekės, paieška) |
| Apie mus | `apie-mus.html` | sluoksniuotas hero („20 metų…“, nuotrauka, Geslitos gesintuvas, kortelė „Visa Lietuva“), judanti paslaugų juosta, didelis teiginys su slenkant ryškėjančiais žodžiais ir kontūriniu „20“, faktai su skaičiavimu, numeruotas 12 paslaugų sąrašas, prekių mozaika, saugos centras, kontaktai su Lietuvos žemėlapiu |
| Naudinga informacija | `naudinga-informacija.html` | 15 PDF dokumentų, 4 YouTube vaizdo klipai, 2012 m. taisyklių pakeitimų straipsnis |
| Kontaktai | `kontaktai.html` | hero su gyvu darbo laiko indikatoriumi (pagal Vilniaus laiką), greitais kontaktais (telefonai, el. paštas su kopijavimo mygtuku, Facebook) ir taškiniu Lietuvos žemėlapiu, kuriame iš Vilniaus būstinės į 8 miestus nusipiešia maršrutai, užsakymo eiga iš 3 žingsnių ir ta pati užklausos forma su paslaugų žymomis, „Kur mus rasti“ su adreso pastaba ir OpenStreetMap žemėlapiu |

## Struktūra ir generavimas

Demo yra statinis HTML / CSS / vanilla JS, bet generuojamas iš šablonų, kad turinys ir dizainas būtų atskirti:

```
build.py                 # python3 build.py  -> sugeneruoja visus *.html (reikia jinja2)
templates/base.html      # antraštė, meniu, poraštė, ikonos
templates/_macros.html   # page_hero, table, acc, product, cta_inline ir kt.
templates/*.html         # po vieną šabloną kiekvienam puslapiui
content/*.json           # visas turinys (perkeltas iš geslita.lt ir patikrintas)
assets/css/style.css     # dizaino sistema
assets/js/main.js        # elgsena (meniu, atsiradimai, parallax, paieška, forma)
assets/img/katalogas/    # 174 originalios geslita.lt katalogo nuotraukos
assets/img/geslita/      # kitos originalios geslita.lt nuotraukos (planai, įranga, logotipas)
assets/img/foto/         # Pexels nuotraukos (žr. docs/pexels-credits.md)
assets/img/cutout/       # iškirpti produktai permatomu fonu
assets/video/            # Pexels video: hero dūmai (dumai-1600, dumai-720), automatikos plytelė
docs/                    # Salient apžvalga, hero variantų palyginimas, patikslintino turinio sąrašas, Pexels kreditai
tools/                   # check.py (statinė patikra) ir shot.py (ekrano nuotraukos)
serve.py                 # peržiūros serveris (python3 serve.py)
```

Turinio failuose nuotraukos žymimos `foto:<vardas>` (Pexels) arba `geslita:<kelias senojoje svetainėje>`; trūkstamos `geslita:` nuotraukos generuojant parsisiunčiamos automatiškai.

## Dizaino sistema

- **Spalvos:** fonas `#F4F6F9` / `#E9EDF3`, paviršiai `#FFFFFF`, rašalas `#0E1A2B`, tamsiai mėlyna juosta `#132340`, tekstas `#3B4756`, linijos `#D9DFE7`, akcentas `#D62828` (hover `#B31D1D`), žalia `#16A34A` tik varnelėms ir evakuacijos maršrutui.
- **Šriftai (Google Fonts, latin-ext):** Schibsted Grotesk 600–700 (antraštės, tracking −0,02 em), Instrument Sans 400–600 (tekstas, meniu, mygtukai).
- **Logotipas:** iš geslita.lt didžiojo logotipo (`uploads/images/geslita logo large.jpg`) padarytos permatomos PNG versijos tamsiam ir šviesiam fonui; favicon – liepsna.
- **Tinklelis:** turinio plotis 1240 px, sekcijų tarpai `clamp(68px, 9vw, 128px)`, lūžiai 1240 / 1120 / 1023 / 960 / 900 / 640 / 560 px.
- **Šešėliai:** trys lygiai, tamsiai mėlynu atspalviu, be juodų šešėlių.

## Salient atitikmenys

Išsami apžvalga (antraštės nustatymai, hero šeimos, gylio priemonės pagal poveikį, spąstai, 41 atitikmens eilutė) – [`docs/salient-brief.md`](docs/salient-brief.md). Svarbiausi šio demo blokai:

| Demo blokas | Salient įgyvendinimas |
|---|---|
| Permatoma antraštė, sustandėjanti ir susitraukianti skrolinant | Theme Options → Header Navigation: Use Transparent Header When Applicable, Header Starting Logo / Dark Logo, Header Resize On Scroll, Link Hover Effect: Animated underline |
| CTA mygtukas meniu + telefonas | Salient menu item options → Menu Item Link Button Style (+ Persist In Mobile Navigation Header); Secondary Header Bar telefonui |
| Paslaugų ir prekių išskleidžiami meniu su aprašymais | Mega Menu Global Section arba Header Dropdown Display Descriptions |
| Mobilus meniu su kontaktais apačioje | Off Canvas Menu Style: Slide Out From Side, Off Canvas Menu Bottom Text |
| Hero su dūmų video ir gesintuvu | Row: Full Height Row, Background Video (MP4, Video Preview Image = `dumai-poster.webp`), fonas baltas arba video perkoduotas su fonu `#F4F6F9`. Gesintuvas: Image su Shadow Method: CSS Filter Drop Shadow, Movement Choice: Move Y Axis, Movement Intensity 1–2. Mouse Based Parallax Scene nenaudoti, nes ji išjungia fono video. Kortelė „20 metų“: Inner Row su Position Absolute, Background Color `#FFFFFFDB`, Backdrop Filter Blur 12, Border Radius 18px, Box Shadow Very Large Depth, viduje Milestone elementas (skaičiavimas iki 20). |
| Hero dūmų sluoksnio kaukė | Kad dūmai išbluktų ties tekstu kaip demo: eilutei Custom CSS klasė su `mask-image` ant video sluoksnio. Telefonams atskiras 720 px failas arba Disable Video Backgrounds On Mobile Devices + Video Preview Image |
| Hero įėjimo choreografija | Column Animation: Fade In From Bottom kiekvienam elementui atskirai, Column Animation Delay 0/130/260/390 ms, easeOutCubic 900 ms. Svarbu: nenaudoti kartu Salient animacijos ir Custom JS tam pačiam elementui, kitaip elementai gali „dingti ir vėl atsirasti“ |
| Paslaugų kortelės su nuotrauka, kaina ir rodykle | Kiekviena kortelė – vidinė Row (Equal Height Columns, Border Radius 15–20 px „Row Background“, Box Shadow Small Depth, Column Link + Column Link Screen Reader Text) su kolonomis 5/12 (Image, Lazy Load) ir 7/12 (Text Block h3, Icon List, Divider 1 px, Text Block kaina); 6 kortelės 1/2 + 1/2 eilutėse, septinta – pilno pločio 4/12 + 8/12. Fancy Box tokio išdėstymo nepadaro. Nuotrauka užpildo stačią kolonos dalį (object-fit: cover); kur objektas ne centre, nurodytas fokusavimo taškas (vandentiekio spintelė 19 % 50 %, avarinis šviestuvas 24 % 50 %), WordPress pusėje tą patį duoda Column Background Image Position arba nuotraukos apkirpimas prieš įkeliant |
| Tamsi evakuacijos juosta su plano vandenženkliu | Row: Full Width Background, Color Change Section (Extra Color #1), Row Background Image (linijos PNG) + Parallax Background Media On Scroll Subtle; žalio maršruto „piešimas“ – Custom JS (clip-path) |
| Nuotrauka su užslenkančiu plano pavyzdžiu | Inner row Position: Absolute, Translate Y, Z-Index, column Box Shadow Very Large Depth, Scroll Position Animation: Move Y Axis |
| „Kaip vyksta darbai“ su lipnia kolona | Column Sticky Content (CSS Powered, Sticky Alignment Top) + Icon List (Number type) arba trys kortelės su Animate on scroll |
| Prekių bento su iškirptu gesintuvu ir video plytele | Grid iš kolonų su Border Radius; Image su Shadow Method: CSS Filter Drop Shadow (iškirpta WebP su permatomu fonu); kolona su Video Background (MP4 perkoduoti iki ~1 MB, Video Preview Image = plakatas, General Settings → Disable Video Backgrounds On Mobile Devices) |
| Mokymų programos lapas | Row 2/3 + 1/3 (Column Sticky Content šoninei kolonai). Laiko juosta: Raw HTML blokas su 5 `span` segmentais, kurių `flex-grow` lygus temos minutėms (arba Progress Bar elementai po vieną temai); temų sąrašas: Text Block su numeruotu sąrašu, potemės kaip žymos; „Kas 3 metus“ kortelė: Column su Background Color #E9EDF3; „Kas įeina“: Icon List; nuorodos į saugos centrą: 4 kolonų Row su Column Link. Kontūrinis „3:00“: Text Block su `-webkit-text-stroke` ir Salient Parallax (Column Animation: Parallax) |
| Kontaktų skydelis su forma | Row Background Color `#F4F6F9` + Custom CSS klasė su brėžinio tinkleliu (`linear-gradient` 36 px) ir radialiniais švytėjimais; viduje Inner Row (Equal Height Columns, Border Radius 18px, Box Shadow Very Large Depth): kairė kolona su Background Color `#132340` ir tamsiai mėlynu radialiniu gradientu, telefonai kaip Text Block su `tel:` nuorodomis, Lietuvos žemėlapis kaip Image (SVG failas `templates/_lt_map.svg`; pulsavimui reikia įterpti kaip Raw HTML); dešinė kolona Fluent Forms / WPForms forma, paslaugų žymos yra „Checkboxes“ laukas su CSS stiliumi kaip žymos (pills) |
| Lietuvos vėliavėlė prie žodžio „Lietuvoje“ | WordPress pusėje: nedidelis `the_content` filtras (keli PHP sakiniai vaiko temoje), kuris kaip demo `add_lt_flags` apgaubia žodį ir prideda `<span class="lt-flag">`; arba rankiniu būdu Text Block’uose. Vėliavėlės CSS (3 eilutės) į Custom CSS |
| Apie mus: sluoksniuotas hero | Row 1/2 + 1/2; dešinėje Cascading Images (nuotrauka + išpjautas gesintuvas su Offset X/Y, Box Shadow Very Large Depth, Parallax Scrolling Subtle) ir Inner Row su Position Absolute kortelei „Visa Lietuva“ (Backdrop Filter Blur) |
| Apie mus: judanti paslaugų juosta | Scrolling Text (Scrolling Speed: Slowest, separatorius ikona); vienintelė tokia juosta svetainėje |
| Apie mus: slenkant ryškėjantis teiginys | Animated Text (Text Effect: Word, Reveal) arba ~15 eilučių Custom JS su GSAP ScrollTrigger kaip demo (`[data-words]` main.js); kontūrinis „20“ Text Block su `-webkit-text-stroke` |
| Apie mus: numeruotas paslaugų sąrašas | Horizontal List Item (Architect demo „ledger“): numeris, tekstas, rodyklė, 1 px linijos, Column Link į paslaugos puslapį |
| Apie mus: kontaktai su žemėlapiu | Tamsi Row 1/2 + 1/2; kairėje Icon List su kontaktais, dešinėje Raw HTML su `templates/_lt_map.svg` (pulsuojanti Vilniaus žyma) |
| Kontaktai: hero su maršrutų žemėlapiu ir gyvu darbo laiku | Row 1/2 + 1/2 su brėžinio tinklelio fonu (Custom CSS). Kairėje greiti kontaktai kaip Inner Row su Column Link (`tel:`, `mailto:`), dešinėje Raw HTML su `templates/_lt_routes.svg` (maršrutai nusipiešia per `stroke-dashoffset`, kai elementas pasirodo ekrane; Salient Animate on scroll klasė arba kelios Custom CSS eilutės) ir Position Absolute kortele „Geslita, Vilnius“. „Dabar dirbame“ indikatorius ir el. pašto kopijavimas yra ~25 eilučių Custom JS (demo `main.js`, `[data-open-status]`, `[data-copy]`); šventinės dienos neįvertinamos |
| Kontaktai: užsakymo eiga + forma | Row 1/2 + 1/2: kairėje Icon List (Number type) arba Text Block su 3 žingsniais, dešinėje ta pati Fluent Forms / WPForms forma kaip pradžios puslapyje (Column Sticky Content) |
| Evakuacijos planai: hero su rėmeliu ir šviesos jungikliu | Row 1/2 + 1/2; dešinėje Image (plano nuotrauka) kolonoje su Column Padding ir Background Color = rėmelio spalva, Box Shadow Very Large Depth. Spalvų pasirinkimas ir šviesos jungiklis yra ~40 eilučių Custom JS + CSS (demo `main.js`, `[data-ev-hero]`); be JS galima palikti tik dieninį planą ir atskirą tamsoje šviečiančio plano nuotrauką |
| Evakuacijos planai: reikalavimai su legenda | Row 4/12 + 8/12: kairėje Column Sticky Content su Image (sutartinių ženklų iškarpa), dešinėje Horizontal List Item / Text Block su numeriais |
| Paslaugos: hero su kainų kortele ir paslaugų rodykle | Row 1/2 + 1/2: dešinėje Cascading Images (2 nuotraukos) ir Position Absolute kortelė su 3 kainomis (Backdrop Filter Blur); po eilute 5 kolonų Row su Column Link į paslaugų inkarus (Icon + Text Block), telefone 2 kolonos |
| Poraštė su plano vandenženkliu | Global Section (Footer location) su Row Background Image (baltos linijos PNG, mažas Opacity) |
| Vidinių puslapių antraštė su plano linijomis | Page Header (Salient) arba pirmas Row su Background Image + Parallax; breadcrumbs – Yoast/Rank Math |
| Lipni šoninė navigacija ilguose puslapiuose | Page Submenu (Sticky) su Row ID anchor nuorodomis arba Column Sticky Content |
| Kainoraščių lentelės | Table elementas arba TablePress; ilgi tekstai – Toggle Panels (Style: Minimal, Accordion) |
| Ženklų paieška | WooCommerce paieška (jei katalogas keliamas į Woo) arba Custom JS filtras kaip demo `main.js` |
| Vaizdo klipai | Video Lightbox (Play Button With text) su YouTube ID |
| Žemėlapis | Interactive Map (Map Type: Leaflet, Marker Style: Nectar Animated) |
| Sumažintas judesys | Salient neturi `prefers-reduced-motion` jungiklio: į Custom CSS perkelti demo `style.css` taisyklę |

Našumas Salient pusėje: Delay Javascript Execution, Lazy Load Page Builder Element Images (hero – Skip Lazy Load), Load Google Fonts Locally, WebP konvertavimas (WordPress 6.5+ arba ShortPixel), Disable Parallax / Video Backgrounds On Mobile Devices (žr. `docs/salient-brief.md`, 9 skyrius). Demo versijoje Pexels nuotraukos pateikiamos su `srcset` (WebP 640 / 1280 / 1920 px). Hero dūmų video yra 16 s ciklas be garso: 1600 px (1,4 MB) kompiuteriams ir 720 px (0,26 MB) telefonams. Esant „mažiau judesio“ ar duomenų taupymo nustatymui rodomas tik plakatas, o kai hero nematomas, video sustabdomas. Automatikos video (960x540, ~2,9 MB) kraunamas tik priartėjus ir tik dideliuose ekranuose, telefonuose rodomas tik plakatas; GSAP įkeliamas su `integrity`. WordPress versijoje video dar vertėtų perkoduoti (H.264 CRF 28 + WebM) iki ~1 MB.

## Kokybės patikra

Pradžios puslapį nepriklausomai vertino trys automatizuoti recenzentai (kliento akimis, dizaino šablonų auditas, Salient įgyvendinamumas ir našumas/prieinamumas); jų pastabos įgyvendintos. Visi 15 puslapių praėjo du nepriklausomus patikros ratus: turinio pilnumas pagal `content/*.json`, vaizdinė patikra 1440 ir 390 px pločiuose, lietuvių kalbos ir brūkšnių auditas, prieinamumas (viena h1, antraščių tvarka, alt tekstai, formų etiketės, `rel="noopener"`), nuorodų ir inkarų patikra. Judesio efektai, meniu, paieška, forma ir žemėlapis papildomai patikrinti tikroje naršyklėje.

## Nuotraukos, video ir šaltiniai

- Pradžios puslapyje **nė viena nuotrauka ir nė vienas sakinys nekartoja pirmosios (atmestos) versijos**: nuotraukos parinktos iš naujo, tekstai parašyti iš naujo.

- **Originalios geslita.lt nuotraukos** (katalogas, evakuacijos planų pavyzdžiai, signalizacijos, pildymo įranga, logotipas) – įmonės archyvas, perkeltos be pakeitimų (`assets/img/katalogas`, `assets/img/geslita`). Dalis jų mažos raiškos: prieš paleidžiant svetainę vertėtų perfotografuoti populiariausias prekes.
- **Pexels nuotraukos ir video** – sąrašas su autoriais [`docs/pexels-credits.md`](docs/pexels-credits.md). Pexels licencija leidžia komercinį naudojimą be nuorodos, bet autoriai nurodyti geros praktikos dėlei.
- **Evakuacijos plano linijų grafika** – apdorotas tikras Geslitos plano pavyzdys (`uploads/images/evakuacijos planai/Planas 2l.jpg`), tekstai pašalinti.
- **Ikonos** – Tabler Icons stiliaus kontūrai (MIT), įterpti kaip SVG simboliai `base.html`.

## Turinys, kurį reikia patikslinti su klientu

Pilnas sąrašas – [`docs/turinys-patikslinti.md`](docs/turinys-patikslinti.md). Svarbiausia:

- Senosios svetainės kainos dalyje puslapių nurodytos **litais**; demo versijoje jos perskaičiuotos (3,4528 Lt = 1 €) ir pažymėtos pastaba. Klientas privalo pateikti aktualų kainoraštį eurais ir patvirtinti, ar kainos su PVM.
- Teisės aktų numeracija (pvz., Darbo kodekso 266 str.) palikta kaip senojoje svetainėje – reikia atnaujinti pagal galiojančias redakcijas.
- Mokymų kainininkas, registracijos žurnalų sąrašas ir 2012 m. pakeitimų straipsnis yra archyvinė informacija – spręsti, ką palikti.
- Atsiliepimų, klientų logotipų, sertifikatų ir komandos blokai nekurti sąmoningai, kol nėra tikrų duomenų.
- Adresas Fabijoniškių g. 4A ir pastaba „ne parduotuvė“ – patikslinti; žemėlapio taškas iš OpenStreetMap.
