> Vidinis darbinis dokumentas (anglų k.): Salient temos geriausių praktikų apžvalga, parengta iš themenectar.com demo ir dokumentacijos 2026-11-04. Lietuviška santrauka ir šio demo blokų atitikmenys yra README.md.

# Salient best-practices brief — Geslita (fire-safety B2B), restrained depth

Scope: static HTML demo first, then a 1:1 rebuild in Salient 18.x (WPBakery-based "Salient WPBakery Page Builder"). Option names below are Salient's own; uncertain names carry "(?)".

## 1. Header & navigation

Every current Salient business demo (Harbor, Tether, Signal, Architect) runs a slim header: logo left, 4–5 links, one button-styled menu item as the CTA, optional off-canvas "Menu". For a service company keep the visible menu (Paslaugos, Prekės, Apie mus, Kontaktai) and the phone number — do not hide navigation the way Architect does.

- Theme Options > Header Navigation: `Header Layout Choice: Default Layout`, `Header Padding` 20–28, `Logo Height` ~30, `Header Resize On Scroll` on, `Header Link Hover/Active Effect: Animated underline`, `Header Sticky On Mobile` on, `Header Box Shadow` (?) off.
- Transparent over a dark hero: `Use Transparent Header When Applicable`, `Header Starting Logo` (light) + `Header Starting Dark Logo`, `Header Starting Text Color`, `Remove Border On Transparent Header`; the hero row's `Text Color: Light` drives the swap. Per page: `Force/Disable Transparency On Navigation`.
- Contact strip: `Secondary Header Bar` (`Secondary Header Text`, `Secondary Header Link URL`, `Secondary Header Mobile Functionality`) or a Global Section at location `In Navigation Top (Before Scrolling)`.
- CTA: Appearance > Menus > Salient menu item options > `Menu Item Link Button Style` + `Persist In Mobile Navigation Header`; `Top Navigation Menu Pull Right` location to isolate it.
- Services mega menu: `Enable Mega Menu` + `Mega Menu Global Section` (+ `Mega Menu Global Section Mobile`); not available with Left Header.
- Mobile: `Off Canvas Menu Style Choice: Slide Out From Side`, `Off Canvas Menu Bottom Text` for phone/e-mail. Mobile breakpoint is 1000px.

## 2. Hero patterns

Salient's demos never use a slider. Three viable families, in order of fit:

1. **Full-height photo/video row with frosted card (Harbor).** Row `Type: Full Width Background`, `Full Height Row`, `Fullscreen Row Position: Middle`, `Background Image` + mobile variant, `Preload Image`, `Background Image Loading: Skip Lazy Load`, `Color Overlay` Simple `Overlay Strength: Medium/Heavy`, `Parallax Background Media On Scroll` + `Parallax Background Layer Speed: Subtle`, `Background Layer Animation: Slight Zoom Out Reveal`, `Text Color: Light`. One Animated Text H1 (`Text Effect: Word > Reveal`, `Stagger Animation`), primary Button `Type: Arrow Circle Animation`, `Next Section Button` cue, optional glass info card (inner row `Backdrop Filter: Blur` 12–16, `Border Radius` 15px).
2. **Straddle card (Business 3).** White row + `Shape Divider: Straight Section` at 40% height tinting the lower band; the hero is a rounded column (`Border Radius` 15–20px, `Background Image`, `Background Layer Animation: Zoom Out Reveal`, overlay 0.6–0.8). Header stays solid white — calmer.
3. **Light editorial hero (Tether).** Centred H1 (`Max Width` 700px), two-tier CTA, Circle Images + Star Rating proof line, 200/325/450 ms staggered entrances.

Add one layered object (cut-out extinguisher PNG via Image `Shadow Method: CSS Filter Drop Shadow`, `Movement Choice: Move Y Axis`, `Movement Intensity` 1–2) or a 2–3-layer `Mouse Based Parallax Scene` at low `Layer Strength` — hero only. A slow Scrolling Text band of service names (`Scrolling Speed: Slowest`, `Italic Style: Text Outline`) may sit directly under the hero; it is the only marquee on the site.

## 3. Section rhythm & layout families

Harbor's rhythm is the template: **eyebrow label → one split-line H2 → one or two short paragraphs → one text link**, repeated with generous % padding (rows 6–12% top/bottom desktop, 10–18% tablet). Keep 10–12 sections on the home page and alternate families:

- **Contained text statement** (`Type: In Container`, column `Max Width`/`Padding 8%`).
- **Split row** 1/2 + 1/2, `Equal Height Columns`, `Column Content Alignment: Middle`, text column `Column Padding` 2–8%, mirrored via `Column Direction: Row Reverse`; `Column Reverse` on phone.
- **Card grid** 3–4 columns, `Column Margin: 10–20px`, `Box Shadow: Small Depth`, one radius site-wide, `Fade In From Bottom` with `Column Animation Delay` 0/150/300.
- **Inset rounded full-width row** (Tether): Section with 10px side padding, row `Border Radius 15px, Applies To: Row Background`.
- **Dark band** (stats or quote) with `Color Change Section` so the page tints into it; at most one or two `Shape Divider` uses (`Tilt`, `Curve Asym.`, or `Straight Section`) per page, colour = neighbouring row.
- **Text-free parallax "breather"** (Architect): photo row, `Parallax Background Layer Speed: Medium`, Divider `No Line` 60–80svh.

Spacing system: `Column Element Spacing` 20–30px, Divider `No Line` as spacer, `Max Website Container Width` 1425px with `Extended Responsive Design`.

## 4. Depth & parallax devices (ranked by impact vs. restraint)

1. **Big image + floating shadowed card** (Architect): inner row `Position: Absolute`, `Translate Y -50%`, `Z-Index` 50, column `Box Shadow: Very Large Depth`, `Scroll Position Animation: Move Y Axis` 2; parent column height from Divider `No Line` 90svh. Highest depth per pixel, zero noise.
2. **Cascading Images** (Business 3): 2–3 layers, `Offset X/Y` ±15–40%, one layer `Box Shadow: Very Large Depth`, `Parallax Scrolling: Subtle`, `Border Radius` 5–15px.
3. **Row background parallax** at `Subtle`/`Regular`, only on photo rows; `Background Layer Animation: Slight Zoom Out Reveal`.
4. **Sticky Content Sections** — `Sticky Media, Scrolling Content` for services, `Sticky Scroll Pinned Sections: Overlapping/Scale` for a 4-step process; `Effect Enabled` off on phone.
5. **Sticky column** (`Sticky Content`, `Sticky Functionality: CSS Powered`, `Sticky Alignment: Middle`) holding a heading beside scrolling content.
6. **Glass surfaces**: column/badge `Backdrop Filter: Blur` + translucent fill (#FFFFFF1F / #0000006E) over photos.
7. **Masks**: `Mask Shape: Arch`, `Circle Bottom Right`, `Bottom Blur Gradient` on one image per section.
8. **Image scroll drift**: paired photos `Movement Intensity` +2 / −2.
9. **Straddle via Straight Section divider** and **negative margins** (`Margin Top` −5% / −20vw) for overlaps.
10. **Color Change Section** and **Footer Reveal Effect** as quiet transitions.
11. **Mouse Based Parallax Scene** (hero only, ≤3 layers).
12. Skip: Content Trail, Chat Thread, scribbles, Flip Box rows, Progress Bars, rotated marquees.

## 5. Typography, colour, spacing in the best demos

- **Type**: one grotesk with Latin Extended glyphs (ą č ę ė į š ų ū ž); headings weight 600, slight negative tracking on H1–H2. Theme Options > Typography > Responsive Settings > `Fluid Typography`: desktop `Min 0.8rem`, `Custom calc(1vw + 0.1rem)`; mobile `Min 1rem`, `Max 1.5rem`. Harbor scale: Body 1rem/1.6, H1 4rem, H2 2.7rem, H3 2rem, H4 1.4rem (lh 1.3), Navigation 0.9rem. All sizes in rem, line-heights unitless. Display text via Responsive Text / Animated Text in vw with `Min/Max Font Size` (e.g. clamp(2.5rem, 6vw, 6rem)); heading `Max Width` 520–750px, body measure 500–550px. Eyebrows: lowercase parenthetical "(Paslaugos)" or uppercase H6.
- **Colour**: Theme Options > Accent Colors — `Accent Color` = disciplined signal red (CTAs, icons, underline, pulsing marker only), `Extra Color #1` = deep navy/charcoal (dark bands, overlays, footer), `Extra Color #2` = warm light grey (#F4F2EF-ish bands), `Extra Color #3` = steel blue or compliance green; gradients left blank. Translucent layers (#00000033 borders, #FFFFFF36 hairlines) do the rest. Never large red fills.
- **Surfaces**: one radius (15px), one shadow preset, 1px hairline dividers, 10px gutters.

## 6. Service presentation patterns (prioritising /paslaugos)

Home page body = the services page condensed, as a story rather than a flat grid:

- **Flagship walkthrough**: Sticky Content Sections `Type: Sticky Media, Scrolling Content` (`Content Position: Right`, `Media Width 50%`, `Media Height 80vh`), one child per service (gesintuvų patikra, gaisrinė signalizacija, evakuacijos planai, mokymai, prekyba), each swapping the photo; alternative Tabs `Style: Vertical Sticky Scrolling` with per-tab CTA.
- **Index**: Horizontal List Item rows (`Columns 3`, `Column Layout 50/25/25`, `Style: Bottom Border Color Hover Effect`, `Border Animation`, `Full Item Link URL`, CTA "Plačiau") or Fancy Box cards (`Style: Image Above Text` or `Color Box Basic`, `Image Aspect Ratio 4:3`, equal `Minimum Height`, `Skip Lazy Load` above fold). Avoid `Description on Hover` (hidden on touch).
- **Process**: Icon List `Direction: Horizontal`, `Columns 4`, `List Icon Type: Number`, `Icon Style: Icon Colored W/ BG`, `Animate Element`.
- **Explainer**: Image With Hotspots on a floor plan (`Tooltip Functionality: Show On Click`, `Hotspot Icon: Numerical`).
- **Detail pages**: Page Submenu (`Sticky?`) jumping to `Row ID`s; Toggle Panels `Style: Minimal`, `Accordion Toggles` for intervals/legal requirements; Tabs `Toggle Button` for "Įmonėms / Daugiabučiams".

## 7. Trust & conversion blocks

- Stats: Milestone ×4 (`Animation Effect: Count To Value`, `Milestone Symbol` "+"/"%" `Superscript`, delays 0/150/300/450) on a navy `Color Change Section` row; or Harbor's glass Badge pills with a sticky heading.
- Logos: Clients (`Columns 5–6`, `Hover Effect: Greyscale to Color`, `Fade In One By One?`, `Turn Into Carousel` past 8) — clients plus certificates/licences.
- Testimonials: Testimonial Slider `Style: Multiple Visible Minimal`, `Auto-Rotate` empty, Star Rating with source count; or Layered Card Reveal for three cards.
- Team: Team Member `Meta Below` with certification line.
- Video: Video Lightbox `Link Style: Play Button With text`, `Play Button Style: Colored Button Pulse` — never autoplay backgrounds.
- One CTA verb everywhere ("Užsakyti patikrą"): header button, hero, closing band (whole column `Column Link` + `Column Link Screen Reader Text`). Contact: Fluent Forms with service checkboxes, Interactive Map `Map Type: Leaflet`, `Marker Style: Nectar Animated`, `Greyscale Color`.

## 8. Footer

Build as a Global Section (post type `salient_g_sections`): dark 3–4-column row (logo, services links, contacts, certificates), copyright line; Display Location `Footer` (or `Footer Parallax` for the reveal), condition `Entire Site`; switch off Theme Options > Footer > `Main Footer Area`. Pre-footer CTA band = separate Global Section inserted via the `Global Section` element. Optional `Footer Reveal Effect` + `Footer Reveal Shadow`.

## 9. Performance & accessibility

General Settings > Performance: `Delay Javascript Execution` (All Devices), `Optimize Top-level Images`, `Lazy Load Page Builder Element Images` (hero media `Skip Lazy Load`), `Load Google Fonts Locally`, `Font Display Swap`, `Move jQuery to Footer`, `Remove Global Font Awesome`, `Remove Block Editor (Gutenberg) CSS`, `Remove WordPress Emoji Script/CSS`; `Disable Parallax Backgrounds On Mobile Devices`, `Disable Video Backgrounds On Mobile Devices` (+ `Video Preview Image`), `Disable Page Transitions On Mobile`; `Column/Image Animation Timing` 650 ms, `Column/Image Animation Easing: easeOutCubic`; Page Transitions `View Transitions API (Modern)` + `Fade`. Accessibility: real H2/H3 (Badge is not a heading), `Link Screen Reader Text` on cards/play buttons, `Aria Label` on buttons, Scrolling Text decorative only, one Animated Text per screen, `Disable Animation on Mobile` on first-screen elements. Salient has no reduced-motion switch — the HTML demo must honour `prefers-reduced-motion` and the WP build needs a Custom CSS rule.

## Recommended demos
- Harbor (themenectar.com/salient/harbor) — primary reference: consulting one-pager built with the Salient 18 toolset; eyebrow + split-line heading rhythm, frosted hero card, numbered services, glass stat pills, layered testimonial cards, single CTA verb, documented Fluid Typography values
- Tether (themenectar.com/salient/tether) — spacing, warm-neutral palette, inset rounded rows with 10px gutters, pinned overlapping feature sections, bento proof grid, FAQ + closing CTA band, one-CTA discipline
- Business 3 (themenectar.com/salient/business-3) — straddle-card hero over a Straight Section divider, 4-up icon service tiles, mirrored zig-zag rows with Cascading Images, band rhythm via tints, three static testimonials
- Architect (themenectar.com/salient/architect) — monochrome restraint with the strongest depth device (big parallax image + floating shadowed card), sticky intro column beside scrolling list, numbered ledger with hairlines, text-free parallax breather rows
- Corporate 3 (themenectar.com/salient/corporate-3) — guided-scroll narrative (each section hands off with an arrow link), single-photo hero, early quote + late logo wall, team grid, one-line closing CTA, inner-page restraint
- Signal (themenectar.com/salient/signal) — secondary: six-service photo-card ticker with pill tags, Color Change Section usage, contact form with service checkboxes (skip its giant uppercase type and content trail)
- Service (themenectar.com/salient/service) — tertiary: one-page service business with 3-step process and pricing blocks
- Corporate 2 (themenectar.com/salient/corporate-2) — tertiary: shape-mask hero reference for a single masked photo treatment

## Depth devices (ranked)
- 1. Big parallax image column + absolutely positioned floating card with Box Shadow Very Large Depth moving at a different scroll rate (Column Animation Type: Scroll Position Animation, Move Y Axis, intensity ~2) — highest impact, zero noise
- 2. Cascading Images: 2–3 overlapping photos/colour block with Offset X/Y, Rotate 2.5°, one Very Large Depth shadow, Parallax Scrolling Subtle — replaces every flat image in About and service rows
- 3. Row background parallax (Parallax Background Media On Scroll, speed Subtle/Regular) + Background Layer Animation Slight Zoom Out Reveal — only on photo rows (hero, dark proof band, one breather)
- 4. Sticky Content Sections — Sticky Media, Scrolling Content for the services story; Sticky Scroll Pinned Sections (Overlapping/Scale) for the 4-step process; Layered Card Reveal for testimonials; Effect Enabled off on phone
- 5. Sticky column (Sticky Content, CSS Powered, Sticky Alignment Middle) holding the section heading while cards/list scroll
- 6. Glass surfaces: column/badge/inner row Backdrop Filter Blur 12–20 with translucent fills (#FFFFFF1F, #0000006E) and 1px translucent borders
- 7. Mask shapes on images/column backgrounds: Arch, Circle Bottom Right, Bottom Blur Gradient (text over photo bottom)
- 8. Image scroll drift pairs (Movement Choice Move Y Axis, Movement Intensity +2 / −2) and Desktop Max Width 110–120% overhang
- 9. Straddle/overlap layouts: Shape Divider Straight Section 40–50% height, negative row Margin Top (−5% to −20vw), Z-Index + Overflow Visible
- 10. Color Change Section tinting the page into a dark band, plus Footer Reveal Effect (or Footer Parallax Global Section location) as the ending curtain
- 11. Mouse Based Parallax Scene on the hero only (2–3 layers, low Layer Strength, off on mobile)
- 12. Staggered entrance choreography (Fade In From Bottom, 150 ms steps, 650 ms easeOutCubic) and one Animated Text heading per screen — motion as depth, not decoration
- 13. Hairline graphic structure: Divider Full Width Line 1px animated, numbered 01–04 numerals as Responsive Text, one outlined Scrolling Text band
- Skip for this brief: Content Trail, Chat Thread, Hand-Drawn Scribble, Flip Box rows, Progress Bars, rotated marquees, Animated Gradient rows, 3D portfolio parallax

## Pitfalls
- Over-animation: more than one Animated Text heading per screen, split-animated paragraphs, per-letter effects on long Lithuanian headlines, or mixed entrance families make the page feel like it is still loading — one entrance (Fade In From Bottom), 150 ms staggers, 650 ms timing
- Template look: more than two Shape Dividers per page, Curve/Waves/Clouds shapes, divider colour not matching the neighbouring row, coral→blue gradient overlays, multiple accent colours, mixed radii (5/15/20px) and multiple shadow depths
- Gimmick elements on a fire-safety B2B site: Content Trail, Chat Thread, Scribble highlights, rotating marquees, Rotating Words, Progress Bars with invented percentages, Flip Boxes with links on the front face, Animated Gradient backgrounds
- Pinned/sticky sections hold the viewport: tall content becomes unreachable on phones — set Effect Enabled off for Phone (≤690px); Horizontal Scrolling is desktop-only (≥1000px); enable Subtract Navigation Height under a sticky header
- Absolutely positioned elements reserve no space: a column holding only them collapses; set the parent column Position Relative, give it height (Divider No Line in svh or Min Height) and reduce overlaps at tablet/phone; Column Link disables hover effects of inner elements
- Shape dividers force the row background to full width — do not combine In Container rows with dividers; Reveal Rotate column animations break parallax backgrounds inside parallax rows; Box Shadow is unavailable with Reveal Rotate image animations
- Parallax at High/Fast upscales the background image (blur) — use Subtle/Regular with ≥2000px photos; Background Position is ignored when parallax is on, so crop for a centred focal point; MP4/WebM backgrounds are disabled while Mouse Based Parallax Scene is on; YouTube backgrounds never play on mobile
- Lazy loading the hero: first-screen images/backgrounds must be Skip Lazy Load with Preload Image on the hero row only and Optimize Top-level Images on; lazy loading also disables the Galleries Load In Animation
- Mobile: leave Page Builder Element Animations On Mobile Devices off, set Disable Animation on Mobile on above-the-fold elements, Disable Parallax/Video Backgrounds On Mobile Devices, always supply a Video Preview Image, Replace With Image on Mobile for self-hosted video
- Fluid Typography breaks with any px font size or px line-height; set everything in rem/unitless, configure the mobile range separately, and check 14vw-style uppercase headlines with Ą/Č/Ė/Š/Ū/Ž before committing
- Every configured Accent/Extra colour and font family adds CSS to every page; leave unused slots blank, set Default Theme Font Functionality to Do not load default font, enable Load Google Fonts Locally and Font Display Swap
- Global Section with no Display Condition renders nowhere; using the Footer location without switching off Main Footer Area stacks two footers; enable salient_g_sections in WPBakery Role Manager if the builder is missing
- Sticky stacking on phones: sticky header + sticky Page Submenu + sticky columns eat the viewport — make only one bar sticky and test at 1000px and 690px
- Fancy Box Description on Hover hides text on touch devices; Image Hotspots need Show On Click; Tabs Toggle Button requires exactly two tabs; Horizontal List Item rows must share one Column Layout; Tabs cannot contain a Carousel
- Mega menu via Global Section is unavailable with the Left Header format and fullscreen off-canvas styles; Secondary Header Mobile Functionality is skipped when Header Permanent Transparent is on
- Transparent header depends on the first row's Text Color and starting logos — pages whose first row is light need Header Starting Dark Logo or the logo disappears
- Accessibility: Badge is not a heading (use real H2/H3), Scrolling Text must never be the only place information appears, fill Link Screen Reader Text / Aria Label on cards and play buttons; Salient has no prefers-reduced-motion switch — the static demo and the WP Custom CSS must add it
- Caching: Delay Javascript Execution must stay All Devices; in WP Rocket keep Minify JS off, Delay JS on, exclude Themes, Optimize CSS delivery off, or animations and the off-canvas menu stop working
- Demo copy and placeholders: Salient demos ship lorem ipsum, typos and inconsistent stats — copy structure and settings only; every section must carry real Lithuanian content from geslita.lt/paslaugos with alt text, and stats must reconcile across hero, Milestones and footer
- Version drift: v18 renamed Split Line Heading to Animated Text, Call to Action to Button, Button to Legacy Button; 18.4 moved to WPBakery 9 — never update WPBakery separately from Salient; Nectar Slider, Owl Carousel, carouFredSel, Pricing Table and Boxed Column are legacy

## Pattern to Salient mapping

| Design pattern | Salient implementation |
|---|---|
| Transparent header that solidifies and shrinks on scroll, logo swap | Theme Options > Header Navigation: Use Transparent Header When Applicable; Header Starting Logo + Header Starting Dark Logo; Header Starting Text Color; Remove Border On Transparent Header; Header Resize On Scroll (+ shrink amount); Header Link Hover/Active Effect: Animated underline; hero row Text Color: Light |
| Header CTA button 'Užsakyti patikrą' visible on phones | Appearance > Menus > Salient menu item options > Menu Item tab > Menu Item Link Button Style (+ Persist In Mobile Navigation Header); optional Top Navigation Menu Pull Right location |
| Phone / e-mail / hours strip above the nav | Header Navigation > Secondary Header Bar (Secondary Header Text, Secondary Header Link URL, Secondary Header Mobile Functionality) or Global Section at location In Navigation Top (Before Scrolling) with condition Entire Site |
| Services mega menu with icons and short descriptions | Global Section built in the builder; menu item > Mega Menu tab > Enable Mega Menu + Mega Menu Global Section (+ Mega Menu Global Section Mobile), Mega Menu Width/Alignment; Header Dropdown Display Descriptions |
| Mobile off-canvas menu with contacts at the bottom | Header Navigation > Off Canvas Menu Style Choice: Slide Out From Side; Off Canvas Menu Bottom Text; Off Canvas Menu Overlay Strength; Header Sticky On Mobile |
| Full-height photo hero with slow parallax and dark overlay | Row: Type Full Width Background, Full Height Row, Fullscreen Row Position Middle, Background Image (+ phone variant), Preload Image, Background Image Loading: Skip Lazy Load, Color Overlay Simple Overlay Strength Medium/Heavy, Animation > Parallax Background Media On Scroll + Parallax Background Layer Speed: Subtle, Background Layer Animation: Slight Zoom Out Reveal, Text Color Light |
| Hero headline revealed word by word, one per screen | Animated Text (shortcode split_line_heading): Text Effect Word > Reveal (or Blur), Stagger Animation on, Max Width 650–750px, Disable Animation on Mobile on |
| Hero glass info card with portrait and primary CTA | Inner row/column: Backdrop Filter: Blur (Blur Amount 12–16), Background Color #0000006E, Border Radius 15px, Maximum Width 64%; Button Type: Arrow Circle Animation, Button Roundness 100; Button Type: Next Section Button as scroll cue |
| Straddle card hero on a white row (Business 3) | Row Full Width Background + Shape Divider: Enable, Shape Type Straight Section, Shape Divider Height 40%, colour = next band; column Background Image, Background Layer Animation Zoom Out Reveal, Color Overlay Heavy 0.8, Border Radius 15–20px, Column Padding 7% |
| Cut-out extinguisher floating over the hero with light mouse parallax | Row Background > Mouse Based Parallax Scene (Scene Layer One photo, Scene Layer Two PNG, low Layer Strength, Scene Parallax Overall Strength low); or Image with Shadow Method: CSS Filter Drop Shadow, Movement Choice Move Y Axis, Movement Intensity 1–2; General Settings Disable Parallax Backgrounds On Mobile Devices |
| Services marquee band under the hero (decorative only) | Scrolling Text: Scrolling Speed Slowest, Text Repeat Divider Custom Symbol, Italic Style Text Outline, Custom Font Size per device; one band per page |
| Eyebrow label + H2 + copy + arrow link section opener | Badge (Badge Style Minimal Line, Display Block) or Text Block h6; Animated Text h2 (Max Width 520px); Text block Max Width 550px with Animation Delay 100; Button Type: Arrow Animation or Underline |
| Big photo + floating shadowed card composition (Architect) | Column 1/2: inner row with Left Padding 20% → inner column Background Image + Parallax Background Media On Scroll Subtle + Divider No Line 90svh; second inner row Position Absolute, Top 50%, Translate Y −50%, Minimum Width 40%, Z-Index 50 → column Background Image, Box Shadow Very Large Depth, Column Animation Type Scroll Position Animation (Move Y Axis, Movement Intensity 2.25); parent row Equal Height Columns + Column Content Alignment Middle |
| Layered 2–3 photo stack for About / each service | Cascading Images: Layer #1 photo, Layer #2 Offset X −40% / Offset Y +15%, Rotate 2.5°, Box Shadow Very Large Depth, Layer #3 Layer BG Color accent block; CSS Animation Fade In From Bottom per layer; Parallax Scrolling Subtle; Border Radius 5–15px; Image Loading Lazy Load |
| Arch / circle-cut technician photo; text over photo bottom | Image > Mask tab: Enable Mask, Mask Shape Arch / Circle Bottom Right / Bottom Blur Gradient, Mask Size Cover, Mask Alignment; Box Shadow follows the cut edge |
| Alternating image/text split rows | Row Equal Height Columns, Column Content Alignment Middle, Padding 6% top/bottom; text column Column Padding 2–8%; Column Direction Row Reverse on alternate rows, Column Reverse on phone; image column Border Radius 20px, Parallax Background Media On Scroll Subtle, Scale Background Image To Column |
| '24/7' or 'Sertifikuota' badge pinned to a card corner | Badge > Positioning tab: Position Absolute, Top/Right offsets, Transform Translate, Z-index; parent column Position Relative; keep one in-flow element so the column does not collapse |
| Services walkthrough with pinned photo and scrolling service texts | Sticky Content Sections: Type Sticky Media, Scrolling Content; Content Position Right; Media Width 50%; Media Height 80vh; Mobile Media Aspect Ratio 4:3; one Sticky Content Section child per service; Effect Enabled off on Phone |
| Four-step 'Kaip vyksta patikra' process | Icon List: Direction Horizontal, Columns 4, List Icon Type Number, Icon Style Icon Colored W/ BG, Icon Size Medium, Header Tag H4, Animate Element? on; desktop alternative Sticky Content Sections Type Sticky Scroll Pinned Sections, Effect Scale, Section Navigation on |
| Services index table with hover rule and 'Plačiau' CTA | Horizontal List Item: Columns 3, Column Layout 50/25/25, Style Bottom Border Color Hover Effect, Border Animation on, Full Item Link URL, CTA Text; all rows same Column Layout |
| Service cards grid linking to /paslaugos subpages | Fancy Box: Style Image Above Text (or Color Box Basic), Image Aspect Ratio 4:3, equal Minimum Height, Border Radius 5–10px, Add Border, Link URL + Link Screen Reader Text, Enable Animation Fade In From Bottom with Animation Delay 0/150/300/450, Image Loading Skip Lazy Load above the fold |
| Annotated evacuation plan / building scheme | Image With Hotspots: Hotspot Icon Numerical, Tooltip Functionality Show On Click, Color Choice Accent Color, Tooltip Shadow on |
| Stats strip with counting numbers on a dark band | Row Background Color (Extra Color #1), Text Color Light, Animation > Color Change Section; four columns of Milestone: Animation Effect Count To Value, Milestone Symbol + / % with Symbol Alignment Superscript, Milestone Subject, Animation Delay 0/150/300/450, Milestone Number Inherit Font h1 |
| Glass stat pills beside a sticky heading (Harbor) | Heading column Sticky Content (Sticky Functionality CSS Powered), bottom border 1px #FFFFFF36; Badge elements with custom background #FFFFFF1F, Backdrop Filter Blur 12, Border Radius 20px; row Parallax Background Layer Speed High (?) on a 2000px+ photo |
| Client and certificate logo wall | Clients: Columns 5–6, Hover Effect Greyscale to Color, Additional Logo Padding, Fade In One By One?, Turn Into Carousel + Disable Autorotate past 8 logos; or Galleries Flickity Static Height Style with Slider Transition Type Ticker Movement and Mask Edges |
| Client quotes with rating | Testimonial Slider: Style Multiple Visible Minimal, Star Rating Color Choice Accent, Auto-Rotate empty, Controls Next/Prev Arrows, Disable height animation; Star Rating element with Text Content 'Google atsiliepimai (n)'; alternative Sticky Content Sections Type Layered Card Reveal, Card Aspect Ratio 4:5 |
| Social-proof avatar stack '+300 įmonių' | Circle Images: Circle Positioning Overlapping, Circle Sizing 44px, Last Circle Number Text '+300', Border Color = row background, Entrance Animation Fade In |
| Company video without autoplay cost | Video Lightbox: Link Style Play Button With text (or Play Button With Image – Mouse Follow), Play Button Style Colored Button Pulse, Play Button Color Accent, Box Shadow Medium Depth, Border Radius 15px; inline alternative Self Hosted Video with Video Preview Image, Lazy Load, Replace With Image on Mobile |
| FAQ and legal inspection intervals | Toggle Panels: Style Choice Minimal (or Animated Circle), Accordion Toggles on, Starting Functionality First Toggle Closed, Border Radius 15px; deep links ?toggle=slug&focus=true (18.1) |
| 'Įmonėms / Daugiabučiams' switch | Tabs: Style Toggle Button (exactly two tabs), Tab Content Animation; per-tab Enable CTA Button |
| Sticky in-page navigation on the long Paslaugos page | Page Submenu: Sticky? on, Menu BG Color solid, child links '#gesintuvai' matching Row Settings > Advanced > Row ID; General Settings One Page Scroll Support (animated Anchor Links) |
| Contact section with brand-tinted map and pulsing marker | Interactive Map: Map Type Leaflet, Marker Style Nectar Animated, Marker Color Accent, Greyscale Color on + Map Extra Color, Ultra Flat Map, Map height 480; Theme Options > Form Styling for Fluent Forms with service checkboxes |
| Closing CTA where the whole block is clickable | Row Full Width Content, Column Link + Column Link Screen Reader Text 'Užsakyti patikrą'; Animated Text h2 Text Effect Blur; one Button Type Basic in Accent Color |
| Reusable CTA band on every service page | Global Section (post type salient_g_sections) inserted with the Global Section page-builder element, or assigned to a pre-footer hook found via admin-bar Show Salient Hooks with condition Entire Site |
| Designed footer replacing widget footer | Global Section with Display Location Footer (or Footer Parallax / After Footer) + Display Condition Entire Site; Theme Options > Footer > Main Footer Area off; optional Footer Reveal Effect + Footer Reveal Shadow; Footer Copyright Section Text |
| Section transition where page background tints to the dark row | Row Animation tab > Color Change Section with the row Background Color; give the following row its own Background Color + toggle; base colour General Settings > Overall Background Color (a.k.a. Primary Background Color (?)) |
| One subtle angled divider between hero and services | Row Shape Divider: Shape Type Tilt or Curve Asym., Position Bottom, Shape Divider Color = next row background, Shape Divider Height smaller on Phone; max two per page |
| Uniform entrance choreography | Column Animation Type Triggered Once When Visible, Fade In From Bottom (or Slight Fade In From Bottom), Column Animation Delay 0/150/300; General Settings Column/Image Animation Timing 650 and Column/Image Animation Easing easeOutCubic; Page Builder Element Animations On Mobile Devices off |
| Fluid rem typography scale | Theme Options > Typography > Responsive Settings > Fluid Typography: Desktop Min 0.8rem, Custom calc(1vw + 0.1rem); Mobile Min 1rem, Max 1.5rem; Body 1rem/1.6, H1 4rem, H2 2.7rem, H3 2rem, H4 1.4rem, Navigation 0.9rem; Load Google Fonts Locally; Default Theme Font Functionality: Do not load default font |
| Restrained palette referenced by every element | Theme Options > Accent Colors: Accent Color (signal red), Extra Color #1 (navy/charcoal), Extra Color #2 (warm light grey), Extra Color #3 (steel blue/green); Extra Color Gradient #1/#2 left blank; General Settings Overall Background Color / Overall Font Color |
| Page-to-page cross-fade | Theme Options > Page Transitions: Transition Method View Transitions API (Modern), effect Fade, Disable Page Transitions On Mobile on |