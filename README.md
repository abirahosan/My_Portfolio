# Portfolio — Abir Ahosan Ratul

A production-ready personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Three.js.

## Stack

- **Next.js 14** — App Router
- **TypeScript** — Full type safety
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Scroll & entrance animations
- **Three.js** — 3D abstract object in Hero only

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customization

### Replace placeholder portrait
In `components/Hero.tsx`, swap the CSS art block with:
```tsx
import Image from 'next/image';
// ...
<Image src="/portrait.jpg" alt="Your name" fill className="object-cover grayscale" />
```
Place `portrait.jpg` in `/public/`.

### Update content
- **Hero** — `components/Hero.tsx` (name, tagline, stats)
- **Projects** — `components/SelectedWork.tsx` (PROJECTS array)
- **About** — `components/About.tsx` (bio text, traits)
- **Skills** — `components/Skills.tsx` (SKILL_GROUPS array)
- **Timeline** — `components/Timeline.tsx` (TIMELINE array)
- **Contact** — `components/Contact.tsx` (socials, email)

### Wire up the contact form
Replace the `handleSubmit` function in `components/Contact.tsx` with a call to your preferred service (Resend, Formspree, or a Next.js API route).

## Deploy

```bash
npm run build
# Deploy /out or use Vercel
```
