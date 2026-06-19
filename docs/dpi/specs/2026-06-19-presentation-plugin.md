# Presentation Plugin Spec

## Summary

Create a standalone Codex plugin named `slideit` for making polished presentations from outlines and prompts. The plugin should generate a ready-to-run HTML deck as its primary artifact, use Reveal.js as the v1 presentation engine, and support diagrams through Excalidraw-style authoring with SVG-to-PNG export when the deck needs custom visuals.

## Goals

- Turn notes, outlines, or rough prompts into a finished presentation.
- Produce a polished design by default rather than a bare technical demo.
- Keep the deck output ready to preview and share as HTML.
- Support embedded diagrams without forcing the user into manual SVG editing.
- Keep the engine choice swappable later even though v1 standardizes on Reveal.js.

## Non-Goals

- Supporting multiple slide engines in v1.
- Building a full slide collaboration platform.
- Requiring the user to manage a separate source artifact unless the plugin needs it internally.
- Generating generic text-only decks with no visual direction.

## Product Shape

The plugin should feel like a presentation assistant that helps the user move from idea to finished deck in one workflow:

1. Collect the topic, audience, and any existing notes.
2. Generate a slide structure with a visual direction.
3. Produce an HTML deck that opens and previews directly.
4. Create diagrams where needed using Excalidraw-compatible assets.
5. Keep the result polished enough that the first pass is presentable.

The v1 experience should favor a single, confident default path instead of many configuration branches.

## Architecture

### Plugin Boundary

The plugin lives as a standalone Codex plugin under `plugins/slideit`. The plugin should be self-contained and not depend on the DPI plugin internals.

### Presentation Engine

Use Reveal.js as the default rendering engine for v1. It is a good fit because it produces portable HTML output, supports theming, and keeps the generated deck easy to preview and share.

The design should keep the rendering layer isolated so another engine could be swapped in later without rewriting the whole plugin flow.

### Diagram Strategy

Use Excalidraw as the diagram path when the deck needs custom visuals.

- The plugin may create Excalidraw-style diagrams as part of the deck generation workflow.
- The deck should embed exported diagram assets rather than requiring the user to hand-edit vector output.
- Prefer exporting diagrams as SVG first and rasterizing to PNG when the presentation layout or preview flow benefits from it.
- If a slide needs a bespoke diagram, the plugin should treat that as part of the presentation build, not as a separate manual design task.

### Frontend Quality Bar

The plugin should enforce a polished design system at generation time:

- intentional typography and spacing
- a clear color palette
- consistent slide rhythm
- visual hierarchy that works for business, technical, and executive audiences
- diagram styling that matches the deck rather than looking pasted in

This is a content-generation concern, not just a template choice. The deck output should be visually finished by default.

## Workflow

### Input

The user can start from:

- a rough topic
- a loose outline
- existing notes
- an existing deck that needs refinement

### Generation Steps

1. Normalize the topic, audience, and desired tone.
2. Draft the narrative arc.
3. Assign slides to sections and call out where diagrams are needed.
4. Generate the Reveal.js deck structure.
5. Produce or embed Excalidraw-based visuals as needed.
6. Output a ready-to-run HTML presentation.

### Output

The primary output is a runnable HTML deck. Any supporting assets should stay organized underneath the generated deck so the deck remains easy to open, preview, and revise.

## Expected Commands and Skills

The plugin should expose a simple presentation flow rather than a large command surface:

- start a new presentation from a prompt or outline
- refine an existing deck
- add or update diagrams
- preview or export the generated deck

The exact command names can be finalized during implementation, but the interaction model should stay small and opinionated.

## Risks and Trade-offs

- Reveal.js is a strong default, but an engine-agnostic boundary is still needed to keep future migration affordable.
- Excalidraw is excellent for bespoke diagrams, but embedding it cleanly may require some asset-handling discipline.
- A polished default can increase generation complexity, so the plugin should prefer a few strong presets over infinite customization.

## Version 2 Routes

If the v1 deck-first flow succeeds, the next iteration can move in one of these directions:

1. Expand the editor loop so users can tweak slide content, layout, and diagrams inside a richer interactive workflow.
2. Add alternative render targets such as PDF export, static site packaging, or another slide engine behind the same abstract deck model.
3. Introduce a stronger visual system with themed presets, audience-specific styles, and a more opinionated art direction layer.
4. Add deeper diagram tooling, including direct Excalidraw editing, reusable diagram components, or smarter image pipeline handling.

## Validation

The plugin will be considered successful when:

- it produces a working HTML deck from a prompt or outline
- the deck opens with a polished visual design
- diagram slides can use Excalidraw-generated assets
- the implementation stays swappable at the engine boundary
- the v1 path remains simple enough to use without a long setup process

## Handoff

### Current Decision

Build a presentation-making plugin named `slideit` that defaults to Reveal.js, outputs ready-to-run HTML decks, and uses Excalidraw-based diagrams with SVG-to-PNG export when needed.

### Open Questions

- Whether diagrams should be created through an internal helper, direct Excalidraw integration, or both.
- Whether the plugin should preserve a separate source tree behind the HTML deck.

### Next Phase

Write the implementation plan for the plugin scaffold, manifest, skills, and deck-generation flow.

### Editable Notes

The key design constraint is design quality first. The generated deck should look intentional and polished even when the input is rough.
