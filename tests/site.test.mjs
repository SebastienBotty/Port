import assert from "node:assert/strict";
import { before, after, test } from "node:test";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { createRequire } from "node:module";
import { setTimeout as delay } from "node:timers/promises";

const require = createRequire(import.meta.url);
const domain = "https://sebastienbotty.com";
const slugs = ["tou", "not-messenger", "checkcar", "undercover", "carnet-demarchage", "commission-europeenne"];
let processHandle;
let origin;
let output = "";

before(async () => {
  const socket = createServer();
  await new Promise(resolve => socket.listen(0, "127.0.0.1", resolve));
  const port = socket.address().port;
  await new Promise(resolve => socket.close(resolve));
  origin = `http://127.0.0.1:${port}`;
  processHandle = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", String(port)], { stdio: ["ignore", "pipe", "pipe"] });
  processHandle.stdout.on("data", data => { output += data; });
  processHandle.stderr.on("data", data => { output += data; });
  for (let attempt = 0; attempt < 80; attempt++) {
    try { if ((await fetch(`${origin}/robots.txt`)).ok) return; } catch {}
    if (processHandle.exitCode !== null) throw new Error(output);
    await delay(200);
  }
  throw new Error(`Next.js did not start: ${output}`);
});
after(() => processHandle?.kill());

function structuredData(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
}

for (const locale of ["fr", "en"]) {
  test(`${locale}: homepage contains crawlable content and localized metadata without JavaScript`, async () => {
    const response = await fetch(`${origin}/${locale}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<html lang="${locale}"`));
    assert.match(html, /<h1[^>]*id="name"/);
    assert.match(html, /<title>Sébastien Botty/);
    assert.ok(html.includes(`rel="canonical" href="${domain}/${locale}"`));
    assert.ok(html.includes('hrefLang="fr"') || html.includes('hrefLang="fr"'.toLowerCase()));
    assert.ok(html.includes('hrefLang="en"') || html.includes('hrefLang="en"'.toLowerCase()));
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.doesNotMatch(html, /name="robots" content="noindex/);
    for (const slug of slugs) assert.ok(html.includes(`href="/${locale}/projects/${slug}"`), slug);
    const graph = structuredData(html)[0]["@graph"];
    assert.ok(graph.some(item => item["@type"] === "Person"));
    assert.ok(graph.some(item => item["@type"] === "ProfilePage" && item.inLanguage === locale));
  });

  test(`${locale}: all project pages contain server-rendered details and unique canonicals`, async () => {
    for (const slug of slugs) {
      const response = await fetch(`${origin}/${locale}/projects/${slug}`);
      assert.equal(response.status, 200, slug);
      const html = await response.text();
      assert.ok(html.includes(`rel="canonical" href="${domain}/${locale}/projects/${slug}"`), slug);
      assert.match(html, /<details class="feature"/);
      assert.doesNotMatch(html, /name="robots" content="noindex/);
      const graph = structuredData(html)[0]["@graph"];
      assert.ok(graph.some(item => item["@type"] === "CreativeWork" && item.url.endsWith(`/${locale}/projects/${slug}`)));
      assert.ok(graph.some(item => item["@type"] === "BreadcrumbList"));
    }
  });
}

test("legacy links permanently redirect to their corresponding projects", async () => {
  const redirects = { Tou: "tou", "Not-messenger": "not-messenger", CheckCar: "checkcar", Undercover: "undercover", "Freelance Prospecting Dashboard": "carnet-demarchage" };
  for (const [name, slug] of Object.entries(redirects)) {
    const response = await fetch(`${origin}/project/${encodeURIComponent(name)}`, { redirect: "manual" });
    assert.equal(response.status, 308, name);
    assert.equal(new URL(response.headers.get("location"), origin).pathname, `/fr/projects/${slug}`);
  }
  for (const path of ["/", "/index.html", "/project/Portfolio"]) {
    const response = await fetch(origin + path, { redirect: "manual" });
    assert.equal(response.status, 308, path);
    assert.equal(new URL(response.headers.get("location"), origin).pathname, "/fr");
  }
});

test("unknown locales, projects and legacy names return real 404s", async () => {
  for (const path of ["/de", "/fr/projects/does-not-exist", "/en/projects/__proto__", "/project/__proto__", "/fr/does-not-exist"]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 404, path);
    if (!path.startsWith("/project/")) assert.match(await response.text(), /name="robots" content="noindex"/);
  }
});

test("sitemap lists every canonical in both languages; robots allows redirect crawling", async () => {
  const response = await fetch(`${origin}/sitemap.xml`);
  assert.equal(response.status, 200);
  const xml = await response.text();
  assert.equal([...xml.matchAll(/<loc>/g)].length, 14);
  for (const locale of ["fr", "en"]) {
    assert.ok(xml.includes(`<loc>${domain}/${locale}</loc>`));
    for (const slug of slugs) assert.ok(xml.includes(`<loc>${domain}/${locale}/projects/${slug}</loc>`));
  }
  assert.match(xml, /hreflang="en"/);
  const robots = await (await fetch(`${origin}/robots.txt`)).text();
  assert.ok(robots.includes(`Sitemap: ${domain}/sitemap.xml`));
  assert.doesNotMatch(robots, /Disallow: \/project/);
});

test("social cards and optimized project images are generated", async () => {
  for (const query of ["lang=fr", "lang=en&project=checkcar"]) {
    const response = await fetch(`${origin}/og?${query}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /image\/png/);
    assert.ok((await response.arrayBuffer()).byteLength > 10000);
  }
  const image = await fetch(`${origin}/_next/image?url=%2Fimages%2Fcheckcar.png&w=640&q=75`);
  assert.equal(image.status, 200);
  assert.match(image.headers.get("content-type"), /image\//);
});
