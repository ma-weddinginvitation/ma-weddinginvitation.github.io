# Meeran & Amra: Wedding Invitation

An animated wedding invitation website built with React, Vite and Framer Motion.

## Run it

You need [Node.js](https://nodejs.org) (the LTS version) installed.

```
npm install
npm run dev       # opens at http://localhost:5173
```

## Publish it

1. Choose where it will live (Netlify, Vercel, Cloudflare Pages and GitHub Pages all work).
2. Put the final address in `.env`, for example `VITE_SITE_URL=https://meeran-amra.netlify.app`.
   WhatsApp only shows the preview image when this is set.
3. Run `npm run build` and upload the `dist` folder.

## Change things

| What | Where |
| --- | --- |
| Names, date, time, venue, map links, WhatsApp message | `src/data/wedding.js` |
| Colours and fonts | `src/index.css` |
| Background music | Replace `public/music/royal-procession.mp3` (keep the file name) |
| Venue picture | `src/components/VenueIllustration.jsx`, or use an `<img>` in `Venue.jsx` |
| Link preview image | `public/og-image.jpg` (1200 × 630) |

## Assets and licensing

The artwork, textures and music were all generated for this project, so there are no
third-party rights to clear. The fonts (Cinzel, Cormorant Garamond, Pinyon Script) use the
SIL Open Font License and are served from the site itself. The venue picture is a decorative
illustration, not a photograph of the real hall.
