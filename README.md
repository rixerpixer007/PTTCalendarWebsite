# PTT Daily Calendar website

Public homepage, privacy policy, and terms for the PTT Daily Calendar Obsidian plugin at
https://ptt-calendar.tech. The website is statically exported by Next.js and hosted on GitHub Pages.
The separate Cloudflare Google sign-in helper is documented in the plugin repository.

## Development

```sh
npm ci
npm run dev
```

## Verify the static website

```sh
npm run build
npm run check:export
npm run lint
```

The build writes `out/`, including the standalone HTML privacy policy at `out/privacy/index.html`.
`check:export` also runs before deployment to catch missing public policy routes or HTML content.

Site identity, contact email, and policy date are configured in `app/site-config.ts`. Preserve the
actual data-handling disclosures when editing policy copy. Never add secrets to this public repo.
See [publishing and Google verification setup](docs/PUBLISHING_SETUP.md) for live checks and URLs.

The Pages workflow publishes after a push to `main`. Local edits and a successful build do not
publish the website; review the diff before committing and pushing.
