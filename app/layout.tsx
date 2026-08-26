import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { siteConfig } from './site-config';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description:
		'An Obsidian plugin that turns a daily plan into a preview and creates the approved schedule in Google Calendar.',
	openGraph: {
		title: siteConfig.name,
		description:
			'Preview tomorrow’s plan in Obsidian and create the approved schedule in Google Calendar.',
		type: 'website',
	},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				<header className="site-header">
					<div className="shell header-inner">
						<Link className="brand" href="/" aria-label={`${siteConfig.name} home`}>
							<span className="brand-mark" aria-hidden="true">PTT</span>
							<span>{siteConfig.name}</span>
						</Link>
						<nav aria-label="Main navigation">
							<Link href="/">Overview</Link>
							<Link href="/privacy/">Privacy</Link>
							<Link href="/terms/">Terms</Link>
						</nav>
					</div>
				</header>
				{children}
				<footer>
					<div className="shell footer-inner">
						<p>© 2026 {siteConfig.name}</p>
						<div className="footer-links">
							<Link href="/privacy/">Privacy policy</Link>
							<Link href="/terms/">Terms of service</Link>
						</div>
					</div>
				</footer>
			</body>
		</html>
	);
}

