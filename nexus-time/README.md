# NEXUS TIME

A mobile-friendly gaming world clock, event countdown and time-zone converter.

## Publish inside this repository

This app lives in `nexus-time/` so it does not replace the existing Nourish/Hola app. If GitHub Pages is enabled for the repository's `main` branch and root, the app should be available at:

`https://xaulli.github.io/nourish/nexus-time/`

## iPhone setup

1. Open the hosted URL in Safari.
2. Tap Share → Add to Home Screen.
3. Launch it from the Home Screen for the standalone app experience.
4. Use Enable notifications and grant permission if Safari offers it.

## Reminder limitations

Reminders use the browser Notification API and are checked while the page is active. This build does **not** guarantee delivery when the page is closed, suspended, or the device is locked. Reliable background push notifications require a push service and a server-side scheduler. Browser notifications and service-worker support vary by browser and installation mode.

Events and pinned zones are saved locally in that browser's local storage; they do not sync across devices. Regional time-zone rules come from the browser's Intl API. Always verify critical game announcements against the publisher's official event page.
