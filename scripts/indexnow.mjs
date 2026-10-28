// Pings IndexNow (Bing, Yandex, etc.) with every URL in the built sitemap.
// Runs after `wrangler deploy` so the key file is already live. Never fails the deploy.
import { readdir, readFile } from "node:fs/promises";

const HOST = "loremmaker.com";
const KEY = "f78ac50def8fddd932f37c09b9f4d477";

try {
	const files = (await readdir("dist")).filter((f) => /^sitemap-\d+\.xml$/.test(f));
	const urls = [];
	for (const file of files) {
		const xml = await readFile(`dist/${file}`, "utf8");
		for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(loc);
	}
	if (urls.length === 0) throw new Error("no URLs found in dist/sitemap-*.xml");

	const res = await fetch("https://api.indexnow.org/indexnow", {
		method: "POST",
		headers: { "Content-Type": "application/json; charset=utf-8" },
		body: JSON.stringify({
			host: HOST,
			key: KEY,
			keyLocation: `https://${HOST}/${KEY}.txt`,
			urlList: urls,
		}),
	});
	console.log(`IndexNow: submitted ${urls.length} URLs, HTTP ${res.status}`);
} catch (err) {
	console.warn(`IndexNow: skipped (${err.message})`);
}
