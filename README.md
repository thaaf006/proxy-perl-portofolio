# Group portfolio

A frontend-only Next.js App Router portfolio for 12 people, using the existing Nova / Base UI setup, Geist, Tailwind, Lucide, Motion, and next-themes. No environment variables or backend are required.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production verification, run `npm run lint`, `npm run build`, then `npm start`.

## Replace the placeholders

- **Group identity and copy:** `data/group.ts`. Replace `Group Name`, `Different minds. One shared story.`, university/class, descriptions, and about copy. The tagline is a sample placeholder. Optional `heroImage` accepts a local path such as `/gallery/group.jpg`.
- **Members:** edit the 12 objects in `data/members.ts`. Keep one Leader, one PJK, and ten Members. Each object supports name, role, image, NIM, origin, birthday, hobbies, fun fact, Instagram, email, and GitHub.
- **Member photos:** place `member-01.jpg` through `member-12.jpg` in `public/members/`, then set each member's `image` to `/members/member-01.jpg` (and so on). Portrait crops work best. There is no need to modify components.
- **Gallery:** edit `data/gallery.ts`. Place `gallery-01.jpg` and subsequent images in `public/gallery/`, then set each entry's `src`. Replace captions and alt text to describe your actual photos. The layout repeats automatically if you add entries.
- **Social links:** supply full HTTPS profile URLs; supply plain email addresses. Leave missing values undefined. Invalid URLs and example.com placeholders are hidden. Social destinations open in a new tab safely; email opens with mailto.
- **Images:** use local public paths. Missing or failed images fall back to the abstract placeholders. No remote image service is needed.
- **Optional fields:** empty values are omitted from profiles.
- Replace the placeholder `g.` mark in `components/layout/Navbar.tsx` and `app/icon.svg` if you have a final logo. Metadata derives from group data.

## Structure

`app/page.tsx` composes server-rendered sections. Client boundaries are limited to navigation, theme, image fallbacks, Motion wrappers, and interactive Base UI dialogs. Shared styles and theme tokens live in `app/globals.css`. Member and gallery dialogs provide focus trapping, Escape dismissal, and focus restoration; mobile profiles use a scrollable bottom panel.

## QA

The implementation is checked with ESLint and a production build. Browser checks cover 320, 375, 390, 430, 768, 1024, 1280, and 1440px; all 12 profile mappings and role counts; mobile navigation; gallery dialogs; persisted themes; keyboard focus restoration/trapping; reduced motion; and horizontal overflow. Replace placeholders before sharing the website publicly and check the crops and alt text of your final photos.

All three implementation checkpoint commits remain local. Nothing was pushed or deployed.
