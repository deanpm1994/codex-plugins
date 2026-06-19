# DPI Plugin Spec

## Summary

Create a standalone `dpi` Codex plugin that guides users through the full Design -> Plan -> Implement flow, while still allowing each phase to be started independently. The plugin should keep handoff notes inside the active spec or plan document, not in a separate handoff directory.

## Decisions

- The plugin is standalone under `plugins/dpi`.
- The user can enter at design, plan, implement, or handoff directly.
- The top-level `dpi` skill conducts the full flow in order.
- The design phase writes exactly one spec file for the session.
- The plan phase may produce one or more plan files for the same session.
- Handoff content stays inside the phase doc that just completed.

## Handoff

### Current State

- Standalone plugin boundary chosen.
- No `docs/dpi/handoffs` tree.
- One spec per session, multiple plans allowed.
- Direct phase entry stays supported.

### Next Step

Create the plugin scaffold and write the phase skills plus the session docs.

### Notes

Users should be able to read and edit the handoff in place without chasing a separate file.

