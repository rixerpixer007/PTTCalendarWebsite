import type { Metadata } from 'next';
import { siteConfig } from '../site-config';

export const metadata: Metadata = {
	title: 'Terms of service',
	description: `Terms for using ${siteConfig.name}.`,
};

export default function TermsOfService() {
	return (
		<main className="legal-page shell">
			<header className="legal-header">
				<p className="section-label">Terms</p>
				<h1>Terms of service</h1>
				<p>These terms apply when you use {siteConfig.name}, a personal productivity plugin for Obsidian and Google Calendar.</p>
			</header>

			<div className="legal-content">
				<aside className="legal-meta" aria-label="Terms details">
					<p>Last updated</p>
					<strong>{siteConfig.lastUpdated}</strong>
				</aside>
				<article className="prose">
					<section>
						<h2>Acceptance</h2>
						<p>By installing or using the plugin, you agree to these terms. If you do not agree, do not use the plugin or connect it to your Google account.</p>
					</section>

					<section>
						<h2>What the plugin provides</h2>
						<p>The plugin parses a supported daily-plan format, displays a preview, and can create the approved events in a Google Calendar you select. Features and supported formats may change as the plugin develops.</p>
					</section>

					<section>
						<h2>Your responsibilities</h2>
						<ul>
							<li>Review event titles, dates, and times before approving creation.</li>
							<li>Use a Google account and calendar you are authorized to modify.</li>
							<li>Keep your devices, OAuth credentials, synchronization tools, and Google account secure.</li>
							<li>Use the plugin in compliance with applicable law and Google’s and Obsidian’s terms.</li>
						</ul>
					</section>

					<section>
						<h2>No affiliation</h2>
						<p>{siteConfig.name} is an independent project. It is not endorsed by, sponsored by, or affiliated with Google or Obsidian. Google Calendar and Obsidian are trademarks of their respective owners.</p>
					</section>

					<section>
						<h2>Availability and warranty</h2>
						<p>The plugin is provided “as is” and “as available,” without warranties of uninterrupted operation, compatibility, accuracy, or fitness for a particular purpose. You remain responsible for checking your calendar and maintaining appropriate backups.</p>
					</section>

					<section>
						<h2>Limitation of liability</h2>
						<p>To the maximum extent permitted by law, the developer is not liable for missed appointments, incorrect calendar entries, lost data, account access issues, service interruptions, or indirect or consequential losses resulting from use of the plugin.</p>
					</section>

					<section>
						<h2>Ending access</h2>
						<p>You may stop using the plugin at any time. Disconnect Google within the plugin or revoke its access through your Google Account. Existing Google Calendar events and calendars remain under your control.</p>
					</section>

					<section>
						<h2>Changes</h2>
						<p>These terms may be updated when the plugin changes. Continued use after an update means you accept the revised terms.</p>
					</section>

					<section>
						<h2>Contact</h2>
						<p>Questions about these terms can be sent to <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>
					</section>
				</article>
			</div>
		</main>
	);
}

