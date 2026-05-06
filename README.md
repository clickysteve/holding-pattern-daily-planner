# Holding Pattern // Daily Planner

A single-file HTML time-blocking planner with Google Calendar integration.

**Live:** [planner.clickysteve.com](https://planner.clickysteve.com)
**Repo:** [`clickysteve/holding-pattern-daily-planner`](https://github.com/clickysteve/holding-pattern-daily-planner)

## Setup

OAuth client is registered in Google Cloud Console. Authorized JavaScript origins:

- `https://planner.clickysteve.com`
- `https://clickysteve.github.io`
- `http://localhost:8000`

The Client ID lives in `index.html` (public; safe in a public repo).

## Local

```
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Deploy

```
git push
```

Live at `https://planner.clickysteve.com` ~30 seconds later (GitHub Pages rebuild).

## State

Everything (tasks, tags, calendar selections, OAuth token) lives in `localStorage` on the device that's signed in. Backup / Restore JSON in the footer.
