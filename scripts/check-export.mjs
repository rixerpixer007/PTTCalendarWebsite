import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const origin = 'https://ptt-calendar.tech';
for (const path of ['/', '/privacy/', '/terms/']) {
	const html = readFileSync(new URL(`../out${path}index.html`, import.meta.url), 'utf8');
	assert.ok(html.includes(`<link rel="canonical" href="${origin}${path}"`), `${path}: missing canonical URL`);
	assert.ok(!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html), `${path}: must remain indexable`);
	const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? '';
	assert.ok(main.length > 500, `${path}: missing readable main content`);
	assert.ok(!main.includes('<iframe'), `${path}: policy/content must not depend on an iframe`);
	if (path === '/privacy/') {
		for (const required of ['PTT Daily Calendar', 'auth.ptt-calendar.tech', 'Limited Use', 'Retention, deletion', 'Cloudflare', 'contact@ptt-calendar.tech']) {
			assert.ok(main.includes(required), `Privacy HTML missing ${required}`);
		}
	}
}
const home = readFileSync(new URL('../out/index.html', import.meta.url), 'utf8');
assert.ok(home.includes('href="/privacy/"'), 'Homepage must link directly to privacy policy');
assert.ok(readFileSync(new URL('../out/robots.txt', import.meta.url), 'utf8').includes('Allow: /'));
assert.ok(readFileSync(new URL('../out/sitemap.xml', import.meta.url), 'utf8').includes(`${origin}/privacy/`));
console.log('Verified static policy routes, readable HTML, canonical URLs, and crawler access files.');
