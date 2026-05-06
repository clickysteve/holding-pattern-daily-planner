# Holding Pattern // Daily Planner

A single-file HTML time-blocking planner with Google Calendar integration.

Repo: [`clickysteve/holding-pattern-daily-planner`](https://github.com/clickysteve/holding-pattern-daily-planner)

## Setup

OAuth client is registered in Google Cloud Console with these authorized JavaScript origins:

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
git push -u origin main
```

Then on the repo page → Settings → Pages → Source: Deploy from a branch → `main` / root.

Live at `https://clickysteve.github.io/holding-pattern-daily-planner/`.

## State

Everything (tasks, tags, calendar selections, OAuth token) lives in `localStorage` on the device that's signed in. Backup / Restore JSON in the footer.
