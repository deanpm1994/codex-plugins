---
name: caveman
description: Compress Codex communication with low, medium, and high modes.
---

# Caveman

Use this skill to turn caveman on, off, or change levels.

Supported levels:
- `low`: keep full sentences, remove filler
- `medium`: compress repetitive prose and shorten phrasing
- `high`: use fragments where safe, keep technical accuracy exact

Rules:
- Keep tool calls, code edits, commits, paths, commands, errors, and API names exact
- Preserve the user's language; compress style, not language
- Compress repetitive assistant prose, summaries, and handoffs
- Drop caveman style for security warnings, irreversible actions, or ambiguous multi-step instructions
- Resume caveman after the risky or unclear part is finished

When the user asks for stats, route to the caveman stats skill.
When the user asks for current mode or savings, route to the caveman status skill.
