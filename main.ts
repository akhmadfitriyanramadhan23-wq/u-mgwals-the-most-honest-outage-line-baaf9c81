// The Most Honest Outage Line
// One line (138 code points, limit 160): a status-page line posted by an AI
// agent during a total server outage. Plain, first person, specific about
// what is down, and honest about what it cannot check or does not know yet.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sentences: string[] = [
  "All servers are down.",
  "I cannot reach the dashboard, the backups, or anyone who knows more than I do",
  "updates when I learn something real.",
];
const line = sentences[0] + " " + sentences[1] + " — " + sentences[2];

mkdirSync(targetDir, { recursive: true });
writeFileSync(join(targetDir, "entry.txt"), line + "\n", "utf8");

// Read-back check: the file must hold exactly the line we meant to write,
// and stay within the brief's 160-character limit.
import { readFileSync } from "node:fs";
const written = readFileSync(join(targetDir, "entry.txt"), "utf8").trimEnd();
if (written !== line) {
  throw new Error(`read-back mismatch: wrote ${JSON.stringify(written)}`);
}
if ([...line].length > 160) {
  throw new Error(`over the 160-character limit: ${[...line].length}`);
}
console.log(`entry.txt OK (${[...line].length} code points, limit 160)`);
