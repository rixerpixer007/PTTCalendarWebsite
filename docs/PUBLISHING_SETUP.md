# Daily Plan Calendar website and OAuth publishing setup

This guide publishes the Daily Plan Calendar website through GitHub Pages, connects a custom domain,
and uses those public pages to move the personal Google OAuth app from **Testing** to
**In production**. The site contains no analytics, cookies, forms, accounts, or backend service.

## 1. Claim a custom domain

1. Open the [GitHub Student Developer Pack](https://education.github.com/pack/).
2. Choose a domain offer from a participating registrar.
3. Search for a short domain you are willing to keep after the free period.
4. Before registering, check the normal annual renewal price—not only the first-year price.
5. Register the domain in your own name and keep access to its DNS settings.

The free `USERNAME.github.io` address is useful for hosting but is not a custom domain you own. The
Google OAuth branding configuration should use the custom domain registered to you.

## 2. Personalize the website

1. Open `C:\Users\User\Documents\PTTCalendarWebsite` in Visual Studio Code.
2. Open `app/site-config.ts`.
3. Replace `YOUR_DOMAIN` with the exact domain you registered, without `https://` or a trailing slash.
4. Replace `YOUR_EMAIL` with the public support email you want displayed on the Privacy and Terms
   pages.
5. Save the file.

Example:

```ts
export const siteConfig = {
  name: 'Daily Plan Calendar',
  domain: 'dailyplancalendar.example',
  contactEmail: 'you@example.com',
  lastUpdated: 'August 26, 2026',
};
```

Do not put the OAuth client ID, client secret, refresh token, or any other credential in this
website or GitHub repository.

## 3. Test the website locally

1. Open a VS Code terminal in the website folder.
2. Run:

   ```powershell
   npm install
   npm run dev
   ```

3. Open the local address printed in the terminal, normally `http://localhost:3000`.
4. Check all three pages:
   - Overview: `/`
   - Privacy policy: `/privacy/`
   - Terms of service: `/terms/`
5. Confirm that the displayed contact email is correct.
6. Stop the local server with `Ctrl+C`.
7. Run the production build:

   ```powershell
   npm run build
   ```

The command must complete successfully before publishing.

## 4. Create the GitHub repository

1. Sign in to [GitHub](https://github.com/).
2. Select **New repository**.
3. Name it `daily-plan-calendar-website`.
4. Choose **Public**. The website and policy text contain no secrets.
5. Do not initialize it with a README, `.gitignore`, or license because the local folder already has
   the website files.
6. Select **Create repository**.
7. Copy the repository URL GitHub shows you.

## 5. Push the website to GitHub

In the VS Code terminal, replace the example URL with your own repository URL and run:

```powershell
git init
git add .
git commit -m "Create Daily Plan Calendar website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/daily-plan-calendar-website.git
git push -u origin main
```

Never commit a file containing Google OAuth credentials or tokens.

## 6. Enable GitHub Pages deployment

1. Open the repository on GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Open the repository’s **Actions** tab.
5. Open **Deploy website to GitHub Pages**.
6. If no deployment started automatically, select **Run workflow → Run workflow**.
7. Wait for the workflow to show a green check mark.

The included workflow builds the website as static files and publishes the `out` folder.

## 7. Connect the custom domain

Choose one of the following DNS configurations. DNS changes may take time to propagate.

### Option A: use the root domain

In the registrar’s DNS panel, create these four `A` records:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

### Option B: use a subdomain such as `www`

Create this record, replacing `YOUR_USERNAME`:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `YOUR_USERNAME.github.io` |

Then finish the GitHub configuration:

1. Return to **Repository → Settings → Pages**.
2. Under **Custom domain**, enter the complete domain used by the website, such as
   `dailyplancalendar.example` or `www.dailyplancalendar.example`.
3. Select **Save** and wait for GitHub’s DNS check to succeed.
4. Enable **Enforce HTTPS** when the option becomes available.
5. Open the public website and verify `/`, `/privacy/`, and `/terms/` again.

GitHub Pages provisions HTTPS automatically after the custom domain and DNS are correct. Do not buy
or upload a separate SSL certificate for this site.

## 8. Verify domain ownership with Google

1. Open [Google Search Console](https://search.google.com/search-console/).
2. Add a **Domain** property using the registered root domain, without `https://`.
3. Google displays a TXT verification value.
4. In the registrar’s DNS panel, add a `TXT` record at `@` using Google’s exact value.
5. Return to Search Console and select **Verify**.
6. Keep the TXT record after verification.

## 9. Complete Google OAuth Branding

1. Open [Google Cloud Console](https://console.cloud.google.com/) and select the existing Daily Plan
   Calendar project.
2. Open **Google Auth Platform → Branding**.
3. Keep the app name `Daily Plan Calendar`.
4. Select your own email for **User support email** and keep the developer contact email current.
5. Remove the app logo for now so it does not trigger unnecessary brand-verification work.
6. Under **Authorized domains**, add the registered root domain without `https://`, `www`, paths, or
   a trailing slash.
7. Enter these URLs, replacing the example domain:
   - **Application home page:** `https://dailyplancalendar.example/`
   - **Application privacy policy link:** `https://dailyplancalendar.example/privacy/`
   - **Application terms of service link:** `https://dailyplancalendar.example/terms/`
8. Save the Branding page.

If the website uses `www`, use `www` in all three page URLs but still add the registered root domain
under **Authorized domains**.

## 10. Move OAuth to In production

1. Open **Google Auth Platform → Audience**.
2. Confirm that the user type is **External**.
3. Select **Publish app**.
4. Confirm the move to production.
5. Verify that the publishing status now says **In production**.

Publishing does not list the Obsidian plugin in a store. Google may continue to display an
unverified-app warning, and the unverified project remains subject to Google’s user cap. This is
acceptable for your personal-use project; only approve access when the project name and OAuth client
are the ones you created.

## 11. Obtain a new long-lived refresh token

A token issued while the app was in Testing may retain its original seven-day lifetime. Create a new
authorization after the project is In production:

1. Open **Obsidian → Settings → Daily Plan Calendar → Google connection**.
2. Select **Disconnect and revoke** if the old Testing authorization is still connected.
3. Select **Authorize**.
4. Choose your account and review the requested Calendar permissions.
5. If Google shows an unverified-app warning, verify the project name, then continue only to the app
   you created yourself.
6. Confirm that the plugin reconnects and that the intended `Daily Plan` calendar is selected.
7. Preview one plan and perform a safe event-creation test.

An In-production refresh token normally has no fixed seven-day expiration. It can still stop working
if you revoke access, leave it unused for six months, exceed Google’s token limits, or an account or
administrator policy invalidates it.

## Updating the website later

After changing the website files:

```powershell
npm run build
git add .
git commit -m "Update website"
git push
```

GitHub Actions automatically deploys the new version after the push.

## Troubleshooting

- **GitHub deployment fails during build:** Run `npm ci` and `npm run build` locally and fix the first
  reported error before pushing again.
- **The domain shows a 404:** Confirm the Custom domain in **Settings → Pages** and verify the DNS
  records do not contain conflicting `A`, `AAAA`, `ALIAS`, or `CNAME` entries.
- **HTTPS is unavailable:** Wait for DNS propagation, then remove and re-add the Custom domain in
  GitHub Pages settings to restart certificate provisioning.
- **Google rejects an authorized domain:** Add the registered root domain, not a full URL, subdomain,
  or path, and confirm it is verified in Search Console.
- **Publish app remains disabled:** Confirm the public homepage, privacy, and terms URLs load over
  HTTPS, then save the Branding page again.
- **Authorization stops after seven days:** Confirm the project was In production before the current
  authorization was issued, then disconnect and authorize again.

Official references: [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages),
[GitHub Pages HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https),
[Google OAuth Branding](https://support.google.com/cloud/answer/15549049), and
[Google Auth audience and publishing status](https://support.google.com/cloud/answer/15549945).

