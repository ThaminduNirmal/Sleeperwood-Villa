# Security Policy

We take security seriously. This repository is public to showcase the website’s code, but deployments run with server-only environment variables and write access is restricted.

## Reporting a Vulnerability

Email: sleeperwoodvilla@gmail.com

We aim to respond within 72 hours.

## Hardening & Secrets

- Booking.com iCal tokens are not in the repository.
  - Configure these as server-only environment variables:
    - `ROOM_01_ICS_URL`, `ROOM_02_ICS_URL`, `ROOM_03_ICS_URL`
  - Never expose them via client-side code or `NEXT_PUBLIC_*` variables.
- Google Search Console verification uses `GOOGLE_SITE_VERIFICATION` (server-side).
- Do not commit `.env*` files; use Vercel Project → Settings → Environment Variables.
- Rotate secrets if you suspect exposure (Booking.com → regenerate iCal URLs).

## Repository Protections

- Use branch protection rules:
  - Protect `master`/`main` branch from direct pushes.
  - Require Pull Requests and at least one approval.
  - Require status checks to pass (build/lint) before merge.
- Limit collaborators to trusted accounts; prefer read-only for external users.

## Dependencies

- Use pinned major versions in `package.json` and renovate/dependabot to keep deps updated.
- Run `npm audit` periodically and fix high/critical issues.

## Contact

For questions, reach out at sleeperwoodvilla@gmail.com.

