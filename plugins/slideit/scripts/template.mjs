export function buildTheme() {
  return {
    typography: "intentional",
    spacing: "consistent",
    palette: "clear",
    rhythm: "controlled",
    surface: "#f8fafc",
    accent: "#0f172a",
  };
}

export function renderSlide(slide) {
  if (slide.type === "title") {
    return `<section class="slide slide-title"><h1>${escapeHtml(slide.heading || "")}</h1><p>${escapeHtml(slide.subheading || "")}</p></section>`;
  }

  const body = slide.body ? `<p class="slide-body">${escapeHtml(slide.body)}</p>` : "";
  return `<section class="slide"><h2>${escapeHtml(slide.heading || "")}</h2>${body}</section>`;
}

export function buildHtmlShell(body, { title, theme = buildTheme(), references = [] }) {
  const referenceMarkup = references.length
    ? `<aside class="references">${references.map((reference) => `<p>${escapeHtml(reference.text || reference)}</p>`).join("")}</aside>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title || "Slideit Deck")}</title>
  <style>
    :root {
      color-scheme: light;
      --slide-surface: ${escapeHtml(theme.surface)};
      --slide-accent: ${escapeHtml(theme.accent)};
    }
    body {
      margin: 0;
      font-family: "Aptos", "Inter", ui-sans-serif, system-ui, sans-serif;
      background:
        radial-gradient(circle at top left, rgba(255,255,255,.9), transparent 35%),
        linear-gradient(160deg, #f8fafc 0%, #e2e8f0 100%);
      color: var(--slide-accent);
    }
    .reveal { width: 100vw; min-height: 100vh; }
    .slide {
      box-sizing: border-box;
      width: 100vw;
      min-height: 100vh;
      padding: 72px 88px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 18px;
    }
    .slide h2 {
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 1rem;
      color: #475569;
      margin: 0 0 6px;
    }
    .slide-title h1 {
      font-size: clamp(3rem, 7vw, 6rem);
      line-height: 0.95;
      letter-spacing: -0.04em;
      margin: 0;
      max-width: 12ch;
    }
    .slide-title p {
      font-size: 1.25rem;
      margin: 0;
      max-width: 34ch;
      color: #334155;
    }
    .slide-body {
      margin: 0;
      max-width: 56ch;
      font-size: 1.2rem;
      line-height: 1.6;
      color: #1e293b;
    }
    .references {
      position: fixed;
      right: 20px;
      bottom: 20px;
      max-width: 360px;
      padding: 14px 16px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(15, 23, 42, 0.08);
      font-size: 0.85rem;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="reveal">
    ${body}
  </div>
  ${referenceMarkup}
</body>
</html>`;
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
