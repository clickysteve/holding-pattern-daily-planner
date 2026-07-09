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

## Capture from anywhere

Anything that can open a URL can add a task:

```
https://planner.clickysteve.com/?add=dentist%20next%20tue%203pm%20%23health
```

The `add` text goes through the same parser as the capture bar (days, times, durations, `#tags`). The query is stripped after capture and near-identical captures within 60s are deduped, so relaunches are safe. Works before sign-in and offline (once the PWA is installed).

- **Android**: install the PWA, then share any page to "Holding Pattern" from the share sheet (`share_target` in the manifest).
- **iOS**: Safari doesn't support share targets — use a Shortcut: Share Sheet input → URL `https://planner.clickysteve.com/?add=[Shortcut Input, URL-encoded]` → Open URL.
- **Bookmarklet**:
  ```js
  javascript:open('https://planner.clickysteve.com/?add='+encodeURIComponent(document.title+' '+location.href))
  ```
- **Alfred / Raycast**: any "open URL with query" workflow.

## State

Everything (tasks, tags, calendar selections, OAuth token) lives in `localStorage` on the device that's signed in. Backup / Restore JSON in the footer.
