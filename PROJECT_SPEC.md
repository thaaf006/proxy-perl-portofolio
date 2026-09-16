# Group Portfolio Website — Project Specification

## 1. Project Overview

Build a modern, premium, frontend-only portfolio website for a university group consisting of **12 people**:

* 1 Leader
* 1 PJK
* 10 Members

The website serves as a digital profile of the group and its members.

The main purposes are:

* Introduce the group
* Showcase all 12 members
* Display detailed biodata for each member
* Display group documentation through a gallery
* Create a polished and memorable group identity

This is a **frontend-only project**.

Do not create unnecessary backend functionality.

---

# 2. Important: Inspect Existing Project First

Before modifying any code:

1. Inspect the entire repository.
2. Inspect the existing folder structure.
3. Read `package.json`.
4. Read the existing Next.js configuration.
5. Read the existing shadcn/ui configuration.
6. Read `AGENTS.md` if it exists.
7. Identify installed dependencies before installing anything.
8. Reuse existing packages whenever possible.

The project has already been initialized using the recommended Next.js configuration and shadcn/ui.

Do NOT recreate the project.

Do NOT run `create-next-app`.

Do NOT reinitialize shadcn/ui.

Adapt to the existing setup.

---

# 3. Existing Technology

The project already uses or is expected to use:

* Next.js
* React
* TypeScript
* Tailwind CSS
* App Router
* ESLint
* shadcn/ui
* Base UI
* Geist
* Lucide icons

The shadcn/ui preset was initialized using:

**Nova — Lucide / Geist**

Preserve this setup.

---

# 4. Additional Frontend Stack

Install additional packages only when genuinely necessary.

For animation, use:

* Motion

For theme management, use:

* next-themes

Prefer existing Lucide integration for icons.

Do not install multiple libraries that solve the same problem.

Do not add large dependencies for functionality that can be implemented simply.

Keep the dependency tree lightweight.

---

# 5. Strict Frontend-Only Scope

Do NOT implement:

* Database
* Authentication
* Login
* Register
* Admin dashboard
* Backend API
* REST API
* GraphQL
* Server database
* Prisma
* Drizzle
* Neon
* Supabase
* Firebase
* Resend
* SMTP
* CMS
* Payment system
* Contact form backend

No `.env` file should be required for this project.

All content should be stored locally.

---

# 6. Content Architecture

Keep content separate from presentation.

Create:

```txt
data/
  members.ts
  gallery.ts
```

The UI components must read member and gallery information from these files.

Do NOT manually duplicate member markup 12 times.

Do NOT hardcode member biodata directly inside UI components.

---

# 7. Placeholder Strategy

Real member data and final assets will be added manually by the project owner later.

Therefore:

* Create exactly 12 placeholder member entries.
* Create 1 Leader.
* Create 1 PJK.
* Create 10 Members.
* Make every placeholder easy to identify and replace.
* Do not invent realistic personal information.
* Do not generate fake identities.
* Do not depend on remote placeholder image services.

Use neutral placeholders such as:

* Member 01
* Member 02
* Member 03
* GXXXXXXXX
* City / Region
* DD Month YYYY
* Hobby 1
* Hobby 2
* Fun fact goes here

The website must remain visually presentable even before real photos are added.

If an image file does not exist, display an intentional local placeholder state instead of a broken image.

---

# 8. Member Data Model

Create a strongly typed member structure.

Recommended model:

```ts
export type MemberRole = "Leader" | "PJK" | "Member"

export interface Member {
  id: string
  name: string
  role: MemberRole
  image?: string

  nim?: string
  origin?: string
  birthday?: string

  hobbies?: string[]
  funFact?: string

  instagram?: string
  email?: string
  github?: string
}
```

You may improve the structure when there is a clear reason, but keep it simple and easy to edit.

---

# 9. Gallery Data Model

Create a simple typed gallery structure.

Example:

```ts
export interface GalleryItem {
  id: string
  src?: string
  alt: string
  caption?: string
}
```

Gallery data should live inside:

```txt
data/gallery.ts
```

Do not require real images for the initial implementation.

---

# 10. Final Website Structure

Build primarily as a polished single-page website.

Main page flow:

```txt
Navbar
↓
Hero
↓
About Group
↓
Members
↓
Gallery
↓
Footer
```

There is:

* NO Projects section
* NO standalone Contact section

Contact information belongs inside each member's biodata.

---

# 11. Overall Visual Direction

The website should feel:

* Premium
* Modern
* Clean
* Youthful
* Personal
* Elegant
* Editorial
* Visually confident
* Appropriate for university students

The website should NOT look like:

* Admin dashboard
* SaaS dashboard
* Corporate company landing page
* Generic template
* Generic AI-generated landing page
* Gaming website
* Cyberpunk website
* Excessively futuristic website

The website should feel intentionally designed.

---

# 12. Design Philosophy

Use an editorial portfolio approach.

Prioritize:

* Strong typography
* Member photography
* Generous whitespace
* Clean composition
* Visual hierarchy
* Carefully controlled accent color
* Subtle borders
* Intentional asymmetry where appropriate
* Smooth but restrained motion

Avoid filling every empty space.

Whitespace is part of the design.

---

# 13. Color Direction

Use a restrained palette.

Primary accent:

**Blue**

Light mode direction:

* Off-white or soft neutral page background
* White/light surfaces
* Charcoal primary text
* Muted gray secondary text
* Blue accent
* Soft neutral borders

Dark mode direction:

* Deep charcoal background
* Slightly lighter surfaces
* Off-white primary text
* Muted neutral secondary text
* Blue accent
* Subtle dark borders

Do NOT make large portions of the website bright blue.

Use blue selectively for:

* CTA
* Active states
* Links
* Small labels
* Role indicators
* Interactive accents
* Focus states

Avoid excessive gradients.

If gradients are used, keep them subtle.

---

# 14. Typography

Use the existing Geist typography setup whenever appropriate.

Typography should carry much of the visual identity.

Use strong hierarchy.

Hero heading:

* Large
* Bold
* High visual impact
* Responsive using `clamp()` or appropriate Tailwind responsive sizing

Section titles:

* Strong
* Clean
* Easy to scan

Body text:

* Comfortable
* Concise
* High readability

Metadata:

* Smaller
* Visually secondary

Avoid excessive font sizes and weights.

Avoid long paragraphs.

---

# 15. Navbar

Create a responsive navbar.

Desktop navigation:

* Home
* About
* Members
* Gallery

Include:

* Group name/logo placeholder
* Navigation links
* Theme toggle

Navbar behavior:

* Sticky or subtly floating
* Clean
* Compact
* Responsive

Choose the exact treatment based on the overall design.

Navigation links should scroll smoothly to their respective sections.

---

# 16. Mobile Navigation

Create an intentional mobile navigation experience.

Do not simply compress desktop navigation.

Use a compact mobile menu appropriate for the design.

It must:

* Be touch friendly
* Have clear navigation
* Be keyboard accessible
* Close correctly after selecting a section

Do not create unnecessarily complicated navigation.

---

# 17. Theme Toggle

Implement Light/Dark mode using `next-themes`.

Requirements:

* One-click toggle
* Sun/Moon icon
* No theme dropdown
* No color theme selector
* No unnecessary system-theme selector UI
* Persist preference

Avoid hydration mismatch.

Both themes should look intentionally designed.

---

# 18. Hero Section

Create a visually strong Hero section.

Content:

* Group name placeholder
* Short tagline placeholder
* Very concise description
* Primary CTA

Primary CTA:

**Meet The Team**

CTA scrolls to Members.

Do not write long marketing copy.

---

# 19. Hero Visual

The Hero should have an editorial visual composition.

Potential direction:

Desktop:

* Large typography on one side
* Member/group photo composition on the other side

Mobile:

* Typography first
* Visual composition below

Because final assets are not yet available, create an intentional placeholder composition.

Do NOT use remote stock photos.

Do NOT generate random human faces.

Do NOT create fake member photos.

The placeholder should still make the intended final composition obvious.

---

# 20. Hero Motion

Use Motion for a subtle entrance sequence.

Recommended:

* Heading fade + slide-up
* Supporting text slightly delayed
* CTA slightly delayed
* Visual elements staggered subtly

Keep durations restrained.

Do not make users wait for animation.

Do not animate every word individually unless it is extremely subtle and performant.

---

# 21. About Section

Create a concise About section.

Content should use obvious placeholder copy that can easily be replaced.

Possible structure:

* Section label
* Strong heading
* 1–2 short paragraphs
* Group statistics

Statistics:

* 12 People
* 1 Leader
* 1 PJK
* 10 Members

Do not create long walls of text.

---

# 22. Members Section

The Members section is the most important part of the website.

Display exactly:

* 1 Leader
* 1 PJK
* 10 Members

Total:

**12 people**

Use a responsive grid.

Suggested behavior:

Desktop:

* approximately 3–4 cards per row

Tablet:

* approximately 2–3 cards per row

Mobile:

* 1–2 cards per row depending on available width

Prioritize member photography.

---

# 23. Member Card

Create reusable:

```txt
MemberCard
```

Default card should primarily show:

* Member photo / placeholder
* Full name
* Role

Do not display the full biodata on the card.

Cards must clearly feel clickable.

Possible interactions:

* Subtle image zoom
* Slight card movement
* Border transition
* Arrow/icon reveal

Keep hover effects restrained.

Mobile interaction must not depend on hover.

---

# 24. Member Role Hierarchy

Roles:

```txt
Leader
PJK
Member
```

Leader and PJK may have subtle visual distinction.

Possible approaches:

* Small badge
* Accent border
* Tiny role indicator

Do not make Leader or PJK dramatically larger than other members.

The design should still communicate that all 12 people belong to one group.

---

# 25. Member Biodata Interaction

Clicking or tapping a MemberCard must open the member's detailed biodata.

This interaction must be responsive.

Desktop:

Use a polished centered dialog/modal.

Mobile:

Use a mobile-appropriate sheet, drawer, or near-full-screen profile panel.

Do NOT simply shrink the desktop modal onto mobile.

The mobile profile must be comfortable to scroll and use with one hand.

Use existing shadcn/ui/Base UI primitives when appropriate.

---

# 26. Desktop Biodata Layout

Recommended conceptual layout:

```txt
┌────────────────────────────────────────────┐
│                                        ×   │
│                                            │
│  ┌──────────────┐   MEMBER NAME            │
│  │              │   Role                   │
│  │              │                          │
│  │    PHOTO     │   NIM                    │
│  │              │   Origin                 │
│  │              │   Birthday               │
│  └──────────────┘                          │
│                       Hobbies              │
│                                            │
│                       Fun Fact             │
│                                            │
│                       Social Links         │
│                                            │
└────────────────────────────────────────────┘
```

This is conceptual guidance, not a rigid wireframe.

Improve it when a better editorial composition is possible.

---

# 27. Mobile Biodata Layout

Recommended direction:

```txt
┌──────────────────────┐
│        ─────         │
│                      │
│    MEMBER PHOTO      │
│                      │
│ Member Name          │
│ Role                 │
│                      │
│ NIM                  │
│ GXXXXXXXX            │
│                      │
│ ORIGIN               │
│ City / Region        │
│                      │
│ BIRTHDAY             │
│ DD Month YYYY        │
│                      │
│ HOBBIES              │
│ Hobby · Hobby        │
│                      │
│ FUN FACT             │
│ Placeholder text     │
│                      │
│ IG   EMAIL   GITHUB  │
└──────────────────────┘
```

Make the panel vertically scrollable when necessary.

---

# 28. Biodata Fields

Each member profile supports:

* Full name
* Role
* Photo
* NIM
* Region / place of origin
* Date of birth
* Hobbies
* Fun fact
* Instagram
* Email
* GitHub

Do not render empty optional fields unnecessarily.

---

# 29. Social Links

Member social links should appear as compact interactive controls.

Support:

* Instagram
* Email
* GitHub

Use appropriate Lucide icons when available.

For external links:

* Open safely
* Use appropriate `target` and `rel` attributes when needed

Email should use:

```txt
mailto:
```

If placeholder data does not contain a real URL, disable or hide the control rather than navigating to an invalid destination.

---

# 30. Member Image Strategy

Final member images will later be placed inside:

```txt
public/
  members/
```

Recommended final naming:

```txt
member-01.jpg
member-02.jpg
member-03.jpg
...
member-12.jpg
```

Make the mapping easy to change inside `data/members.ts`.

Use Next.js `Image` for real images.

Use consistent aspect ratios.

Use `object-cover` where appropriate.

Avoid layout shift.

---

# 31. Gallery Section

Create a visually strong group gallery.

Do NOT make it look like a basic uniform image grid.

Preferred direction:

* Bento grid
* Editorial grid
* Masonry-inspired composition

Mix visual proportions intentionally.

Final images will later be stored inside:

```txt
public/
  gallery/
```

Recommended naming:

```txt
gallery-01.jpg
gallery-02.jpg
gallery-03.jpg
...
```

---

# 32. Gallery Placeholder

Because final images are not available yet:

* Create intentional placeholder blocks
* Clearly show the intended final image proportions
* Do not use broken `<img>` elements
* Do not use remote stock imagery

The gallery must still look designed before assets are added.

---

# 33. Gallery Interaction

If appropriate, allow clicking gallery images to view them larger.

Keep the interaction lightweight.

Do not add a large gallery library unless genuinely necessary.

Prefer existing dialog primitives or a simple custom implementation.

---

# 34. Footer

Create a minimal footer.

Include:

* Group name placeholder
* Current year
* Short closing line if visually appropriate

Do not create a large sitemap.

Do not add unnecessary content.

---

# 35. Animation System

Use Motion for meaningful animation.

Animation should make the website feel polished, not flashy.

Recommended motion patterns:

### Initial Hero

* Fade
* Small vertical translation
* Subtle stagger

### Section Reveal

* Opacity
* Small Y translation

### Member Cards

* Slight image scale
* Small card movement
* Border transition

### Member Biodata

Desktop:

* Fade + subtle scale

Mobile:

* Smooth slide from bottom

### Gallery

* Subtle reveal
* Lightweight hover zoom

### Navbar

* Subtle background/border transition when scrolling if appropriate

---

# 36. Animation Rules

Do NOT use:

* Constant floating animations
* Excessive bouncing
* Extreme spring effects
* Scroll hijacking
* Heavy parallax
* Cursor followers
* Custom cursors
* Excessive text splitting
* Animations that block interaction
* Animations on every small UI element

Prefer transform and opacity animations.

Respect:

```css
prefers-reduced-motion
```

when possible.

Mobile performance is a priority.

---

# 37. Responsive Design

The website must be mobile-first.

Priority:

1. Mobile
2. Tablet
3. Desktop

Do not treat mobile as a compressed desktop version.

Specifically verify:

* Hero
* Navbar
* Member grid
* Member detail
* Gallery
* Footer
* Theme toggle

Touch targets should be comfortable.

Avoid horizontal overflow.

---

# 38. Suggested Project Architecture

Use a clean architecture similar to:

```txt
app/
  layout.tsx
  page.tsx
  globals.css

components/
  layout/
    Navbar.tsx
    Footer.tsx

  sections/
    HeroSection.tsx
    AboutSection.tsx
    MembersSection.tsx
    GallerySection.tsx

  members/
    MemberCard.tsx
    MemberDetail.tsx

  gallery/
    GalleryGrid.tsx
    GalleryDialog.tsx

  shared/
    SectionHeading.tsx
    ThemeToggle.tsx

  ui/

data/
  members.ts
  gallery.ts

lib/

public/
  members/
  gallery/
```

This is a recommendation, not a rigid requirement.

Adapt to the existing repository when necessary.

Do not overengineer.

---

# 39. Component Principles

Create components when:

* They are reusable
* They significantly improve readability
* They isolate meaningful functionality

Do NOT create a separate component for every tiny piece of markup.

Avoid giant files.

Avoid excessive abstraction.

---

# 40. Accessibility

Maintain good accessibility.

Requirements:

* Semantic HTML
* Useful heading hierarchy
* Image alt text
* Keyboard accessible member cards
* Keyboard accessible dialog
* Proper focus management
* Visible focus states
* Escape key closes dialogs when expected
* Adequate contrast
* Accessible labels for icon-only buttons
* Respect reduced motion

Use accessible primitives provided by shadcn/ui/Base UI whenever appropriate.

---

# 41. Performance

Prioritize performance, especially on mobile.

Use:

* Next.js Image where appropriate
* Efficient animation
* Minimal client components
* Lazy loading where appropriate
* Lightweight dependencies

Do not convert the entire page into a Client Component just to support animation.

Keep server/client boundaries intentional.

Avoid unnecessary JavaScript.

---

# 42. Code Quality

Use:

* TypeScript
* Strong typing
* Clear naming
* Clean imports
* Reusable components
* Consistent formatting

Avoid:

* `any`
* Duplicate code
* Dead code
* Unused imports
* Unused dependencies
* Excessive comments
* Console logs in final implementation

Follow existing ESLint rules.

---

# 43. Important Content Editing Requirement

The project owner will manually replace content after implementation.

Therefore make it extremely obvious where edits should happen.

The owner should mainly need to modify:

```txt
data/members.ts
data/gallery.ts
```

and place files inside:

```txt
public/members/
public/gallery/
```

Avoid requiring the owner to edit UI components just to change member biodata.

---

# 44. Development Workflow

Implement the entire specification autonomously from start to finish.

Do NOT stop after each checkpoint waiting for confirmation.

However, create **3 local Git checkpoint commits** during development.

Never push.

---

# CHECKPOINT 1 — Foundation

First:

1. Inspect repository.
2. Inspect `package.json`.
3. Inspect existing configuration.
4. Read `AGENTS.md`.
5. Preserve the existing Next.js/shadcn setup.
6. Install only genuinely necessary frontend dependencies.
7. Establish global design system.
8. Configure theme system.
9. Establish typography.
10. Create clean folder architecture.
11. Create typed member data.
12. Create typed gallery data.
13. Create reusable foundational components where necessary.

Before committing:

* Run relevant lint checks.
* Fix issues caused by the implementation.

Then:

```bash
git add .
git commit -m "feat: establish portfolio foundation and design system"
```

DO NOT PUSH.

Continue automatically to Checkpoint 2.

---

# CHECKPOINT 2 — Main Experience

Implement:

1. Navbar
2. Mobile navigation
3. Theme toggle
4. Hero
5. About
6. Members section
7. Member cards
8. Member biodata interaction
9. Desktop biodata dialog
10. Mobile biodata experience
11. Social links
12. Gallery
13. Footer
14. Placeholder states

Verify:

* All 12 members render.
* 1 Leader exists.
* 1 PJK exists.
* 10 Members exist.
* Every member card opens the correct profile.
* Placeholder data does not break the UI.
* Mobile interaction works.

Run relevant checks.

Then:

```bash
git add .
git commit -m "feat: build complete group portfolio experience"
```

DO NOT PUSH.

Continue automatically to Checkpoint 3.

---

# CHECKPOINT 3 — Motion, Responsive Polish & QA

Review the entire website.

Improve:

* Motion
* Section reveal
* Hero entrance
* Member interactions
* Biodata transitions
* Gallery interaction
* Mobile responsiveness
* Tablet responsiveness
* Desktop responsiveness
* Typography
* Spacing
* Visual rhythm
* Light mode
* Dark mode
* Accessibility
* Performance

Test common viewport widths.

Pay special attention to approximately:

```txt
320px
375px
390px
430px
768px
1024px
1280px
1440px
```

Do not hardcode layouts specifically for each width.

Use responsive design principles.

---

# 45. Final Quality Checks

Before the final commit:

Run:

```bash
npm run lint
```

and:

```bash
npm run build
```

Fix errors caused by the implementation.

Do not ignore TypeScript errors merely to make the build pass.

Do not disable ESLint rules globally just to hide problems.

Remove:

* Dead code
* Debug logs
* Unused imports
* Unused packages
* Temporary development artifacts

Then:

```bash
git add .
git commit -m "chore: polish responsive design motion and accessibility"
```

DO NOT PUSH.

---

# 46. Git Rules

You MAY:

* Create files
* Modify files
* Delete unnecessary starter files
* Install necessary frontend dependencies
* Run npm commands
* Run lint
* Run build
* Use git status
* Use git diff
* Use git add
* Create local commits

You MUST NOT:

* `git push`
* `git push --force`
* Force push
* Deploy the application
* Modify remote repository history
* Delete or rewrite existing Git history unnecessarily

All commits must remain local.

The project owner will push manually.

---

# 47. Decision-Making Rules

Do not interrupt implementation for minor visual decisions.

When information is missing:

1. Use a sensible placeholder.
2. Make it obvious that it is a placeholder.
3. Keep it easy to replace.
4. Continue implementation.

Do not ask for:

* Member names
* Member photos
* NIM
* Birthdays
* Instagram
* GitHub
* Gallery images

during implementation.

The project owner will add those later.

Only stop and ask for clarification if proceeding would risk destructive changes or if a genuinely critical technical ambiguity cannot be resolved from the repository.

---

# 48. Do Not Overengineer

This is a group portfolio website.

Keep the implementation appropriately simple.

Do not introduce:

* Global state libraries unless genuinely necessary
* Redux
* Zustand unless genuinely necessary
* Complex context architecture
* Database abstraction
* API abstraction
* Form libraries without forms
* Validation libraries without a need
* Large animation frameworks beyond Motion
* Multiple icon libraries
* Multiple UI libraries

Prefer simple React composition.

---

# 49. Final Expected User Experience

The intended journey is:

```txt
Open Website
      ↓
Discover Group Identity
      ↓
Read Short Introduction
      ↓
Explore 12 Members
      ↓
Tap a Member
      ↓
View Personal Biodata
      ↓
Visit Their Social Links
      ↓
Close Profile
      ↓
Explore Other Members
      ↓
Browse Group Gallery
```

The experience should feel fast and natural.

---

# 50. Final Deliverable

At completion, the website must:

* Run successfully
* Build successfully
* Be responsive
* Support light/dark mode
* Display exactly 12 placeholder members
* Support detailed member biodata
* Support Leader/PJK/Member roles
* Provide member social links
* Provide a gallery
* Use intentional placeholder states
* Use subtle Motion animation
* Be keyboard accessible
* Be mobile friendly
* Have clean TypeScript architecture
* Require no backend
* Require no environment variables
* Be ready for manual content replacement
* Be ready for the project owner to push and deploy manually

---

# 51. Final Agent Response

After Checkpoint 3 is committed, stop.

Do NOT push.

Provide a concise final report containing:

1. What was implemented.
2. Dependencies added.
3. The three Git commits created.
4. Where member data should be edited.
5. Where member photos should be placed.
6. Where gallery data should be edited.
7. Where gallery images should be placed.
8. Any placeholder group name/tagline that still needs replacement.
9. Confirmation that `npm run lint` passed.
10. Confirmation that `npm run build` passed.
11. Any genuinely important remaining manual steps.

Do not continue making changes after the final report unless explicitly instructed.
