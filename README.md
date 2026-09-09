# Preference Management API

Small REST API used as the Micro VILT demo codebase for **Understand → Plan → Implement**.

A user has one preference record: theme, language, notification frequency, and time zone. Persistence is in-memory so the app stays easy to explore.

## Run

```bash
npm install
npm test
npm run dev
```

API base: `http://localhost:3000`

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Liveness |
| GET | `/users/:userId/preferences` | Read |
| PUT | `/users/:userId/preferences` | Create or replace (all fields required today) |
| PATCH | `/users/:userId/preferences` | Partial update |

Seeded user: `user-1`.

Example:

```bash
curl http://localhost:3000/users/user-1/preferences
```

Allowed values live in `src/models/preference.ts`.

## Demo the incoming change

Do **not** implement the weekly default in this baseline. Current tests expect a missing `notificationFrequency` on `PUT` to fail validation.

1. Open `incoming-requirement.md`.
2. Run **Understand** on the requirement plus this repo.
3. Run **Plan** and resolve the open questions in that file (missing vs null, PUT vs PATCH).
4. Run **Implement** and re-run `npm test`.
