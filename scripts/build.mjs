import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputRoot = `${projectRoot}/dist`;
const files = ["index.html", "styles.css", "src/game.js", "src/engine.js"];

await rm(outputRoot, { recursive: true, force: true });
for (const file of files) {
  await mkdir(dirname(`${outputRoot}/${file}`), { recursive: true });
  await cp(`${projectRoot}/${file}`, `${outputRoot}/${file}`);
}

await writeFile(
  `${outputRoot}/build.json`,
  `${JSON.stringify({ app: "EutherShot", version: "0.2.0", builtAt: new Date().toISOString() }, null, 2)}\n`,
);

console.log(`Byggde EutherShot: ${files.length} webbassets i ${outputRoot}`);
