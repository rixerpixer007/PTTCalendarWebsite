import type { Metadata } from 'next';
import { siteConfig } from '../site-config';

export const metadata: Metadata = {
	title: 'Privacy policy',
	description: `How ${siteConfig.name} handles Google Calendar information, sign-in credentials, and local plugin data.`,
	alternates: { canonical: '/privacy/' },
};

export default function PrivacyPolicy() {
	return (
		<main className="legal-page shell">
			<header className="legal-header">
				<p className="section-label">Privacy</p>
				<h1>Privacy policy</h1>
				<p>This policy covers {siteConfig.name}, its Obsidian plugin, this website, and the Google sign-in helper operated by the plugin’s developer at auth.ptt-calendar.tech.</p>
			</header>

			<div className="legal-content">
				<aside className="legal-meta" aria-label="Policy details">
					<p>Last updated</p>
					<strong>{siteConfig.lastUpdated}</strong>
				</aside>
				<article className="prose">
					<section className="callout">
						<p>Your plans and calendar events travel directly between Obsidian and Google. A developer-operated helper handles Google sign-in and token renewal through Cloudflare; it receives credentials and connection information, but no plan or calendar-event content.</p>
					</section>

					<section>
						<h2>Information we access and why</h2>
						<p>The plugin reads the active daily note on your device to extract the plan beneath your configured heading. It uses that plan to show a preview and, after you approve it, create tomorrow’s schedule. It does not upload the complete note or scan your vault.</p>
						<p>With your Google permission, the plugin accesses:</p>
						<ul>
							<li>Calendar-list information, including calendar IDs, names, access roles, and time zones, to display calendars and choose a writable destination.</li>
							<li>Events in the relevant planned time range across readable calendars, including hidden calendars, to reuse events with exactly matching start and end times and avoid duplicate time blocks.</li>
							<li>Recorded events to verify their identity and times. For plugin-created events, it also verifies titles, locations, notes, and plugin identity markers.</li>
						</ul>
						<p>Event responses can contain titles, dates, times, locations, descriptions, recurrence details, and other metadata, including organizer or attendee names and email addresses. The scheduling logic uses the fields needed for matching and verification; it does not use guest details. This information is processed on your device and is not sent to the sign-in helper.</p>
						<p>Google permission requests cover viewing and editing calendar events, reading your calendar list, and managing calendars created by the app. Although those permissions allow broader changes, the plugin creates events only after approval, never edits or deletes existing events, and never takes ownership of an event it reuses. It can create a secondary calendar during connection setup or when you request one.</p>
					</section>

					<section>
						<h2>Information sent to Google</h2>
						<p>When you approve event creation, the plugin sends the previewed titles, dates, start and end times, time zone, any explicitly supplied locations and notes, the default-reminder setting, and private event identity markers. Calendar and event IDs are sent when listing, creating, or verifying data. Notes are sent as event descriptions. Google stores created events in your account under its <a href="https://policies.google.com/privacy">Privacy Policy</a>.</p>
					</section>

					<section>
						<h2>Google sign-in and the helper service</h2>
						<p>You connect separately on each device through Google’s browser consent screen. The helper exchanges the authorization code, renews access, and handles revocation. It processes authorization codes, access and refresh tokens, the app’s OAuth credentials, and the vault name needed to return to the correct Obsidian vault. It also receives technical connection information, such as IP address, browser information, request time, and response status.</p>
						<p>The helper runs on Cloudflare Workers. Credentials are processed in memory during requests, and no server-side database of user tokens, plans, or calendar events is maintained. The helper encrypts the refresh token before returning a connection credential to your device. That encrypted credential still grants access and is treated as a secret. The app’s confidential Web OAuth client secret and encryption key remain in Cloudflare secret bindings.</p>
						<p>In legacy builds where you supply your own Desktop OAuth client, authorization and token renewal go directly to Google instead. The hosted helper is not used for that connection.</p>
					</section>

					<section>
						<h2>Local storage and synchronization</h2>
						<p>The connection credential is stored through Obsidian SecretStorage on the device where you sign in. Short-lived access tokens used by the plugin stay in memory. Legacy client credentials and refresh tokens also use SecretStorage. Refresh credentials and access tokens are not written into ordinary plugin settings, notes, or callback links. The browser handoff carries a short-lived authorization code, state, and vault routing name.</p>
						<p>Ordinary settings and completed-day records are stored in the plugin’s data.json file. These include the configured heading, time zone, stable vault identity, secret reference names, selected calendar, event IDs, and completion timestamps. They support verification and duplicate protection. If you sync your vault configuration, these ordinary files may sync through the service you choose; SecretStorage credentials are not part of that file sync.</p>
					</section>

					<section>
						<h2>Sharing and service providers</h2>
						<p>Google receives the information needed for authorization and Calendar operations. Cloudflare processes the helper’s credentials and technical traffic as its hosting and security provider. GitHub Pages hosts this public website and may process visitor IP addresses and request information to deliver and protect it. Your chosen vault-sync provider processes any files you choose to sync.</p>
						<p>These providers process information under their own applicable terms and privacy policies: <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare</a> and <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub</a>. Provider infrastructure may process data outside your country.</p>
						<p>We do not sell or rent Google user data, use it for advertising, or send it to data brokers. We do not use Google Calendar information to develop, improve, or train AI or machine-learning models. The plugin and website contain no advertising or product-analytics trackers. Any transfer of Google user data is limited to providing the features described here, meeting applicable legal obligations, or protecting security.</p>
						<p>We comply with the <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including its Limited Use requirements, when handling Google user data.</p>
					</section>

					<section>
						<h2>Protection and operational records</h2>
						<p>Connections to Google and the hosted helper use HTTPS. Authorization uses state and PKCE checks to bind the response to the initiating device. Refresh credentials are encrypted using AES-256-GCM, and the helper’s confidential keys are stored separately as hosting secrets. Keep your devices, vault, Google account, and synchronization tools protected; these measures cannot guarantee absolute security.</p>
						<p>Sampled technical diagnostics may be retained by Cloudflare to operate and troubleshoot the service. Helper query strings are redacted from observability records, invocation logging is disabled, and application code does not log authorization codes, tokens, request bodies, or calendar content. Cloudflare currently documents three days of Workers Logs retention on its free plan; other infrastructure and security records follow the providers’ retention policies.</p>
					</section>

					<section>
						<h2>Retention, deletion, and your choices</h2>
						<ul>
							<li>Local connection credentials remain until you disconnect or reset them. Select <strong>Disconnect and revoke</strong> in the plugin to clear this device’s connection and request Google revocation. Google revocation can disconnect other devices using the same app.</li>
							<li>You can also remove access from your <a href="https://myaccount.google.com/connections">Google Account connections</a>. Revocation invalidates access even if a stored local credential has not yet been removed.</li>
							<li>Settings and completed-day history remain until you reset or delete the plugin’s local data. The desktop <strong>Reset plugin data</strong> control clears those records and local authorization. Disconnect before uninstalling if you want the plugin to clear its stored connection.</li>
							<li>Authorization requests are processed transiently by the helper. Its operational diagnostics expire under the hosting provider’s retention settings; there is no permanent developer-maintained token database.</li>
							<li>Events and calendars created in Google remain there until you delete them. Disconnecting, resetting, or uninstalling the plugin does not delete them. Copies in your own backups or sync history are controlled by you and those services.</li>
						</ul>
						<p>For questions or a request concerning developer-held technical information, contact <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Do not send passwords, tokens, or private plan content. The developer cannot retrieve or delete your local vault data or access your calendar through a server-side user database.</p>
					</section>

					<section>
						<h2>Changes and contact</h2>
						<p>This policy is maintained by the developer of {siteConfig.name}. Material changes to Google data access or use will be disclosed before those changes take effect, with renewed consent where required. The date above identifies this version.</p>
						<p>Privacy contact: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>
					</section>
				</article>
			</div>
		</main>
	);
}
