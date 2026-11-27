/* Shared navigation for the desktop sidebar and mobile drawer. */
(() => {
  "use strict";

  const rootUrl = new URL("../../", document.currentScript.src);
  const sidebarScrollPositionKey = "site-sidebar-scroll-position";
  const sidebarScrollDestinationKey = "site-sidebar-scroll-destination";

  const navigationGroups = [
    {
      title: "Get started",
      links: [{ label: "Introduction", path: "index.html" }],
    },
    {
      title: "Manual",
      links: [
        {
          label: "Requests and ownership",
          path: "pages/manual/requests-and-ownership/index.html",
          matchPathOnly: true,
        },
        {
          label: "Development and validation",
          path: "pages/manual/development-and-validation/index.html",
          matchPathOnly: true,
        },
        {
          label: "Information and documentation",
          path: "pages/manual/information-and-documentation/index.html",
          matchPathOnly: true,
        },
        {
          label: "Documentation",
          path: "pages/manual/documentation/index.html",
        },
        {
          label: "Rules",
          path: "pages/manual/rules/index.html",
          matchPathOnly: true,
        },
        {
          label: "Conventions",
          path: "pages/manual/conventions/index.html",
          matchPathOnly: true,
        },
        {
          label: "Redirections",
          path: "pages/manual/redirections/index.html",
          matchPathOnly: true,
        },
        {
          label: "Glossary",
          path: "pages/manual/glossary/index.html",
          matchPathOnly: true,
        },
        {
          label: "Structure",
          path: "pages/manual/structure/index.html",
          matchPathOnly: true,
        },
      ],
      sections: [
        {
          title: "Implementation Workflow",
          links: [
            {
              label: "Workflow",
              path: "pages/implementation-workflow/workflow/index.html",
              matchPathOnly: true,
            },
            {
              label: "Delivery steps",
              path: "pages/implementation-workflow/delivery-steps/index.html",
              matchPathOnly: true,
            },
            {
              label: "Delivery responsibilities",
              path: "pages/implementation-workflow/delivery-responsibilities/index.html",
              matchPathOnly: true,
            },
            {
              label: "Details to verify",
              path: "pages/implementation-workflow/details-to-verify/index.html",
              matchPathOnly: true,
            },
            {
              label: "Other request types",
              path: "pages/implementation-workflow/other-request-types/index.html",
              matchPathOnly: true,
            },
          ],
        },
        {
          title: "Job Order Creation",
          links: [
            {
              label: "Preparation and handover",
              path: "pages/job-order-creation/preparation-and-handover/index.html",
              matchPathOnly: true,
            },
            {
              label: "Details to verify",
              path: "pages/job-order-creation/details-to-verify/index.html",
              matchPathOnly: true,
            },
          ],
        },
        {
          title: "Version Control Practice",
          links: [
            {
              label: "Branch flow",
              path: "pages/version-control-practice/branch-flow/index.html",
              matchPathOnly: true,
            },
            {
              label: "Working with changes",
              path: "pages/version-control-practice/working-with-changes/index.html",
              matchPathOnly: true,
            },
            {
              label: "Details to verify",
              path: "pages/version-control-practice/details-to-verify/index.html",
              matchPathOnly: true,
            },
          ],
        },
        {
          title: "List of Teams",
          links: [
            {
              label: "Assessment Center Team",
              path: "pages/list-of-teams/assessment-center-team/index.html",
              matchPathOnly: true,
            },
            {
              label: "DiskFlow Team",
              path: "pages/list-of-teams/diskflow-team/index.html",
              matchPathOnly: true,
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

  const resolveLinkUrl = (path) => {
    const [filePath, fragment] = path.split("#", 2);

    if (filePath.endsWith(".md")) {
      const query = new URLSearchParams({ doc: filePath });

      const documentationUrl = new URL(
        `pages/manual/documentation/index.html?${query.toString()}`,
        rootUrl,
      );

      if (fragment) {
        documentationUrl.hash = fragment;
      }

      return documentationUrl;
    }

    return new URL(path, rootUrl);
  };

  window.siteScripts.navigationItems = navigationGroups.flatMap((group) =>
    [
      ...(group.links || []),
      ...(group.sections || []).flatMap((section) => section.links),
    ].map((link) => ({
      label: link.label,
      url: resolveLinkUrl(link.path).href,
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

  const buildLinkItem = (link, isDesktop = false) => {
    const listItem = document.createElement("li");
    const linkUrl = resolveLinkUrl(link.path);

    const anchor = createElementWithClass(
      "a",
      isDesktop ? "sidebar-link" : linkClass,
      link.label,
    );

    anchor.href = linkUrl.href;

    navigationAnchors.push({ anchor, link, linkUrl, isDesktop });

    listItem.append(anchor);

    return listItem;
  };

  // Original mobile navigation layout is preserved.
  const buildMobileGroup = (group) => {
    const section = document.createElement("section");

    const listElement = createElementWithClass(
      "ul",
      "mt-1 flex flex-col gap-1",
    );

    section.append(createElementWithClass("h3", headingClass, group.title));

    (group.links || []).forEach((link) => {
      listElement.append(buildLinkItem(link));
    });

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

      subsection.links.forEach((link) => {
        subsectionList.append(buildLinkItem(link));
      });

      section.append(subsectionList);
    });

    return section;
  };

  // Static documentation-style desktop navigation.
  const buildDesktopGroup = (group) => {
    const section = createElementWithClass("section", "sidebar-nav-group");

    section.append(
      createElementWithClass("h3", "sidebar-section-heading", group.title),
    );

    const navigationLinkList = createElementWithClass(
      "ul",
      "sidebar-link-list",
    );

    (group.links || []).forEach((link) => {
      navigationLinkList.append(buildLinkItem(link, true));
    });

    section.append(navigationLinkList);

    (group.sections || []).forEach((subsection) => {
      const subsectionContainer = createElementWithClass(
        "div",
        "sidebar-subsection",
      );

      subsectionContainer.append(
        createElementWithClass(
          "h4",
          "sidebar-subsection-heading",
          subsection.title,
        ),
      );

      const subsectionList = createElementWithClass("ul", "sidebar-link-list");

      subsection.links.forEach((link) => {
        subsectionList.append(buildLinkItem(link, true));
      });

      subsectionContainer.append(subsectionList);
      section.append(subsectionContainer);
    });

    return section;
  };

  const updateActiveLinks = () => {
    const currentUrl = new URL(window.location.href);
    const currentPath = normalizePath(currentUrl.pathname);
    const currentDocument = currentUrl.searchParams.get("doc");
    const hasCurrentHash = Boolean(currentUrl.hash);

    navigationAnchors.forEach(({ anchor, link, linkUrl, isDesktop }) => {
      const isCurrentPath = normalizePath(linkUrl.pathname) === currentPath;

      const linkDocument = linkUrl.searchParams.get("doc");
      const isSameDocument = linkDocument === currentDocument;

      const isCurrentLink = linkUrl.hash
        ? currentUrl.hash === linkUrl.hash && (!linkDocument || isSameDocument)
        : link.matchPathOnly ||
          (!hasCurrentHash && (!linkDocument || isSameDocument));

      const isActive = isCurrentPath && isCurrentLink;

      if (isDesktop) {
        anchor.classList.toggle("is-active", isActive);
      } else {
        anchor.className = isActive ? activeClass : linkClass;
      }

      if (isActive) {
        anchor.setAttribute("aria-current", linkUrl.hash ? "location" : "page");
      } else {
        anchor.removeAttribute("aria-current");
      }
    });
  };

  document.querySelectorAll("[data-site-nav]").forEach((container) => {
    const isMobileDrawer = Boolean(container.closest("dialog"));

    container.classList.add(
      isMobileDrawer ? "site-nav-mobile" : "site-nav-desktop",
    );

    if (!isMobileDrawer) {
      container.closest("aside")?.classList.add("site-sidebar");
    }

    container.replaceChildren();

    navigationGroups.forEach((group) => {
      container.append(
        isMobileDrawer ? buildMobileGroup(group) : buildDesktopGroup(group),
      );
    });
  });

  const sidebarScrollContainer = document.querySelector(
    ".site-sidebar .scrollbar-hidden",
  );

  if (sidebarScrollContainer) {
    sidebarScrollContainer.addEventListener("click", (event) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const clickedLink = event.target.closest("a");

      if (
        !clickedLink ||
        (clickedLink.target && clickedLink.target !== "_self") ||
        new URL(clickedLink.href).origin !== window.location.origin
      ) {
        return;
      }

      sessionStorage.setItem(
        sidebarScrollPositionKey,
        String(sidebarScrollContainer.scrollTop),
      );
      sessionStorage.setItem(sidebarScrollDestinationKey, clickedLink.href);
    });

    const savedDestination = sessionStorage.getItem(
      sidebarScrollDestinationKey,
    );
    const savedScrollPosition = Number(
      sessionStorage.getItem(sidebarScrollPositionKey),
    );

    if (
      savedDestination === window.location.href &&
      Number.isFinite(savedScrollPosition)
    ) {
      requestAnimationFrame(() => {
        sidebarScrollContainer.scrollTop = savedScrollPosition;
      });
    }

    sessionStorage.removeItem(sidebarScrollDestinationKey);
    sessionStorage.removeItem(sidebarScrollPositionKey);
  }

  updateActiveLinks();

  window.addEventListener("hashchange", updateActiveLinks);
  window.addEventListener("popstate", updateActiveLinks);
})();
