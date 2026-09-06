import fs from 'node:fs';
// Self-hosted so the deliverable renders identically offline / on a client laptop.
const FACES = {
  'fraunces-var': 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&display=swap',
  'manrope-var': 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap',
};
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36' };
for (const [name, url] of Object.entries(FACES)) {
  const css = await (await fetch(url, { headers: UA })).text();
  const blocks = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*{[^}]*?src:\s*url\((https:[^)]+\.woff2)\)[^}]*}/g)];
  const latin = blocks.filter(b => b[1] === 'latin' || b[1] === 'latin-ext');
  for (const b of latin) {
    const file = `${name}-${b[1]}.woff2`;
    const buf = Buffer.from(await (await fetch(b[2])).arrayBuffer());
    fs.writeFileSync(`site/assets/fonts/${file}`, buf);
    console.log(file, Math.round(buf.length / 1024) + 'KB');
  }
  if (!latin.length) console.error('NO LATIN SUBSET FOUND for', name);
}
