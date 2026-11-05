# AvioSmart — website concept

A redesign concept for [aviosmart.co](https://aviosmart.co). It's a static site with no build step: open `index.html` in a browser, or host the folder anywhere (Netlify, Vercel, GitHub Pages, S3).

## What's in it
- **Hero (cockpit view):** a real-time WebGL dawn sky over an endless sea of clouds, with a pilot's head-up display on top (pitch ladder, roll scale, heading tape, altimeter). Moving the mouse banks the plane, and banking turns it, so the sun moves across the sky. Scrolling pitches the nose down and descends the altimeter. A split-flap "Now advising on" display sits below the headline. If WebGL isn't available, a CSS sunset gradient shows instead.
- **Departure board:** the services shown as departures, with statuses that update on their own.
- **Services:** cards that tilt and glow under the cursor.
- **Approach:** a flight path that draws itself as you scroll (Pre-flight → Takeoff → Cruise → Landing).
- **About Andrés Chaves:** a portrait and a boarding-pass card that links to his LinkedIn.
- **Contact:** a form that opens a pre-filled email.
- **EN / ES toggle:** switches the whole site, and the choice is remembered.
- Responsive, and respects `prefers-reduced-motion`.

## Before showing it to the client
1. **Add Andrés's photo:** save it as `assets/andres-chaves.jpg`. A portrait (4:5) works best. Until the file is there, a gold "AC" monogram shows in its place.
2. **Confirm the contact email:** set `CONTACT_EMAIL` at the top of `main.js`. It's currently `info@aviosmart.co`, which is a placeholder.
3. **Check the copy:** the service descriptions are draft copy based on his public role ("Strategic Advisor to Airlines"). Change them to match what AvioSmart actually offers.

## Files
- `index.html`: the page markup
- `styles.css`: all the styles
- `main.js`: the globe, split-flap display, board, flight path, language toggle and form
- `assets/`: images
