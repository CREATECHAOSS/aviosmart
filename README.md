# AvioSmart — website concept

A redesign concept for [aviosmart.co](https://aviosmart.co). It's a static site with no build step: open `index.html` in a browser, or host the folder anywhere (Netlify, Vercel, GitHub Pages, S3).

## What's in it
- **Hero (cockpit view):** a real-time WebGL dawn sky over an endless sea of clouds, with a pilot's head-up display on top (pitch ladder, roll scale, heading tape, altimeter). Moving the mouse banks the plane, and banking turns it, so the sun moves across the sky. Scrolling pitches the nose down and descends the altimeter. A split-flap "Now advising on" display sits below the headline. If WebGL isn't available, a CSS sunset gradient shows instead.
- **Status board:** the five "When should an airline call AvioSmart?" signals from the current site, shown as a departures board. Hovering over or tapping a row flips it from *Delayed* or *At risk* to *Cleared* or *On time*.
- **Services:** four photo cards that tilt and glow under the cursor. A full-width night-landing photo with a parallax effect follows them.
- **Approach:** a flight path that draws itself as you scroll (Pre-flight → Takeoff → Cruise → Landing).
- **About Andrés Cháves:** his portrait and a boarding-pass card (airline operations to aerospace manufacturing) that links to his LinkedIn.
- **Track record:** count-up stats and milestones.
- **Contact:** a form that opens a pre-filled email.
- **EN / ES toggle:** switches the whole site, and the choice is remembered.
- Responsive, and respects `prefers-reduced-motion`.

## Content & assets
- **Copy:** taken from the current aviosmart.co (Nov 2026). The track-record figures (80%, US$2.5M, +30%, +20%, 26+ years) are the "reported" numbers stated there.
- **Portrait and logo:** Andrés Cháves's photo (`assets/andres-chaves.jpg`, cropped to 4:5) and the AvioSmart logo (`assets/aviosmart-logo.png`) come from the current aviosmart.co.
- **Stock photos** in `assets/img/` are from [Unsplash](https://unsplash.com), free for commercial use under the [Unsplash License](https://unsplash.com/license), no attribution required. IDs, for reference:
  - `warehouse.jpg`: photo-1553413077-190dd305871c
  - `ramp-dusk.jpg`: photo-1464037866556-6812c9d1c72e
  - `handshake.jpg`: photo-1521791136064-7986c2920216
  - `contract.jpg`: photo-1450101499163-c8848c66ca85
  - `night-landing.jpg`: photo-1520437358207-323b43b50729
  - `gate-sunset.jpg`: photo-1542296332-2e4473faf563

## Files
- `index.html`: the page markup
- `styles.css`: all the styles
- `main.js`: the globe, split-flap display, board, flight path, language toggle and form
- `assets/`: images
