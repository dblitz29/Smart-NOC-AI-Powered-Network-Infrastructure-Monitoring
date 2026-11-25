# Smart NOC design direction

Reading this as: internal monitoring console for telecom NOC operators on shift, in a plain operations-console style, dial ENERGY 1 / RHYTHM 2 / MOTION 1.

Dial: ENERGY 1 / RHYTHM 2 / MOTION 1

## Job of each screen

- Overview: find the incident that needs action, then act on it. Camera wall on the left, action queue on the right, figures as a thin strip.
- Camera Monitoring: scan feeds, drill into one.
- Alerts & Incidents: triage a list. Table, filters, side panel.
- Site Health: which site is failing. Table sorted worst first.
- Analytics: five questions, each chart titled with its question.

## Decisions and reasons (R-31)

- Dark theme only: NOC rooms run dim and the brief asks for it. No toggle, so no second theme to break.
- Palette: charcoal-navy neutrals, one cyan accent (focus ring, primary action, switch on). Red, amber, green appear only to mark real state. The brief's purple is dropped: it added a fourth hue with no job.
- Type: IBM Plex Sans for text (built for dense technical UI), IBM Plex Mono only for IDs, timestamps and camera overlays where digits must align.
- Radius 4 to 6px everywhere. Pills only on the switch track.
- No glow, glass, gradients, grid backgrounds, endless animation. Shadow only on floating layers (menus, dialogs).
- Icons: only on icon-only buttons (search, bell, fullscreen, close). Navigation and status use words.
- Status is text plus color, never color alone.
- Camera feeds are labelled simulated SVG scenes. Boxes and subjects are drawn from the same coordinates.
- All figures are sample data and the UI says so (header, footer, analytics notes).
