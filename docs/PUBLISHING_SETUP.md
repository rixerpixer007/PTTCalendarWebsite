# Website publishing and Google OAuth verification

This repository is the public PTT Daily Calendar homepage, privacy policy, and terms site. It is a
Next.js static export hosted on GitHub Pages at https://ptt-calendar.tech. The separate sign-in
helper runs on Cloudflare Workers at https://auth.ptt-calendar.tech; GitHub Pages does not run it.
Never put Google OAuth credentials, tokens, or encryption keys in this repository or its build.

## Existing hosting

- Domain registration remains with the user's registrar; Cloudflare manages authoritative DNS.
- Preserve GitHub Pages records for the main website, the helper subdomain, Google verification
  TXT records, and email-routing records. A content update does not require a DNS change.
- `.github/workflows/pages.yml` builds and
  publishes `out/` on a push to `main`, or a manual workflow dispatch.
- `next.config.ts` uses `output: 'export'` and `trailingSlash: true`, so `/privacy/` has its own
  `out/privacy/index.html`. The policy is readable in the initial HTML without JavaScript, login,
  iframe, or consent gate.

## Build and verify before publishing

```sh
npm ci
npm run build
npm run check:export
npm run lint
```

`check:export` checks the three static routes, canonical URLs, readable policy HTML, homepage policy
link, and public crawler files. It also runs in the Pages workflow before uploading the artifact.
Generated `out/`, `.next/`, and `node_modules/` stay out of Git.

Review changes before committing or pushing: this repository and its deployment are public.
Pushing `main` publishes the website automatically. After publishing, verify the actual remote URLs;
a successful local build does not prove the public policy has updated.

## Google branding URLs

Use these exact URLs in **Google Auth Platform → Branding**:

- Application home page: https://ptt-calendar.tech/
- Privacy policy: https://ptt-calendar.tech/privacy/
- Terms of service: https://ptt-calendar.tech/terms/
- Authorized domain: `ptt-calendar.tech` (without protocol or path).

Keep the display name consistent with **PTT Daily Calendar** and use a monitored support/contact
email. Keep verified ownership of the custom domain. The Web OAuth client's authorized redirect
URI is separately configured as `https://auth.ptt-calendar.tech/google-callback`; that callback is
not the privacy policy URL.

## Responding to the unresponsive-policy finding

The reported finding was that `https://ptt-calendar.tech/privacy/` was unresponsive. During this
review, it returned HTTP 200 and readable HTML to ordinary and Googlebot-style requests. An earlier
DNS, HTTPS, or hosting interruption could explain the finding, but its original cause was not
reproduced. Do not claim a routing defect was fixed when the existing route already works.

After the revised policy has been published:

1. Open `/`, `/privacy/`, and `/terms/` in a signed-out/private browser. Confirm they load over HTTPS
   and show the current policy date and helper disclosures. Follow the homepage privacy link.
2. Check the privacy URL directly with `curl -I https://ptt-calendar.tech/privacy/`. It should return
   HTTP 200 without requiring a browser session. If it does not, inspect Pages deployment and DNS.
3. Confirm Google's configured policy URL is exactly the accessible public URL above.
4. Follow Google's review workflow to resubmit or reply to the verification team with the same
   updated URL. Do not claim the revised policy is live before deployment finishes.

Static HTML, canonical URLs, robots.txt, and a sitemap support accessibility; they do not guarantee
Google approval. Google also reviews branding, minimum scopes, the demo flow, and whether the
published policy accurately describes what the app does.

## Privacy review checklist

The current policy covers local note parsing; readable-calendar scanning and exact-time event reuse;
explicit locations and notes; developer-operated Cloudflare sign-in/renewal/revocation; encrypted
refresh credentials in device-local SecretStorage; transient access tokens; vault routing names;
network/operational data; provider disclosures; Limited Use and no advertising/AI training; retention;
local deletion; Google revocation; cross-device effects; and calendars/events left in Google.

When helper behavior, provider retention, scope, or telemetry changes, update the policy and its
last-updated date. Review Cloudflare's current retention settings before changing the published
retention statement. The policy's contact email must remain monitored for privacy requests.

## References

- [Google privacy policy requirements](https://support.google.com/cloud/answer/13806988)
- [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)
- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
