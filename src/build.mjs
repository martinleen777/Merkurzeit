// Генератор сайта MerkurZeit: собирает статический сайт в _site/.
// Запуск: node src/build.mjs   (SITE_URL=https://… — адрес сайта для canonical, sitemap и OpenGraph)

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GA_ID, SITE, HOME, HALLS, GALLERY, PLAYER_PROTECTION_NOTE } from "./site.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "_site");
const SITE_URL = (process.env.SITE_URL || `https://${SITE.domain}`).replace(/\/+$/, "");
const BASE_PATH = new URL(SITE_URL + "/").pathname;

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const tel = (p) => "tel:" + p.replace(/[^\d+]/g, "");
const version = (file) => crypto.createHash("sha1").update(fs.readFileSync(path.join(SRC, file))).digest("hex").slice(0, 10);
const V = { css: version("style.css"), js: version("site.js") };

function write(rel, content) {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

// Меню сайта
const NAV = [
  ["", "Home"],
  ["#eilbeker-spielhalle", "Eilbeker Spielhalle"],
  ["#fiesta-spielhalle", "Fiesta Spielhalle"],
  ["spielerschutz/", "Spielerschutz"],
  ["stellenangebote/", "Stellenangebote"],
];

const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z" fill="currentColor"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 6.5 12 13l8.5-6.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  logo: '<svg class="logo-mark" viewBox="0 0 48 20" aria-hidden="true"><path d="M0 2l9 8-9 8zM11 2l9 8-9 8zM22 2l9 8-9 8zM33 2l9 8-9 8z" fill="currentColor"/></svg>',
};

function layout({ rel, title, description, body, root, ogImage, noindex = false, current = rel }) {
  const pageUrl = `${SITE_URL}/${rel}`;
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.title;
  const nav = NAV.map(([href, label]) => {
    const link = href.startsWith("#") ? `${root}${href}` : `${root}${href}`;
    const isCur = href === current && !href.startsWith("#");
    return `<a href="${link}"${isCur ? ' aria-current="page"' : ""}>${label}</a>`;
  }).join("");
  const img = ogImage || `${SITE_URL}/assets/img/hero.jpg`;
  return `<!doctype html>
<html lang="de"${GA_ID ? ` data-ga="${esc(GA_ID)}"` : ""}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${pageUrl}">`}
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title || SITE.title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${pageUrl}">
<meta property="og:image" content="${img}">
<meta property="og:locale" content="de_DE">
<meta name="theme-color" content="#000000">
<link rel="icon" href="${root}assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${root}assets/img/apple-touch-icon.png">
<link rel="stylesheet" href="${root}assets/style.css?v=${V.css}">
<script src="${root}assets/site.js?v=${V.js}" defer></script>
</head>
<body>
<a class="skip" href="#main">Zum Inhalt</a>
<header class="site-header">
<div class="wrap header-inner">
<a class="brand" href="${root}">${ICONS.logo}<span>${SITE.name}</span></a>
<div class="social">
<a href="${SITE.instagram}" rel="noopener" target="_blank" aria-label="Instagram" class="ig">${ICONS.instagram}</a>
<a href="${SITE.facebook}" rel="noopener" target="_blank" aria-label="Facebook" class="fb">${ICONS.facebook}</a>
</div>
<button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menü"><span></span><span></span><span></span></button>
<nav class="nav" id="site-nav" aria-label="Hauptmenü">${nav}</nav>
</div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
<div class="wrap footer-inner">
<div class="footer-left">
<div class="footer-icons">
<a class="round round--mail" href="mailto:${SITE.email}?subject=MerkurZeitWebLink" aria-label="E-Mail">${ICONS.mail}</a>
<a class="round" href="${root}" aria-label="Startseite"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></a>
</div>
<p>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</p>
</div>
<nav class="footer-links" aria-label="Rechtliches">
<a href="${root}impressum/">Impressum</a>
<a href="${root}spielerschutz/">Spielerschutz</a>
<a href="${root}datenschutz/">Datenschutz</a>
${GA_ID ? '<button type="button" class="consent-open">Cookie-Einstellungen</button>' : ""}
</nav>
</div>
</footer>
${GA_ID ? `<section class="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title" hidden>
<p class="consent-title" id="consent-title">Analyse-Cookies</p>
<p class="consent-text">Wir möchten Google Analytics nutzen, um zu sehen, wie Besucher diese Website verwenden. Dabei werden Cookies gesetzt und Daten an Google übermittelt, auch in die USA. Die Analyse startet nur, wenn Sie zustimmen. Ihre Wahl können Sie jederzeit über „Cookie-Einstellungen“ unten auf der Seite ändern. <a href="${root}datenschutz/">Datenschutzerklärung</a></p>
<div class="consent-actions">
<button type="button" class="btn consent-btn" data-consent="denied">Ablehnen</button>
<button type="button" class="btn consent-btn" data-consent="granted">Akzeptieren</button>
</div>
</section>` : ""}
</body>
</html>
`;
}

const rootFor = (rel) => "../".repeat(rel.split("/").filter(Boolean).length);

function picture(name, alt, { sizes = "100vw", eager = false, cls = "" } = {}) {
  return `<picture${cls ? ` class="${cls}"` : ""}><source type="image/webp" srcset="${name}.webp"><img src="${name}.jpg" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture>`;
}

function homePage() {
  const rel = "", root = "";
  const halls = HALLS.map((h) => `<article class="hall" id="${h.id}">
${picture(`${root}assets/img/${h.photo}`, `${h.name} – Außenansicht`, { cls: "hall-photo" })}
<div class="hall-body">
<h3>${esc(h.name)}</h3>
<p>${esc(h.text)}</p>
<dl class="hall-facts">
<div><dt>Öffnungszeiten:</dt><dd><strong>${esc(h.hours)}</strong></dd></div>
<div><dt>Adresse:</dt><dd><strong>${esc(h.address)}</strong></dd></div>
<div><dt>Telefon:</dt><dd><a href="${tel(h.phone)}"><strong>${esc(h.phone)}</strong></a></dd></div>
<div><dt>Lage:</dt><dd>${esc(h.location)}</dd></div>
</dl>
<a class="btn btn--route" href="https://www.google.com/maps/dir/?api=1&amp;destination=${encodeURIComponent(h.address).replace(/%20/g, "+")}" rel="noopener" target="_blank">Route planen ${ICONS.pin}</a>
</div>
</article>`).join("\n");

  const gallery = GALLERY.map((g) => `<li><a href="${root}assets/img/${g.file}.jpg" data-lightbox="galerie"><picture><source type="image/webp" srcset="${root}assets/img/${g.file}-640.webp"><img src="${root}assets/img/${g.file}-640.jpg" alt="${esc(g.alt)}" loading="lazy" decoding="async"></picture></a></li>`).join("");

  const body = `<section class="hero">
<div class="wrap hero-inner">
<div class="hero-text">
<h1>${HOME.heading.map(esc).join("<br>")}</h1>
<p class="hero-welcome">${esc(HOME.intro[0])}</p>
${HOME.intro.slice(1).map((p) => `<p>${esc(p)}</p>`).join("\n")}
<p class="age-badge"><span>18+</span> ${esc(HOME.age)}</p>
</div>
${picture(`${root}assets/img/hero`, "Moderne Geldspielgeräte in der Spielhalle", { eager: true, cls: "hero-photo" })}
</div>
</section>
<section class="halls-section">
<div class="wrap">
<h2 class="section-title">Unsere Spielhallen</h2>
<div class="halls">
${halls}
</div>
</div>
</section>
<section class="gallery-section">
<div class="wrap">
<h2 class="section-title">Galerie</h2>
<ul class="gallery">${gallery}</ul>
</div>
</section>
<section class="protection-note">
<div class="wrap">
<h2>Spielerschutz</h2>
<p>${esc(PLAYER_PROTECTION_NOTE)} <a href="tel:08001372700">0800 1 37 27 00</a>.</p>
<p><a href="${root}spielerschutz/">→ Mehr zum Spielerschutz</a></p>
</div>
</section>`;

  const ld = {
    "@context": "https://schema.org",
    "@graph": HALLS.map((h) => {
      const [street, cityPart] = h.address.split(/,\s*/);
      const [zip, ...city] = cityPart.split(" ");
      return {
        "@type": "EntertainmentBusiness",
        name: h.name,
        url: `${SITE_URL}/#${h.id}`,
        telephone: h.phone,
        image: `${SITE_URL}/assets/img/${h.photo}.jpg`,
        address: { "@type": "PostalAddress", streetAddress: street, postalCode: zip, addressLocality: city.join(" "), addressCountry: "DE" },
        openingHours: "Mo-Su 12:00-05:00",
      };
    }),
  };
  const html = layout({ rel, root, title: "", description: SITE.description, body, current: "" })
    .replace("</head>", `<script type="application/ld+json">${JSON.stringify(ld)}</script>\n</head>`);
  write("index.html", html);
}

function contentPage(slug) {
  const rel = `${slug}/`, root = rootFor(rel);
  let html = fs.readFileSync(path.join(SRC, "content", `${slug}.html`), "utf8");
  const meta = (k) => (html.match(new RegExp(`<!--\\s*${k}:\\s*(.*?)\\s*-->`)) || [])[1] || "";
  const title = meta("title"), description = meta("description");
  html = html.replace(/<!--[\s\S]*?-->\n?/g, "").replace(/\{\{root\}\}/g, root);
  write(`${rel}index.html`, layout({ rel, root, title, description, body: `<div class="wrap page"><article class="prose">${html}</article></div>` }));
  return rel;
}

// ---------- сборка ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(path.join(SRC, "static"), path.join(OUT, "assets"), { recursive: true });
fs.copyFileSync(path.join(SRC, "style.css"), path.join(OUT, "assets/style.css"));
fs.copyFileSync(path.join(SRC, "site.js"), path.join(OUT, "assets/site.js"));

homePage();
const pages = [""];
for (const f of fs.readdirSync(path.join(SRC, "content")).filter((f) => f.endsWith(".html")).sort()) {
  pages.push(contentPage(f.replace(/\.html$/, "")));
}

// Старый адрес страницы вакансий на Wix → новый.
write("down-for-maintenance/index.html", `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Stellenangebote | ${SITE.name}</title>
<link rel="canonical" href="${SITE_URL}/stellenangebote/"><meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=../stellenangebote/"></head>
<body><p><a href="../stellenangebote/">Stellenangebote</a></p></body></html>
`);

// 404: GitHub Pages показывает её по любому адресу, поэтому пути — от корня сайта.
write("404.html", layout({ rel: "404/", root: BASE_PATH, title: "Seite nicht gefunden", description: "Seite nicht gefunden", noindex: true,
  body: `<div class="wrap page notfound"><h1>404</h1><p>Diese Seite gibt es nicht.</p><p><a class="btn btn--route" href="${BASE_PATH}">Zur Startseite</a></p></div>` }));

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `<url><loc>${SITE_URL}/${p}</loc></url>`).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
write("CNAME", SITE.domain + "\n");
write(".nojekyll", "");

console.log(`Готово: ${pages.length} страниц → _site/  (адрес сайта: ${SITE_URL})`);
