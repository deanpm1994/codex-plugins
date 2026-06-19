import { buildDeckModel } from "./deck.mjs";
import { buildHtmlShell, buildTheme, renderSlide } from "./template.mjs";

export function renderDeck(model = {}) {
  const slides = Array.isArray(model.slides) ? model.slides : [];
  const body = slides.map(renderSlide).join("\n");
  return {
    html: buildHtmlShell(body, {
      title: model.title,
      theme: model.theme || buildTheme(),
      references: model.references || [],
    }),
    assets: [],
  };
}

export function embedTraceability(deck, transcriptContext = {}) {
  return {
    ...deck,
    references: transcriptContext.citations || [],
    speakerNotes: transcriptContext.summary ? [transcriptContext.summary] : [],
  };
}

export function createPresentation(input = {}) {
  const model = buildDeckModel(input);
  const tracedModel = input.transcriptContext ? embedTraceability(model, input.transcriptContext) : model;
  const rendered = renderDeck(tracedModel);
  return {
    model: tracedModel,
    ...rendered,
  };
}
