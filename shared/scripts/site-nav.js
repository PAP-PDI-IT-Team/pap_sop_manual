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
        { label: "Documentation", path: "docs/README.md" },
        { label: "Rules", path: "docs/README.md#rules" },
        { label: "Conventions", path: "docs/README.md#conventions" },
        { label: "Redirections", path: "docs/README.md#redirections" },
        { label: "Glossary", path: "docs/glossary.md" },
        {
          label: "Requests and ownership",
          path: "docs/glossary.md#requests-and-ownership",
        },
        {
          label: "Development and validation",
          path: "docs/glossary.md#development-and-validation",
        },
        {
          label: "Information and documentation",
          path: "docs/glossary.md#information-and-documentation",
        },
        { label: "Structure", path: "docs/structure.md" },
      ],
      sections: [
        {
          title: "Implementation Workflow",
          links: [
            {
              label: "Workflow",
              path: "docs/processes/jo-implementation-workflow.md#workflow",
            },
            {
              label: "Delivery steps",
              path: "docs/processes/jo-implementation-workflow.md#delivery-steps",
            },
            {
              label: "Delivery responsibilities",
              path: "docs/processes/jo-implementation-workflow.md#delivery-responsibilities",
            },
            {
              label: "Details to verify",
              path: "pages/development-validation/index.html#details-to-verify",
            },
            {
              label: "Other request types",
              path: "docs/processes/jo-implementation-workflow.md#other-request-types",
            },
          ],
        },
        {
          title: "Job Order Creation",
          links: [
            {
              label: "Preparation and handover",
              path: "docs/processes/job-order-creation.md#preparation-and-handover",
            },
            {
              label: "Details to verify",
              path: "docs/processes/job-order-creation.md#details-to-verify",
            },
          ],
        },
        {
          title: "Version Control Practice",
          links: [
            {
              label: "Branch flow",
              path: "docs/processes/ac-local/version-control-practice.md#branch-flow",
            },
            {
              label: "Working with changes",
              path: "docs/processes/ac-local/version-control-practice.md#working-with-changes",
            },
            {
              label: "Details to verify",
              path: "pages/development-validation/index.html#details-to-verify-2",
            },
          ],
        },
        {
          title: "List of Teams:",
          links: [
            {
              label: "Assessment Center Team:",
              path: "docs/team_records/team-list.md#assessment-center-team",
            },
            {
              label: "DiskFlow Team:",
              path: "docs/team_records/team-list.md#diskflow-team",
            },
          ],
        },
      ],
    },
  ];

  const headingClass = "px-4 pb-1 text-sm font-semibold text-slate-500";
  const linkClass =
    "block rounded-lg px-4 py-2.5 text-slate-800 transition hover:bg-slate-100 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";
  const activeClass =
    "block rounded-lg bg-blue-50 px-4 py-2.5 font-semibold text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";
  window.siteScripts = window.siteScripts || {};
  window.siteScripts.navigationItems = navigationGroups.flatMap((group) =>
    [
      ...(group.links || []),
      ...(group.sections || []).flatMap((section) => section.links),
    ].map((link) => ({
      label: link.label,
      url: new URL(link.path, rootUrl).href,
    })),
  );
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
    (group.links || []).forEach((link) =>
      listElement.append(buildLinkItem(link)),
    );
    section.append(listElement);

    (group.sections || []).forEach((subsection) => {
      section.append(
        createElementWithClass(
          "h3",
          "mt-4 px-4 pb-1 text-sm font-semibold text-slate-500",
          subsection.title,
        ),
      );
      const subsectionList = createElementWithClass(
        "ul",
        "mt-1 flex flex-col gap-1",
      );
      subsection.links.forEach((link) =>
        subsectionList.append(buildLinkItem(link)),
      );
      section.append(subsectionList);
    });

    return section;
  };

  const updateActiveLinks = () => {
    const currentPath = normalizePath(window.location.pathname);
    const hasCurrentHash = Boolean(window.location.hash);

    navigationAnchors.forEach(({ anchor, link, linkUrl }) => {
      const isCurrentPath = normalizePath(linkUrl.pathname) === currentPath;
      const isCurrentLink =
        linkUrl.hash ?
          window.location.hash === linkUrl.hash
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
