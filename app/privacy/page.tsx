import type { Metadata } from 'next';
import { siteConfig } from '../site-config';

export const metadata: Metadata = {
	title: 'Privacy policy',
	description: `How ${siteConfig.name} accesses, uses, and stores Google Calendar data.`,
};

export default function PrivacyPolicy() {
	return (
		<main className="legal-page shell">
			<header className="legal-header">
				<p className="section-label">Privacy</p>
				<h1>Privacy policy</h1>
				<p>This policy explains how {siteConfig.name} handles information when you connect the Obsidian plugin to Google Calendar.</p>
			</header>

			<div className="legal-content">
				<aside className="legal-meta" aria-label="Policy details">
					<p>Last updated</p>
					<strong>{siteConfig.lastUpdated}</strong>
				</aside>
				<article className="prose">
					<section className="callout">
						<p><strong>In short:</strong> the plugin connects directly from your device to Google. The developer does not operate a server that receives your plan or Google Calendar data.</p>
					</section>

					<section>
						<h2>Information the plugin accesses</h2>
						<p>The plugin requests only the Google Calendar permissions needed for its calendar workflow:</p>
						<ul>
							<li>Read calendar-list metadata so you can select a calendar you are allowed to write to.</li>
							<li>Create a secondary calendar when you explicitly request one.</li>
							<li>Create events in the selected calendar and read back plugin-created events to verify that creation succeeded.</li>
						</ul>
						<p>Google’s Calendar event permission is technically capable of viewing and editing events across calendars available to your account. The plugin is designed to operate only on the calendar you select and to verify events it can identify as its own.</p>
					</section>

					<section>
						<h2>Information sent to Google</h2>
						<p>When you approve a preview, the plugin sends the event titles, dates, start and end times, time zone, reminders setting, and private plugin identity markers required to create and verify those events. Google processes this information under the Google Privacy Policy.</p>
					</section>

					<section>
						<h2>Local storage</h2>
						<p>OAuth client credentials and the Google refresh token are stored through Obsidian SecretStorage on your device. Non-secret settings—such as the selected calendar ID, event IDs, configured heading, time zone, and completed-day records—are stored in the plugin’s local Obsidian data.</p>
						<p>If you choose to synchronize your Obsidian configuration with another service or device, that synchronization is controlled by you and by the service you selected.</p>
					</section>

					<section>
						<h2>Collection and sharing</h2>
						<p>The plugin contains no analytics, advertising, or developer-operated telemetry. The developer does not receive, sell, rent, or share your plan, calendar contents, OAuth credentials, or usage information. Requests necessary for the feature are sent directly to Google’s OAuth and Calendar services.</p>
					</section>

					<section>
						<h2>Retention and deletion</h2>
						<p>You control locally stored plugin information. Using the plugin’s disconnect or reset controls clears its stored authorization and attempts to revoke access with Google. You may also revoke access from your Google Account permissions page.</p>
						<p>Disconnecting or removing the plugin does not automatically delete calendars or events already created in Google Calendar. You can delete those directly in Google Calendar.</p>
					</section>

					<section>
						<h2>Security</h2>
						<p>The plugin uses Google OAuth, requests access over HTTPS, and keeps credential values out of ordinary plugin settings. No security measure is perfect, so you should protect access to your devices, Obsidian vault, Google account, and synchronization tools.</p>
					</section>

					<section>
						<h2>Changes to this policy</h2>
						<p>This policy may be updated if the plugin’s data handling changes. The date at the top of this page identifies the current version.</p>
					</section>

					<section>
						<h2>Contact</h2>
						<p>For privacy questions, email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>
					</section>
				</article>
			</div>
		</main>
	);
}

