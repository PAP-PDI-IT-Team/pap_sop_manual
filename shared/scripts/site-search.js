(() => {
  const createElement = (tagName, className, textContent) => {
    const element = document.createElement(tagName);
    element.className = className;

    if (textContent) {
      element.textContent = textContent;
    }

    return element;
  };

  const siteHeader = document.querySelector(".site-header");

  if (!(siteHeader instanceof HTMLElement)) {
    return;
  }

  const triggerContainer = createElement(
    "div",
    "ml-auto flex items-center md:ml-4",
  );
  const trigger = createElement(
    "button",
    "inline-flex h-11 w-11 items-center justify-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-[min(20rem,45vw)] sm:justify-start sm:px-4",
  );
  trigger.type = "button";
  trigger.setAttribute("aria-label", "Search manual");

  const searchIcon = createElement("i", "bx bx-search text-lg text-slate-500");
  searchIcon.setAttribute("aria-hidden", "true");
  trigger.append(searchIcon);

  const searchLabel = createElement(
    "span",
    "hidden whitespace-nowrap sm:inline",
    "Search manual",
  );
  trigger.append(searchLabel);

  const shortcut = createElement(
    "kbd",
    "ml-auto hidden whitespace-nowrap rounded bg-white px-2 py-1 text-xs font-medium text-slate-600 sm:inline",
    "Ctrl K",
  );
  trigger.append(shortcut);
  triggerContainer.append(trigger);

  const navigation = siteHeader.querySelector('[aria-label="Primary"]');
  if (navigation) {
    siteHeader.insertBefore(triggerContainer, navigation.nextSibling);
  } else {
    siteHeader.append(triggerContainer);
  }

  const dialog = createElement(
    "dialog",
    "fixed left-1/2 top-24 m-0 max-h-[80vh] w-[calc(100%-2rem)] max-w-[60rem] -translate-x-1/2 overflow-hidden rounded-xl border-0 bg-white p-5 text-slate-900 shadow-2xl backdrop:bg-slate-950/40 backdrop:backdrop-blur-sm",
  );
  dialog.setAttribute("aria-labelledby", "site-search-title");

  const searchPanel = createElement("div", "flex flex-col gap-5");
  const inputWrapper = createElement("div", "flex items-center gap-3");
  const inputIcon = createElement("i", "bx bx-search text-2xl text-slate-400");
  inputIcon.setAttribute("aria-hidden", "true");
  const input = createElement(
    "input",
    "h-12 min-w-0 flex-1 border-0 bg-transparent text-lg outline-none placeholder:text-slate-400",
  );
  input.type = "search";
  input.placeholder = "Search page or section";
  input.setAttribute("aria-label", "Search page or section");

  const closeButton = createElement(
    "button",
    "grid size-11 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700",
  );
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close search");
  const closeIcon = createElement("i", "bx bx-x text-2xl");
  closeIcon.setAttribute("aria-hidden", "true");
  closeButton.append(closeIcon);

  inputWrapper.append(inputIcon, input, closeButton);
  const dialogTitle = createElement("h2", "sr-only", "Search manual");
  dialogTitle.id = "site-search-title";
  const searchDescription = createElement(
    "p",
    "text-base text-slate-600",
    "Search results show the page and section where the match lives.",
  );
  const resultStatus = createElement(
    "p",
    "text-base text-slate-600",
    "Type at least 2 characters.",
  );
  searchPanel.append(inputWrapper);

  const resultRegion = createElement(
    "div",
    "mt-4 max-h-[60vh] overflow-y-auto",
  );
  const resultList = createElement("ul", "flex flex-col gap-1");
  resultRegion.append(resultStatus, resultList);

  dialog.append(dialogTitle, searchPanel, searchDescription, resultRegion);
  document.body.append(dialog);

  const searchItems = [];
  const normalizedNavigationItems =
    window.siteScripts && Array.isArray(window.siteScripts.navigationItems)
      ? window.siteScripts.navigationItems
      : [];

  normalizedNavigationItems.forEach((item) => {
    const navigationUrl = new URL(item.url);
    if (!navigationUrl.hash) {
      searchItems.push({
        label: item.label,
        description: "Page",
        searchText: item.label,
        preview: item.label,
        url: navigationUrl.href,
      });
    }
  });

  if (!searchItems.length) {
    searchItems.push({
      label: "IT SOP Manual",
      description: "Page",
      searchText: "IT SOP Manual Home",
      preview: "IT SOP Manual",
      url: new URL("index.html", document.baseURI).href,
    });
  }

  const openSearch = () => {
    if (!dialog.open) {
      dialog.showModal();
    }
    input.value = "";
    renderResults("");
    window.requestAnimationFrame(() => input.focus());
  };

  const closeSearch = () => {
    if (dialog.open) {
      dialog.close();
      trigger.focus();
    }
  };

  trigger.addEventListener("click", openSearch);
  closeButton.addEventListener("click", closeSearch);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeSearch();
    }
  });

  dialog.addEventListener("close", () => {
    trigger.focus();
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }

    if (event.key === "Escape" && dialog.open) {
      event.preventDefault();
      closeSearch();
    }
  });

  function renderResults(query) {
    resultList.replaceChildren();
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery.length < 2) {
      resultStatus.textContent = "Type at least 2 characters.";
      resultStatus.classList.remove("hidden");
      return;
    }

    const matchingItems = searchItems
      .filter((item) => {
        return (
          item.label.toLowerCase().includes(normalizedQuery) ||
          item.description.toLowerCase().includes(normalizedQuery) ||
          item.searchText.toLowerCase().includes(normalizedQuery)
        );
      })
      .slice(0, 12);

    if (!matchingItems.length) {
      resultStatus.textContent = "No matching pages or sections found.";
      resultStatus.classList.remove("hidden");
      return;
    }

    resultStatus.textContent = `${matchingItems.length} matching result${matchingItems.length === 1 ? "" : "s"}.`;
    resultStatus.classList.remove("hidden");

    matchingItems.forEach((item) => {
      const listItem = document.createElement("li");
      const anchor = createElement(
        "a",
        "flex flex-col gap-1 rounded-lg px-3 py-3 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-blue-700",
      );
      anchor.href = item.url;

      const resultContent = createElement("span", "min-w-0");
      resultContent.append(
        createElement(
          "span",
          "block text-sm font-medium text-slate-500",
          item.description,
        ),
        createElement("span", "block font-semibold text-slate-900", item.label),
        createElement(
          "span",
          "mt-0.5 block text-sm text-slate-600",
          item.preview,
        ),
      );

      anchor.append(resultContent);
      anchor.addEventListener("click", () => dialog.close());
      listItem.append(anchor);
      resultList.append(listItem);
    });
  }

  input.addEventListener("input", () => renderResults(input.value));

  const uniquePageUrls = [...new Set(searchItems.map((item) => item.url))];

  uniquePageUrls.forEach(async (pageUrl) => {
    try {
      const response = await fetch(pageUrl);
      if (!response.ok) {
        throw new Error(
          `Search index could not load ${pageUrl}: ${response.status}`,
        );
      }

      const documentText = await response.text();
      const pageDocument = new DOMParser().parseFromString(
        documentText,
        "text/html",
      );
      const pageTitle =
        pageDocument.querySelector("h1")?.textContent?.trim() ||
        pageDocument.title ||
        "IT SOP Manual";
      const matchedNavigationItem = searchItems.find(
        (item) => item.url === pageUrl,
      );

      if (matchedNavigationItem) {
        matchedNavigationItem.label = pageTitle;
        matchedNavigationItem.description = "Page";
        matchedNavigationItem.searchText =
          pageDocument
            .querySelector("main")
            ?.textContent?.replace(/\s+/g, " ")
            .trim() || pageTitle;
        matchedNavigationItem.preview =
          pageDocument
            .querySelector("main p")
            ?.textContent?.replace(/\s+/g, " ")
            .trim() || pageTitle;
      }

      pageDocument.querySelectorAll("h1, h2, h3").forEach((heading) => {
        const headingText = heading.textContent?.trim();
        const headingId = heading.id;

        if (!headingText || headingText === pageTitle) {
          return;
        }

        const headingUrl = new URL(pageUrl);
        if (headingId) {
          headingUrl.hash = headingId;
        }

        const sectionContainer = heading.closest("section, article");
        const sectionText = (
          sectionContainer?.textContent ||
          heading.parentElement?.textContent ||
          headingText
        )
          .replace(/\s+/g, " ")
          .trim();
        const headingDescription = getHeadingDescription(heading);

        searchItems.push({
          label: headingText,
          description: pageTitle,
          searchText: sectionText,
          preview: headingDescription || headingText,
          url: headingUrl.href,
        });
      });

      if (dialog.open) {
        renderResults(input.value);
      }
    } catch (error) {
      console.error("Could not load the shared search index.", error);
    }
  });

  renderResults("");

  function getHeadingDescription(heading) {
    let currentElement = heading;

    while (currentElement.parentElement) {
      let siblingElement = currentElement.nextElementSibling;

      while (siblingElement) {
        if (
          siblingElement.matches("h1, h2, h3") ||
          siblingElement.querySelector("h1, h2, h3")
        ) {
          break;
        }

        const paragraphElement = siblingElement.matches("p")
          ? siblingElement
          : siblingElement.querySelector("p");

        if (paragraphElement) {
          return (
            paragraphElement.textContent?.replace(/\s+/g, " ").trim() || ""
          );
        }

        siblingElement = siblingElement.nextElementSibling;
      }

      if (currentElement.parentElement.matches("main, body")) {
        break;
      }

      currentElement = currentElement.parentElement;
    }

    return "";
  }
})();
