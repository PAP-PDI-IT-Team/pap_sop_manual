// Single source for the desktop sidebar and mobile drawer navigation.
(() => {
  const rootUrl = new URL("../../", document.currentScript.src);
  const navigationGroups = [
    {
      title: "Get started",
      links: [
        { label: "Home", path: "index.html" },
        { label: "Features", path: "index.html#features" },
        { label: "Contributors", path: "index.html#contributors" },
      ],
    },
    {
      title: "Manual",
      links: [
        {
          label: "Requests and ownership",
          path: "pages/requests-ownership/index.html",
          matchPathOnly: true,
        },
        {
          label: "Development and validation",
          path: "pages/development-validation/index.html",
          matchPathOnly: true,
        },
        {
          label: "Information and documentation",
          path: "pages/information-documentation/index.html",
          matchPathOnly: true,
        },
      ],
    },
  ];

  const headingClass = "px-4 pb-1 text-sm font-semibold text-slate-500";
  const linkClass =
    "block rounded-lg px-4 py-2.5 text-slate-800 transition hover:bg-slate-100 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";
  const activeClass =
    "block rounded-lg bg-blue-50 px-4 py-2.5 font-semibold text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";
  const normalizePath = (pathname) => pathname.replace(/index\.html$/, "");
  const navigationAnchors = [];

  const createElementWithClass = (tagName, className, textContent) => {
    const element = document.createElement(tagName);
    element.className = className;

    if (textContent) {
      element.textContent = textContent;
    }

    return element;
  };

  const buildLinkItem = (link) => {
    const listItem = document.createElement("li");
    const linkUrl = new URL(link.path, rootUrl);
    const anchor = createElementWithClass("a", linkClass, link.label);

    anchor.href = linkUrl.href;
    navigationAnchors.push({ anchor, link, linkUrl });
    listItem.append(anchor);

    return listItem;
  };

  const buildGroup = (group) => {
    const section = document.createElement("section");
    const listElement = createElementWithClass(
      "ul",
      "mt-1 flex flex-col gap-1",
    );

    section.append(createElementWithClass("h3", headingClass, group.title));
    group.links.forEach((link) => listElement.append(buildLinkItem(link)));
    section.append(listElement);
    return section;
  };

  const updateActiveLinks = () => {
    const currentPath = normalizePath(window.location.pathname);
    const hasCurrentHash = Boolean(window.location.hash);

    navigationAnchors.forEach(({ anchor, link, linkUrl }) => {
      const isCurrentPath = normalizePath(linkUrl.pathname) === currentPath;
      const isCurrentLink = linkUrl.hash
        ? window.location.hash === linkUrl.hash
        : link.matchPathOnly || !hasCurrentHash;

      anchor.className =
        isCurrentPath && isCurrentLink ? activeClass : linkClass;

      if (isCurrentPath && isCurrentLink) {
        anchor.setAttribute("aria-current", linkUrl.hash ? "location" : "page");
      } else {
        anchor.removeAttribute("aria-current");
      }
    });
  };

  document.querySelectorAll("[data-site-nav]").forEach((container) => {
    container.classList.add("flex", "flex-col", "gap-6");
    navigationGroups.forEach((group) => container.append(buildGroup(group)));
  });

  updateActiveLinks();
  window.addEventListener("hashchange", updateActiveLinks);
})();
