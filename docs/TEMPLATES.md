# CWLABS Templates

## Cybersecurity templates

Purpose-built for security students and researchers. Each one surfaces the
security-specific fields in the shared object — project `severity` and
`category`, `writeups[]` and `ctf[]` — and no template invents a vulnerability,
CVE, bounty or pentest result. Only the data the student supplied is rendered.

| ID | Name | Direction | Palette | Illustration | Futuristic animation |
|----|------|-----------|---------|--------------|----------------------|
| template-33 | Sentinel | Security operations centre | Deep navy + cyan/mint/amber | Sweeping radar scope, hex shield | Radar sweep with contact blips, 22-bar live telemetry strip, pulsing status dots, scanning portrait |
| template-34 | Cipher | Cryptographic workstation | Near-black + acid lime | Keyhole on a circuit board | Falling hex-rain canvas, hero name decrypts character by character, rotating dashed rings, byte-offset rows |
| template-35 | Gridlock | Cyberpunk dossier | Violet-black + magenta/cyan | Wireframe horizon grid with a sliced sun | Chromatic-aberration glitch on a slow loop, scanline overlay, portrait RGB split on hover, drifting grid |
| template-36 | Vault | Zero-trust architecture | Slate + mint | Nine-band rotating wireframe shield | Shield bands plot in sequence, halo rotation, perimeter trace, scanning media line, sliding contact trace |

The glitch in Gridlock fires on a 7-second loop rather than running forever, so
it reads as an event instead of noise. Every animation is disabled under
`prefers-reduced-motion`, and the Cipher decrypt effect leaves the real name
untouched in that case.

## Animated & illustrated templates

These five lead with illustration and motion rather than typography alone. Each
ships its own inline SVG artwork and namespaced CSS animations, and every
animation is disabled under `prefers-reduced-motion`.

| ID | Name | Direction | Palette | Illustration | Motion |
|----|------|-----------|---------|--------------|--------|
| template-28 | Prism | Animated aurora, refraction | Deep ink + teal/violet/amber | Prism with a spectrum fan | Drifting aurora blobs, orbiting rings, beam flow, pointer parallax on the hero art |
| template-29 | Sketchbook | Hand-drawn notebook | Ruled paper, ink, terracotta | Doodle rocket, scribble underlines, doodled skill icons | Floating hero doodle, taped-note cards, hand-drawn hover tilt |
| template-30 | Nebula | Deep space | Near-black + cyan/gold | Ringed planet with an orbiting moon | Canvas starfield with constellation links, orbit rotation, twinkling stars |
| template-31 | Blueprint | Engineering drafting sheet | Cyanotype blue + amber | Dimensioned axonometric assembly | Strokes plot themselves on scroll, skill rules fill, measured grid |
| template-32 | Origami | Folded paper | Warm paper + indigo/terracotta | Eight-facet folded form | Facets crease into place with a stagger, project panels unfold on hover |

The Nebula starfield pauses while it is off-screen and paints a single static
frame under reduced motion. The Blueprint drawing is simply shown complete.

## New premium templates

| ID | Name | Direction | Palette | Typography | Signature feature |
|----|------|-----------|---------|------------|-------------------|
| template-18 | Monochrome | Swiss minimalism, editorial technology | Black on white | Neo-grotesque, tight hierarchy | Large numbered project case-study index |
| template-19 | Paper & Ink | Independent creative studio, editorial magazine | Ivory + forest green | Serif headings, sans body | Magazine gallery with editorial plates |
| template-20 | Swiss Grid | International typographic style | White / black / red | Large grotesque, numbered sections | Numbered project index in a strict grid |
| template-21 | Brutalist | Contemporary digital brutalism | Cobalt / black / off-white | Oversized condensed headings | Hard-edged project blocks with hover invert |
| template-22 | Zenfolio | Japanese-inspired minimalism | Beige + charcoal + olive | Serif + clean sans | Vertical section labels, calm rhythm |
| template-23 | Operator | Cybersecurity researcher archive | Charcoal + terminal green + red | Monospace technical | Severity labels, CTF log, research archive |
| template-24 | Archive | Personal professional archive | White / grey / navy | Editorial serif | Chronological career timeline |
| template-25 | Data Journal | Data-science research storytelling | Navy / white / teal | Technical editorial | Structured project case studies (problem→results) |
| template-26 | Web Retro | Early-internet desktop interface | Vintage cream + teal | Monospace | Windowed sections + taskbar navigation |
| template-27 | Signature | Premium personal branding | Black + warm yellow | Display serif + sans | Signature identity strip, editorial work grid |

## Original templates (ids preserved)

| ID | Name | Notes |
|----|------|-------|
| template-1 | Studio | Full-bleed cover, overlapping portrait |
| template-2 | vCard | Sticky identity rail + detail column |
| template-3 | Developer CV | Two-column engineering résumé |
| template-4 | Agency | Capability wall + project grid |
| template-5 | Cyber Elite | Dark profile with terminal panel |
| template-6 | Sidebar | Persistent rail nav with scroll-spy |
| template-7 | Minimal | Quiet single column |

## Section coverage

All nineteen new templates map the shared normalised object. Section names differ by
design intent but draw from the same fields:

| Content | Field(s) | Shown by |
|---------|----------|----------|
| Name / role / tagline / location / email | `basics.*` | all |
| Biography | `basics.bio` | all with an About/Biography block |
| Profile photo | `basics.profileImage` | 18, 19, 20, 21, 22, 24, 26, 27, 28, 29, 30, 31, 32 (+ monogram fallback) |
| Cover image | `basics.coverImage` | 18, 19, 21, 27 |
| Social + personal links | `links.*`, `links.other[]` | all |
| Skills | `skills[]` → `skillGroups[]` | all |
| Projects (+ tech, image, links) | `projects[]` | 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32 |
| Project severity / category | `projects[].severity`, `.category` | 23 (Operator), 33, 35, 36 |
| Experience | `experience[]` | 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32 |
| Education | `education[]` | 18, 19, 20, 22, 23, 24, 25, 29, 31, 32 |
| Certificates | `certificates[]` | 19, 22, 23, 24, 25, 27, 28, 30, 31, 32 |
| Achievements | `achievements[]` | 21, 23, 26, 27, 30, 32, 33 |
| Publications | `publications[]` | 19, 23, 24, 29 |
| Technical writeups | `writeups[]` | 23, 34, 35, 36 |
| CTF achievements | `ctf[]` | 23, 33, 35 |

Templates 3, 5, 7 and 23 are deliberately text-first designs (résumé, terminal,
minimal, research archive) and do not render project images; this is a design
decision, not a data-mapping gap.

## Empty-state behaviour

Every section is guarded by a `has.*` flag from the adapter. A portfolio with no
projects, no experience, no certificates or no images renders without empty
headings, broken images or placeholder text. Where a profile photo is missing,
templates show an initials monogram instead of a broken image.
