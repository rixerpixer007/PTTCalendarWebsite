# Daily Plan Calendar website

Static public website for Daily Plan Calendar, including its Google OAuth homepage, privacy policy,
and terms of service.

Before publishing, replace `YOUR_DOMAIN` and `YOUR_EMAIL` in `app/site-config.ts`. Complete setup and
deployment instructions are in [`docs/PUBLISHING_SETUP.md`](docs/PUBLISHING_SETUP.md).

## Local development

```powershell
npm install
npm run dev
```

## Production build

```powershell
npm run build
```

The static GitHub Pages output is written to `out/`.

