# PROXY PERL

A frontend-only Next.js App Router portfolio for 12 people, using the existing Nova / Base UI setup, Geist, Tailwind, Lucide, Motion, and next-themes. No environment variables or backend are required.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production verification, run `npm run lint`, `npm run build`, then `npm start`.

## Replace the placeholders

- **Group identity and copy:** `data/group.ts`. The group name is PROXY PERL. Update `Different minds. One shared story.`, university/class, descriptions, and about copy as needed. The tagline is a sample placeholder. Optional `heroImage` accepts a local path such as `/gallery/group.jpg`.
- **Members:** edit the 12 objects in `data/members.ts`. Keep one Leader, one PJK, and ten Members. Each object supports name, role, image, NIM, origin, birthday, hobbies, fun fact, Instagram, email, and GitHub.
- **Member photos:** place `member-01.jpg` through `member-12.jpg` in `public/members/`, then set each member's `image` to `/members/member-01.jpg` (and so on). Portrait crops work best. There is no need to modify components.
- **Gallery:** edit `data/gallery.ts`. Place `gallery-01.jpg` and subsequent images in `public/gallery/`, then set each entry's `src`. Replace captions and alt text to describe your actual photos. The layout repeats automatically if you add entries.
- **Social links:** supply full HTTPS profile URLs; supply plain email addresses. Leave missing values undefined. Invalid URLs and example.com placeholders are hidden. Social destinations open in a new tab safely; email opens with mailto.
- **Images:** use local public paths. Missing or failed images fall back to the abstract placeholders. No remote image service is needed.
- **Optional fields:** empty values are omitted from profiles.
- Replace the `[p]` identity mark in `components/layout/Navbar.tsx` and `app/icon.svg` if you have a final logo. Metadata derives from group data.

## Structure

`app/page.tsx` composes server-rendered sections. Client boundaries are limited to navigation, theme, image fallbacks, Motion wrappers, and interactive Base UI dialogs. Shared styles and theme tokens live in `app/globals.css`. Member and gallery dialogs provide focus trapping, Escape dismissal, and focus restoration; mobile profiles use a scrollable bottom panel.

## QA

The implementation is checked with ESLint and a production build. Browser checks cover 320, 375, 390, 430, 768, 1024, 1280, and 1440px; all 12 profile mappings and role counts; mobile navigation; gallery dialogs; persisted themes; keyboard focus restoration/trapping; reduced motion; and horizontal overflow. Replace placeholders before sharing the website publicly and check the crops and alt text of your final photos.

All three implementation checkpoint commits remain local. Nothing was pushed or deployed.

## Developer identity and motion

The redesign preserves member/gallery data, Base UI dialogs, local image fallbacks, and next-themes. No dependencies were added. Geist Mono labels, cobalt accents, restrained technical grids, an editorial wordmark, and a small decorative Perl terminal establish the PROXY PERL identity.

`lib/motion.ts` contains shared easing and reveal timing. `HeroEntrance` sequences the masked hero lines in about 1.2 seconds. `HeroTerminal` types once; its progress bar settles, while the Hero underscore blinks quietly until reduced motion is requested. `Reveal` runs section/card reveals once. Member/gallery hover animations use Motion while keyboard and touch users retain visible controls.

`CustomCursor` uses Motion values and spring followers, without rendering React on pointer movement. It activates only for mouse input on fine-pointer, hover-capable viewports at least 1024px wide. Touch, mobile, reduced motion, keyboard navigation, and text selection use native cursor behavior. `ScrollProgress` uses a direct Motion value for the thin reading progress line.

Reduced motion disables the custom cursor, typing, blinking, animated reveals, and large transitions. The server-rendered content stays visible before JavaScript loads.

## Landing intro and ambient Hero

`LandingIntro` presents a decorative branded introduction once per browser session (sessionStorage key `proxy-perl-intro-seen`). It takes 2 seconds on desktop and 1.5 seconds on mobile, including the upward curtain exit. The Hero entrance begins during the final curtain reveal. Any key or pointer press skips it; refreshes, anchor links, restored scroll positions, and reduced motion skip the full sequence. Blocked storage never blocks the website, and content remains server-rendered underneath. This is a brand sequence, not a network-loading indicator.

`HeroAtmosphere` adds a slowly drifting dot field, six decorative code fragments, and two low-opacity accent gradients. A Motion-value spotlight follows fine desktop pointers; decorative scroll depth is capped at 26px. Animation pauses when the Hero is offscreen. Mobile/tablet uses three fragments, slower ambient movement, and no spotlight or scroll depth. Reduced motion disables these movements and the looping underscore. No new dependencies or external assets are needed.

The page-wide identity continues through a digital Hero horizon and Perl module constellation, a slow technical ticker, count-up group data, traced profile cards, archive metadata, and a compact EOF footer. `PixelCamel` is a single local, block-built SVG reused in the intro, Hero horizon, and Footer. Its intro position follows the existing progress timing; the Footer walk runs once when that section first enters view. Mobile removes the constellation, distant camel, pointer reactions, and Footer walk while retaining the core visual system. Reduced motion keeps the artwork but stops every new continuous animation.
