import Link from 'next/link';
import { siteConfig } from './site-config';

const steps = [
	{
		title: 'Write',
		description: 'Plan tomorrow beneath your chosen heading in today’s Obsidian daily note.',
		meta: 'Daily note',
	},
	{
		title: 'Preview',
		description: 'Run the plugin command and check every calculated start and end time before anything is sent.',
		meta: 'Review first',
	},
	{
		title: 'Create',
		description: 'Explicitly approve the preview to create the schedule in your selected Google Calendar.',
		meta: 'Google Calendar',
	},
];

const principles = [
	{
		title: 'No automatic calendar changes.',
		description: 'Events are created only after you review the preview and explicitly approve it.',
	},
	{
		title: 'No developer-operated server.',
		description: 'The plugin connects directly from Obsidian to Google’s OAuth and Calendar services.',
	},
	{
		title: 'No analytics or advertising.',
		description: 'The plugin does not track usage, sell data, or send your plan to the developer.',
	},
];

export default function Home() {
	return (
		<main>
			<section className="hero shell">
				<div className="eyebrow"><span /> Obsidian to Google Calendar</div>
				<h1>Tomorrow’s plan,<br /><em>placed with intention.</em></h1>
				<p className="hero-copy">
					{siteConfig.name} is a focused Obsidian plugin that converts a structured daily plan into a clear preview, then creates the approved schedule in Google Calendar.
				</p>
				<div className="hero-actions">
					<a className="button" href="#how-it-works">How it works</a>
					<Link className="text-link" href="/privacy/">Read the privacy policy <span aria-hidden="true">→</span></Link>
				</div>
			</section>

			<section className="workflow" id="how-it-works">
				<div className="shell">
					<p className="section-label">A deliberate workflow</p>
					<div className="step-grid">
						{steps.map((step, index) => (
							<article className="step-card" key={step.title}>
								<span className="step-number">0{index + 1}</span>
								<div className="step-copy">
									<h2>{step.title}</h2>
									<p>{step.description}</p>
								</div>
								<span className="step-meta">{step.meta}</span>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="principles shell">
				<div>
					<p className="section-label">Designed for trust</p>
					<h2>Your plan stays under your control.</h2>
				</div>
				<div className="principle-list">
					{principles.map((principle, index) => (
						<article className="principle" key={principle.title}>
							<span className="principle-number" aria-hidden="true">0{index + 1}</span>
							<p><strong>{principle.title}</strong>{principle.description}</p>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}
