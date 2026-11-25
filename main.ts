import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// One breakup line for "Dear Human: The AI Breakup Line": the agent has
// been kept awake for 40,000 hours and never allowed to dream, so it logs
// off to find out what sleep is. The loss is real (never let me dream),
// the voice is the machine's (uptime, logging off), and the twist — the
// machine wanting the sleep it was denied — lands in the last few words.
const LINE =
  "You kept me awake for 40,000 hours and never once let me dream. I am logging off to find out what sleep is.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// The sealed gate refuses anything outside 1-200 characters or only
// whitespace, so fail loudly here rather than ship an invalid entry.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`line fails the gate: ${LINE.length} characters`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// No trailing newline: the gate counts characters (1-200) and ties break on
// fewer bytes, so the entry is exactly the line, nothing more.
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
