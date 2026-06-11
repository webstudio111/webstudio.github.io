#!/usr/bin/env node
// Batch demo-link generator for the Demo Factory.
// Usage: node make-links.mjs <batch.json> [--md out.md]
//
// batch.json format:
// {
//   "defaults": { "lang": "ro", "agency": "WebStudio", "contact": "webstudio.outreach@gmail.com" },
//   "prospects": [ { "biz": "...", "tag": "...", "owner": "", "phone": "...",
//                    "addr": "...", "hours": "...", "color": "#aabbcc",
//                    "svcs": "Service | Price\n...", "faqs": "Q | A\n...",
//                    "note": "personalization hook, not encoded in link" } ]
// }
//
// svcs/faqs accept either the "A | B" multiline string format used by the
// factory form, or pre-parsed arrays of {n,p} / {q,a}.

import { readFileSync, writeFileSync } from 'node:fs';

const BASE = 'https://webstudio111.github.io/front-desk-kit/demo.html';

function parsePairs(text, kA, kB) {
  if (Array.isArray(text)) return text;
  return String(text || '').split('\n').map(l => l.trim()).filter(Boolean).map(l => {
    const i = l.indexOf('|');
    if (i === -1) return { [kA]: l, [kB]: '' };
    return { [kA]: l.slice(0, i).trim(), [kB]: l.slice(i + 1).trim() };
  });
}

function encodeCfg(cfg) {
  return Buffer.from(JSON.stringify(cfg), 'utf8').toString('base64url');
}

function buildLink(p, defaults) {
  const cfg = {
    lang: p.lang || defaults.lang || 'ro',
    biz: p.biz,
    tag: p.tag || '',
    owner: p.owner || '',
    phone: p.phone || '',
    addr: p.addr || '',
    hours: p.hours || '',
    color: p.color || '#0ea5e9',
    services: parsePairs(p.svcs, 'n', 'p'),
    faqs: parsePairs(p.faqs, 'q', 'a'),
    agency: p.agency || defaults.agency || 'WebStudio',
    contact: p.contact || defaults.contact || '',
  };
  return BASE + '#' + encodeCfg(cfg);
}

const [, , file, ...rest] = process.argv;
if (!file) {
  console.error('Usage: node make-links.mjs <batch.json> [--md out.md]');
  process.exit(1);
}
const batch = JSON.parse(readFileSync(file, 'utf8'));
const defaults = batch.defaults || {};
const rows = batch.prospects.map(p => ({ p, link: buildLink(p, defaults) }));

const mdIdx = rest.indexOf('--md');
if (mdIdx !== -1 && rest[mdIdx + 1]) {
  const md = rows.map(({ p, link }, i) =>
    `## ${i + 1}. ${p.biz}\n\n` +
    (p.note ? `> ${p.note}\n\n` : '') +
    `- 📞 ${p.phone || '—'} · 📍 ${p.addr || '—'}\n` +
    `- 🔗 Demo: ${link}\n`
  ).join('\n');
  writeFileSync(rest[mdIdx + 1], `# Demo links\n\n${md}`);
  console.error(`Wrote ${rest[mdIdx + 1]}`);
} else {
  for (const { p, link } of rows) console.log(`${p.biz}\t${link}`);
}
