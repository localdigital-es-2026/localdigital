// Servidor estático mínimo que imita a Netlify para los tests:
// sirve out/, resuelve URLs "bonitas" (/academias → academias.html),
// aplica las cabeceras de out/_headers y devuelve 404.html con código 404.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { gzipSync } from "node:zlib";

const ROOT = resolve(process.argv[2] ?? "out");
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

// Formato Netlify: una línea con la ruta y debajo cabeceras indentadas "Nombre: valor".
async function loadHeaderRules() {
  const rules = [];
  let text;
  try {
    text = await readFile(join(ROOT, "_headers"), "utf8");
  } catch {
    return rules;
  }
  let current = null;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      current = { pattern: line.trim(), headers: {} };
      rules.push(current);
    } else if (current) {
      const i = line.indexOf(":");
      if (i > 0) current.headers[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return rules;
}

function matches(pattern, path) {
  if (pattern === "/*") return true;
  if (pattern.endsWith("/*")) return path.startsWith(pattern.slice(0, -1));
  return pattern === path;
}

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, "");
  const base = join(ROOT, clean);
  if (!base.startsWith(ROOT)) return null;
  const candidates = [base, `${base}.html`, join(base, "index.html")];
  for (const candidate of candidates) {
    if (await isFile(candidate)) return candidate;
  }
  return null;
}

const server = createServer(async (req, res) => {
  const urlPath = new URL(req.url ?? "/", "http://localhost").pathname;
  if (urlPath === "/__health") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("ok");
    return;
  }
  const rules = await loadHeaderRules();
  for (const rule of rules) {
    if (matches(rule.pattern, urlPath)) {
      for (const [name, value] of Object.entries(rule.headers)) res.setHeader(name, value);
    }
  }

  let file = await resolveFile(urlPath);
  let status = 200;
  if (!file) {
    status = 404;
    file = (await isFile(join(ROOT, "404.html"))) ? join(ROOT, "404.html") : null;
  }
  if (!file) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  let body = await readFile(file);
  // Como Netlify: un Content-Type definido en _headers manda sobre el inferido por extensión.
  if (!res.hasHeader("Content-Type")) res.setHeader("Content-Type", TYPES[extname(file)] ?? "application/octet-stream");
  // Como Netlify: los recursos de texto se sirven comprimidos.
  const type = String(res.getHeader("Content-Type"));
  if (/text|javascript|json|xml|svg/.test(type) && /gzip/.test(String(req.headers["accept-encoding"] ?? ""))) {
    body = gzipSync(body);
    res.setHeader("Content-Encoding", "gzip");
    res.setHeader("Vary", "Accept-Encoding");
  }
  res.writeHead(status);
  res.end(body);
});

server.listen(PORT, () => {
  console.log(`serve-out: ${ROOT} en http://localhost:${PORT}`);
});
