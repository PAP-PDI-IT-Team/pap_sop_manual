
(() => {
  "use strict";

  const mermaidScriptUrl =
    "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs";

  let mermaidPromise;

  const loadMermaid = () => {
    if (!mermaidPromise) {
      mermaidPromise = import(mermaidScriptUrl).then((module) => {
        const mermaid = module.default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "default",
          flowchart: {
            htmlLabels: false,
          },
        });

        return mermaid;
      });
    }

    return mermaidPromise;
  };

  const renderMermaidDiagrams = async () => {
    const codeBlocks = document.querySelectorAll(
      ".markdown-content pre > code.language-mermaid",
    );

    if (!codeBlocks.length) return;

    try {
      const mermaid = await loadMermaid();

      for (const code of codeBlocks) {
        const source = code.textContent.trim();
        const diagram = document.createElement("div");

        diagram.className = "mermaid mermaid-diagram";
        diagram.textContent = source;
        code.parentElement.replaceWith(diagram);

        try {
          await mermaid.run({ nodes: [diagram] });
        } catch (error) {
          console.error("Mermaid diagram could not be rendered:", error);

          const fallback = document.createElement("pre");
          const fallbackCode = document.createElement("code");
          const warning = document.createElement("p");

          warning.className = "mermaid-error";
          warning.textContent =
            "This diagram could not be rendered. Check the Mermaid syntax.";

          fallbackCode.textContent = source;
          fallback.append(warning, fallbackCode);
          diagram.replaceWith(fallback);
        }
      }
    } catch (error) {
      console.error("Mermaid could not be loaded:", error);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderMermaidDiagrams, {
      once: true,
    });
  } else {
    renderMermaidDiagrams();
  }

  document.addEventListener("markdown:rendered", renderMermaidDiagrams);
})();
