// ste-writing -- OpenCode plugin.
//
// Injects ASD-STE100 Simplified Technical English rules into
// every chat's system prompt. Always active, no toggling needed.
//
// Add to opencode.json:
//   { "plugin": ["/home/noah/.agents/skills/ste-writing/.opencode/plugins/ste-writing.mjs"] }

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export default async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const skillPath = join(__dirname, '..', '..', 'SKILL.md');
  return {
    'experimental.chat.system.transform': async (_input, output) => {
      try {
        const md = readFileSync(skillPath, 'utf8');
        const body = md.replace(/^---[\s\S]*?---\s*/, '');
        output.system.push(body);
      } catch (e) {
        output.system.push('Write prose in ASD-STE100 Simplified Technical English.');
      }
    },
  };
};