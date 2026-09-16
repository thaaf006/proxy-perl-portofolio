# PROXY PERL — Visual Redesign Specification

## Objective

Redesign the existing Group Portfolio website without rebuilding the project from scratch.

The website is already functional. Preserve all existing content architecture, member data structure, gallery data structure, theme system, dialogs, mobile sheets, accessibility behavior, and responsive functionality.

The goal is to transform the current design from a plain portfolio into a distinctive:

MODERN DEVELOPER × RETRO DIGITAL × EDITORIAL PORTFOLIO

The group's name is:

PROXY PERL

The name "PERL" is inspired by the Perl programming language.

The website should subtly communicate programming and developer culture without becoming a stereotypical hacker, Matrix, cyberpunk, gaming, or futuristic website.

It should feel like a creative Computer Science student group portfolio.

---

# 1. Core Visual Direction

Use a visual language inspired by:

- modern developer portfolios
- retro digital interfaces
- editorial web design
- programming culture
- technical documentation
- clean Swiss-inspired layouts

The result must remain:

- premium
- youthful
- clean
- personal
- creative
- modern
- readable
- spacious

Avoid:

- generic SaaS landing page aesthetics
- excessive gradients
- excessive glow
- neon cyberpunk visuals
- Matrix rain
- fake command-line overload
- glassmorphism everywhere
- excessive rounded cards
- excessive shadows
- 3D elements
- overly futuristic interfaces
- dashboard-style layouts
- excessive animations
- gimmicky hacker visuals

Programming references should appear as subtle design details, not dominate the website.

---

# 2. Color System

Maintain both light and dark mode.

Light mode:
- off-white / warm white background
- charcoal text
- subtle gray borders
- electric/cobalt blue primary accent
- optional restrained purple secondary accent

Dark mode:
- deep charcoal / near-black background
- off-white text
- muted gray secondary text
- electric/cobalt blue primary accent
- optional restrained purple secondary accent

Do not make the website pure black and neon blue.

The blue accent should feel sophisticated rather than gaming-oriented.

---

# 3. Typography

Continue using Geist for primary typography.

Use Geist Mono strategically for:

- section numbers
- technical labels
- metadata
- roles
- member numbers
- small programming references
- navigation indicators
- terminal content

Create stronger typography hierarchy.

Use oversized editorial typography in important areas, especially the Hero.

---

# 4. Global Technical Details

Introduce subtle technical visual details throughout the website.

Examples:

01 / HERO
02 / ABOUT
03 / MEMBERS
04 / GALLERY

Small decorative programming characters may be used:

{ }
</>
$
::
_
[]

These elements must remain subtle.

Add a very subtle background system using one or more of:

- technical grid
- dot grid
- thin lines
- noise/grain texture
- oversized faded numbers
- subtle code-like markings

Do not make the background visually busy.

---

# 5. Navbar

Redesign the navbar to feel more like a creative developer portfolio.

Suggested identity:

PROXY / PERL

or

PROXY_PERL

Keep navigation simple.

Include:

- About
- Members
- Gallery
- Theme toggle

Add subtle interaction animations.

Examples:

- animated underline
- small arrow movement
- text shift
- active section indicator

Navbar should remain highly usable on mobile.

---

# 6. Hero Section

The Hero must become the strongest visual section of the website.

Suggested hierarchy:

01 / PROXY PERL

WE ARE
PROXY
PERL_

The underscore after PERL should behave like a subtle blinking coding cursor.

Supporting copy may communicate:

"Not just a programming language.
This is our story."

Do not make the text overly corporate.

Add:

[ MEET THE TEAM ↘ ]

or another restrained CTA.

Use large editorial typography and asymmetric composition.

The Hero should feel visually rich while retaining whitespace.

---

# 7. Hero Terminal Element

Add one small decorative terminal-inspired component.

Example sequence:

$ perl --group

> Loading members...

[████████████] 12/12

> Proxy PERL initialized.

The terminal should animate only when appropriate.

Typing animation should run once rather than looping continuously.

Keep the terminal visually minimal.

Do not turn the entire Hero into a fake IDE.

On smaller mobile screens, simplify the terminal if necessary.

Respect prefers-reduced-motion.

---

# 8. About Section

Keep the existing group information.

Redesign its presentation with editorial composition.

Optionally include ONE small programming-inspired data visualization such as:

const proxyPerl = {
  leader: 1,
  pjk: 1,
  members: 10,
  total: 12,
  story: "one"
};

This is decorative.

Do not turn the entire About section into source code.

---

# 9. Members Section

Keep exactly:

- 1 Leader
- 1 PJK
- 10 Members

Keep member data coming from the existing data/members.ts.

Do not hardcode member data into components.

Use section styling such as:

03 / MEMBERS

meet_the_team()

Member cards should remain photo-focused.

Each card should display only essential information:

- member number
- photo
- name
- role
- subtle view profile interaction

Example visual language:

01                         ↗

[ MEMBER PHOTO ]

ALTHAAF BINTANG
Leader

< view_profile />

Do not literally force this exact layout if a better composition fits the existing design.

Leader and PJK should have subtle visual distinction.

---

# 10. Member Card Interaction

Improve hover interactions.

Desktop:

- subtle image zoom
- border/accent transition
- small arrow movement
- metadata reveal
- optional image overlay
- custom cursor state

Do not make cards jump dramatically.

Use smooth Motion animations.

Cards must remain keyboard accessible.

---

# 11. Member Profile

Preserve all existing member details:

- photo
- name
- role
- NIM
- origin
- birthday
- hobbies
- fun fact
- Instagram
- GitHub
- email

Desktop:
use the existing centered dialog concept.

Mobile:
use the existing bottom-sheet/full-screen-ish profile experience.

Restyle profile metadata using subtle developer-inspired labels.

Example:

PROFILE / 01

> NIM
GXXXXXXXX

> ORIGIN
Bogor, West Java

> HOBBIES
["Coding", "Gaming", "Music"]

> FUN_FACT
"..."

Do not sacrifice readability for the programming aesthetic.

---

# 12. Gallery

Keep data coming from data/gallery.ts.

Maintain the bento/editorial/masonry-inspired layout.

Make the gallery feel more dynamic.

On hover:

- subtle image scale
- overlay
- gallery index
- title/caption reveal
- arrow movement

Example:

[ MEMORY / 01 ]

Group Moment

                         ↗

Use restrained Motion transitions.

---

# 13. Motion System

The current website feels too static.

Improve the motion design significantly while keeping it sophisticated.

Use the existing Motion library.

Create a consistent motion system.

Recommended animation language:

- masked text reveal
- fade + translate
- staggered children
- subtle scale
- clip-path or overflow reveal where appropriate
- smooth modal transitions
- subtle hover transformations

Avoid:

- bouncing everywhere
- exaggerated spring physics
- excessive parallax
- scroll hijacking
- constant looping animations

---

# 14. Hero Entrance Animation

When the page first loads:

1. technical Hero label appears
2. WE ARE reveals
3. PROXY reveals
4. PERL_ reveals
5. supporting copy appears
6. CTA appears
7. terminal appears

Use staggered timing.

The full sequence should feel fast and intentional.

Target approximately 0.8–1.4 seconds for the main visual reveal.

Do not make users wait for the website.

---

# 15. Scroll Reveal

Sections should reveal when entering the viewport.

Use subtle staggered animation for:

- section headings
- member cards
- gallery items
- supporting text

Animations should generally run once.

Avoid replaying distracting animations every time the user scrolls up and down.

---

# 16. Scroll Progress Indicator

Add a thin scroll progress indicator at the top of the viewport.

Use the primary blue accent.

It should grow horizontally as the page scrolls.

Keep it extremely thin and unobtrusive.

---

# 17. Custom Cursor

Implement a premium custom cursor for pointer-based desktop devices.

The custom cursor should consist of:

- a small central dot
- a larger circular follower/ring

Behavior:

Normal:
small dot + subtle follower.

Interactive elements:
follower expands slightly when hovering:

- links
- buttons
- member cards
- gallery items
- theme toggle

Member/gallery hover:
optionally show a very small label inside or near the follower:

VIEW ↗

The follower should have subtle easing/inertia so it follows the pointer slightly behind the central dot.

Do NOT create:

- particle trails
- sparkles
- glowing explosions
- excessive blur
- huge cursor blobs

The cursor should reinforce the premium developer aesthetic.

Important:

- disable the custom cursor on touch devices
- disable it on mobile
- preserve the native cursor when custom cursor is inappropriate
- do not break text selection
- do not interfere with buttons or links
- do not reduce accessibility
- respect prefers-reduced-motion
- keep performance smooth

Implement the cursor efficiently.

Avoid React state updates on every mousemove if they cause unnecessary rerenders.

Prefer Motion values, refs, or requestAnimationFrame where appropriate.

---

# 18. Microinteractions

Add refined microinteractions.

Examples:

Navigation:
animated underline or indicator.

Buttons:
arrow shifts several pixels on hover.

Member cards:
photo zoom + metadata reveal.

Gallery:
image scale + caption reveal.

Social links:
icon or arrow movement.

Theme toggle:
smooth icon transition.

Logo:
very subtle character shift or accent animation.

Do not animate every piece of text.

---

# 19. Responsive Design

Preserve mobile-first responsive behavior.

Desktop may use:

- asymmetric editorial layouts
- oversized typography
- custom cursor
- richer hover interactions

Mobile should simplify:

- no custom cursor
- reduced decorative elements
- appropriately sized Hero typography
- touch-friendly interactions
- simplified terminal
- bottom-sheet member profiles

No horizontal overflow.

Test at common mobile, tablet, laptop, and large desktop widths.

---

# 20. Accessibility

Preserve or improve existing accessibility.

Requirements:

- semantic HTML
- keyboard navigation
- visible focus states
- correct button semantics
- descriptive alt text
- accessible dialogs/sheets
- sufficient contrast
- reduced-motion support

prefers-reduced-motion must significantly reduce:

- typing animation
- cursor animation
- scroll reveals
- large transitions

Functionality must remain available.

---

# 21. Performance

Keep animations performant.

Prefer:

- transform
- opacity
- Motion values

Avoid expensive layout animation when unnecessary.

Do not introduce large animation libraries when Motion already provides the needed functionality.

Do not add unnecessary dependencies.

---

# 22. Existing Architecture

Before modifying anything:

1. inspect the repository
2. inspect AGENTS.md
3. inspect package.json
4. inspect existing components
5. inspect data/members.ts
6. inspect data/gallery.ts
7. inspect data/group.ts
8. inspect the current theme implementation
9. inspect existing Motion usage

Preserve good existing architecture.

Refactor only when it materially improves the implementation.

Do not rebuild the application from scratch.

---

# 23. Content Rules

Do not replace real data if I have already entered it.

Do not invent real member information.

Keep placeholder data where real information is unavailable.

Do not use fake AI-generated human faces.

Do not download random stock member photos.

Use the existing local asset strategy.

---

# 24. Git Safety

Before making changes:

- confirm the working tree state
- do not delete previous Git history
- do not amend previous commits
- do not force push
- do not push
- do not deploy

Create ONE new local commit after the redesign is complete.

Suggested commit message:

design: introduce proxy perl developer identity

Do not push this commit.

---

# 25. Verification

Before committing:

Run:

npm run lint

and:

npm run build

Fix implementation errors.

Also manually inspect for:

- desktop layout
- tablet layout
- mobile layout
- light mode
- dark mode
- cursor behavior
- member profile interaction
- gallery interaction
- keyboard navigation
- reduced motion
- horizontal overflow

---

# 26. Final Report

After completing the redesign, provide:

1. summary of visual changes
2. animation improvements
3. custom cursor behavior
4. components/files created
5. components/files modified
6. lint result
7. production build result
8. responsive/accessibility checks
9. final commit hash
10. confirmation that nothing was pushed or deployed

Then stop.