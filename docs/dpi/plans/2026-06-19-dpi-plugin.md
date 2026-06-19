# DPI Plugin Implementation Plan

## Summary

Implement the `dpi` plugin as a small standalone plugin with one conductor skill, independent phase skills, and in-doc handoffs only. Keep the repo's existing `example-plugin` unchanged.

## Work Items

### 1. Scaffold and manifest

- Ensure `plugins/dpi/.codex-plugin/plugin.json` uses the final DPI branding and prompt text.
- Keep the plugin manifest minimal and valid for Codex plugin validation.

### 2. Skills

- Add the top-level `dpi` conductor skill.
- Add independent `dpi-design`, `dpi-plan`, `dpi-implement`, and `dpi-handoff` skills.
- Add command files for start, design, plan, implement, and handoff routing.

### 3. Docs

- Write one spec for the session in `docs/dpi/specs/`.
- Write the implementation plan in `docs/dpi/plans/`.
- Include the handoff block at the end of each doc rather than creating a separate directory.

### 4. Validation

- Validate the plugin with the plugin-creator validator.
- Check the branch, plugin tree, docs, and marketplace entry.

## Handoff

### Current State

- Plugin scaffold exists and needs DPI-specific content.
- Marketplace entry already exists for `dpi`.

### Next Step

- Fill in the skills and docs, then validate the plugin.

### Notes

- Keep implementation markdown-first.
- Do not introduce helper scripts or tests unless executable code is added later.

