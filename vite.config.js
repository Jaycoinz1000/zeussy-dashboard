# Zeussy Protocol Dashboard

Deploy-ready Vite + React app for the Zeussy 90-minute cycle framework.

## What is included
- 6-step reversal protocol dashboard
- Exact 90-minute session blocks
- Macro windows under each block
- Instrument guardrails: MES, MGC, MCL only; MNQ blocked
- Risk and pre-trade checklist
- Journal structure with DOL / POI tags and filterable fields

## Local run
```bash
npm install
npm run dev
```

## Build
```bash
npm install
npm run build
```

## Deploy to Vercel
1. Create a new GitHub repository.
2. Upload the contents of this folder.
3. In Vercel, click **Add New Project**.
4. Import the GitHub repo.
5. Framework preset: **Vite**.
6. Build command: `npm run build`
7. Output directory: `dist`
8. Click **Deploy**.

## Deploy to Netlify
1. Upload repo to GitHub.
2. In Netlify, add a new site from Git.
3. Build command: `npm run build`
4. Publish directory: `dist`

## Notes
This project intentionally avoids external UI frameworks so deployment is cleaner and easier.
