# Personal Planner

Single-file HTML time-blocking planner. ADHD-focused executive function tool — externalises today's shape, time-boxes around meetings, logs what got done for bi-weekly updates.

Currently a Cowork live artifact. To turn it into a real web app on GitHub Pages, the MCP calls (`window.cowork.callMcpTool(...)`) need to be swapped for direct Google Calendar API calls via OAuth 2.0.

## Files

- `index.html` — the entire app. Vanilla JS, no build step.

## Features

- 15-min time grid (~64px per hour), 7 day-tabs at the top
- Sticky capture bar — parses `#tag`, `today`/`tomorrow`/weekday, `2pm`/`14:00`, `30m`/`1h` from a single sentence
- Inbox row above the grid for unscheduled tasks; chips drag onto grid to schedule
- Click empty slot → ghost block previews + popover with Task/Event toggle, duration picker
- Create events on any of your Google Calendars (with optional Google Meet link)
- Click event/task block to edit; click checkbox to mark done / log for bi-weekly
- Drag blocks to reschedule (snaps to 30 min, ghost follows cursor with live time tooltip)
- Resize via top/bottom edges
- Multi-calendar picker with 24-color palette + per-calendar overrides
- All-day events shown in a thin strip above the grid
- Tag system shared with calendar palette: tag tasks AND events
- Done log auto-fills with completed tasks + logged events; tag-filter pills + "Copy this week as bullets" respects the filter (bi-weekly export)
- Backup / Restore JSON in footer
- Stale-while-revalidate event cache for instant first render

## State

Everything (tasks, tags, event-tags, logged events, calendar selections, color overrides, event cache) lives in browser localStorage. No sync across devices. Backup button in the footer exports JSON.

## Porting to GitHub Pages

To run standalone (without Cowork):

1. Register an OAuth 2.0 client in Google Cloud Console
   - Type: Web application
   - Authorized JavaScript origins: `https://clickysteve.github.io` (or wherever you host)
   - Authorized redirect URIs: same
2. Replace each `window.cowork.callMcpTool(name, params)` call with the Google Calendar JS API equivalent:
   - `list_calendars` → `gapi.client.calendar.calendarList.list()`
   - `list_events` → `gapi.client.calendar.events.list({ calendarId, timeMin, timeMax, ... })`
   - `create_event` → `gapi.client.calendar.events.insert({ calendarId, resource: {...} })`
   - `update_event` → `gapi.client.calendar.events.update({ calendarId, eventId, resource })`
   - `delete_event` → `gapi.client.calendar.events.delete({ calendarId, eventId })`
3. Add `<script src="https://accounts.google.com/gsi/client"></script>` and a sign-in button
4. Push to GitHub, enable Pages

## Why a personal site is safe

- GitHub Pages is HTTPS-only (auto Let's Encrypt)
- No backend / no shared database — auth flows directly between your browser and Google
- Only someone signed into your Google account can see your calendar data
- The repo can be public (anyone can read the code) without exposing your data — your OAuth token never leaves your browser
- Risks: XSS via injected code on the static site (mitigated because it's a single static file you control); compromised GitHub repo could deploy malicious JS — keep 2FA on the GitHub account
