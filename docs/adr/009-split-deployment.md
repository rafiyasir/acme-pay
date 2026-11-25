# ADR-009: Web on Vercel, API on Render

- Status: accepted
- Date: 2026-11-25

## Context
The repo holds `api/` and `web/` (ADR-008). The brief needs a deployed app. The API is a long-running Express server with a database connection; the web app is static files after build.

## Options considered
1. One service: Express serves the built web app. One URL, no CORS, but the static site gets no CDN and one deploy covers both.
2. Split: web on Vercel, API on Render, each from its own root directory in the same repo. Needs CORS and an API URL setting in the web app.
3. Separate repositories per app. Splits the commit history the assessment asks to see, and the hosts do not need it.

## Decision
Option 2. Vercel builds `web/`, Render builds `api/` in the Singapore region, near the Neon database (ap-southeast-1). The API allows only the web origin through CORS (`WEB_ORIGIN`). The web app reads the API address from `VITE_API_URL`.

## Consequences
- Each side deploys when only its folder changes.
- Render's free tier sleeps after 15 minutes idle and takes about a minute to wake, and Neon also scales to zero. The first request after a pause is slow; the README says so.
- Two sets of environment variables to keep in sync.
