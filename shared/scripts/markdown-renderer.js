(() => {
  "use strict";

  const contentElement = document.querySelector("[data-markdown-content]");
  const titleElement = document.getElementById("document-title");
  const descriptionElement = document.getElementById("document-description");
  const breadcrumbElement = document.getElementById("document-breadcrumb");

  if (!contentElement) return;

  const documentPath = new URLSearchParams(window.location.search).get("doc");

  const showError = (message) => {
    contentElement.innerHTML = "";
    const paragraph = document.createElement("p");
    paragraph.className =
      "rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700";
    paragraph.textContent = message;
    contentElement.append(paragraph);

    if (titleElement) titleElement.textContent = "Document unavailable";
    if (descriptionElement) descriptionElement.textContent = message;
  };

  if (
    !documentPath ||
    !/^docs\/[a-zA-Z0-9_./-]+\.md$/.test(documentPath) ||
    documentPath.split("/").includes("..")
  ) {
    showError("No valid Markdown document was specified.");
    return;
  }

  const rootUrl = new URL("../../", document.currentScript.src);
  const documentUrl = new URL(documentPath, rootUrl);

  const loadLibraries = () => {
    if (window.marked && window.DOMPurify) {
      return Promise.resolve();
    }

    return Promise.all([
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/marked@15.0.7/marked.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.append(script);
      }),
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/dompurify@3.2.4/dist/purify.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.append(script);
      }),
    ]);
  };

  const updateRelativeLinks = (container) => {
    container.querySelectorAll("a[href], img[src]").forEach((element) => {
      const attribute = element.tagName === "IMG" ? "src" : "href";
      const value = element.getAttribute(attribute);

      if (!value || /^(?:[a-z]+:|\/\/|#|mailto:|tel:|data:)/i.test(value)) {
        return;
      }

      const [path, fragment] = value.split("#", 2);
      const targetUrl = new URL(path || documentUrl.href, documentUrl);

      if (element.tagName === "IMG") {
        element.setAttribute(attribute, targetUrl.href);
        return;
      }

      if (targetUrl.pathname.endsWith(".md")) {
        const relativePath = targetUrl.pathname.split("/").filter(Boolean);
        const docsIndex = relativePath.lastIndexOf("docs");

        if (docsIndex !== -1) {
          const markdownPath = relativePath.slice(docsIndex).join("/");
          const query = new URLSearchParams({ doc: markdownPath });

          element.href = `index.html?${query.toString()}${fragment ? `#${fragment}` : ""}`;
        }
      } else {
        element.href = targetUrl.href;
      }
    });
  };

  const loadDocument = async () => {
    try {
      await loadLibraries();

      const response = await fetch(documentUrl);

      if (!response.ok) {
        throw new Error(`Unable to load document (${response.status}).`);
      }

      const markdown = await response.text();

      marked.setOptions({
        gfm: true,
        breaks: false,
      });

      const renderedHtml = marked.parse(markdown);

      contentElement.innerHTML = DOMPurify.sanitize(renderedHtml);

      updateRelativeLinks(contentElement);

      const firstHeading = contentElement.querySelector("h1");
      const title =
        firstHeading?.textContent.trim() ||
        documentPath
          .split("/")
          .pop()
          .replace(/\.md$/i, "")
          .replace(/[-_]/g, " ");

      if (firstHeading) firstHeading.remove();

      if (titleElement) titleElement.textContent = title;
      if (breadcrumbElement) breadcrumbElement.textContent = title;
      if (descriptionElement) {
        descriptionElement.textContent =
          "Documentation and reference materials.";
      }

      document.title = `${title} | PAP SOP Manual`;

      document.dispatchEvent(new CustomEvent("markdown:rendered"));

      const fragmentTarget = document.getElementById(
        window.location.hash.slice(1),
      );

      if (fragmentTarget) {
        fragmentTarget.scrollIntoView();
      }
    } catch (error) {
      console.error("Markdown rendering failed:", error);
      showError(
        "The document could not be loaded. Check the file path and try again.",
      );
    }
  };

  loadDocument();
})();
