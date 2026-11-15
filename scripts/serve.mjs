/**
 * Mini-Server für die lokale Vorschau von /dist (ohne Abhängigkeiten).
 *   node scripts/serve.mjs [port]
 * Übernimmt die Header aus vercel.json (u. a. Content-Security-Policy), damit lokal
 * dieselben Regeln gelten wie auf Vercel, und beantwortet Range-Anfragen (Film).
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.join(REPO, 'dist');
const PORT = Number(process.argv[2] || 4321);
const CONFIG = JSON.parse(fs.readFileSync(path.join(REPO, 'vercel.json'), 'utf8'));
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

/** Header aus vercel.json für einen Pfad (Regeln mit has/missing gelten nur für bestimmte Hosts und bleiben lokal weg). */
function headersFor(pathname) {
  const out = {};
  for (const rule of CONFIG.headers || []) {
    if (rule.has || rule.missing) continue;
    if (new RegExp('^' + rule.source + '$').test(pathname)) for (const h of rule.headers) out[h.key] = h.value;
  }
  return out;
}

http
  .createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(ROOT, pathname);
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end();
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) {
      res.writeHead(404, { ...headersFor(pathname), 'content-type': TYPES['.html'] });
      fs.createReadStream(path.join(ROOT, '404.html')).pipe(res);
      return;
    }
    const size = fs.statSync(file).size;
    const head = { ...headersFor(pathname), 'content-type': TYPES[path.extname(file)] || 'application/octet-stream', 'accept-ranges': 'bytes' };
    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    if (range) {
      const start = range[1] ? Number(range[1]) : size - Number(range[2]);
      const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
      res.writeHead(206, { ...head, 'content-range': `bytes ${start}-${end}/${size}`, 'content-length': end - start + 1 });
      fs.createReadStream(file, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, { ...head, 'content-length': size });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`Vorschau: http://localhost:${PORT}`));
