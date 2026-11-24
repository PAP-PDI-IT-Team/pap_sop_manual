// Single source for site navigation. Renders the mobile drawer and the
// desktop sidebar from one list, so a new page is added in one place.
(() => {
  const rootUrl = new URL("../../", document.currentScript.src);

  const navigationGroups = [
    {
      title: "Get started",
      links: [
        { label: "Home", path: "index.html" },
        { label: "Features", path: "index.html#features" },
        { label: "Contributors", path: "index.html#contributors" },
        { label: "About", path: "pages/about/index.html", soon: true },
      ],
    },
    {
      title: "Manual",
      links: [
        { label: "Manual Contents", path: "pages/manual/index.html" },
        {
          label: "Job Order Creation",
          path: "pages/manual/index.html#job-order-creation",
        },
        {
          label: "Implementation Workflow",
          path: "pages/manual/index.html#implementation-workflow",
        },
        {
          label: "Version Control Practice",
          path: "pages/manual/index.html#version-control-practice",
        },
        {
          label: "Documentation Guide",
          path: "pages/manual/index.html#documentation-guide",
        },
      ],
    },
    {
      title: "Contribute",
      links: [
        {
          label: "Content Template Sample",
          path: "pages/template-sample/index.html",
        },
      ],
    },
  ];

  const headingClass = "px-4 pb-1 text-sm font-semibold text-slate-500";
  const linkClass =
    "block rounded-lg px-4 py-2.5 text-slate-800 transition hover:bg-slate-100 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";
  const activeClass =
    "block rounded-lg bg-blue-50 px-4 py-2.5 font-semibold text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";
  const soonClass =
    "flex items-center justify-between rounded-lg px-4 py-2.5 text-slate-400";
  const badgeClass =
    "rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-500";

  const normalizePath = (pathname) => pathname.replace(/index\.html$/, "");
  const currentPath = normalizePath(window.location.pathname);

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

    if (link.soon) {
      const soonItem = createElementWithClass("span", soonClass, link.label);
      soonItem.setAttribute("aria-disabled", "true");
      soonItem.append(createElementWithClass("span", badgeClass, "Soon"));
      listItem.append(soonItem);
      return listItem;
    }

    const linkUrl = new URL(link.path, rootUrl);
    const anchor = createElementWithClass("a", linkClass, link.label);
    anchor.href = linkUrl.href;

    if (!linkUrl.hash && normalizePath(linkUrl.pathname) === currentPath) {
      anchor.className = activeClass;
      anchor.setAttribute("aria-current", "page");
    }

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

  document.querySelectorAll("[data-site-nav]").forEach((container) => {
    navigationGroups.forEach((group) => container.append(buildGroup(group)));
  });
})();
