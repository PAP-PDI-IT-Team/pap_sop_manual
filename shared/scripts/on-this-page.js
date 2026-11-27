(() => {
  "use strict";

  let initialized = false;

  const initializeTableOfContents = () => {
    if (initialized) return;

    const contentsContainers = document.querySelectorAll("[data-toc]");
    const headingElements = Array.from(
      document.querySelectorAll("main h2, main h3"),
    ).filter(
      (heading) =>
        !heading.closest("aside") &&
        !(
          heading.tagName === "H3" && heading.closest("[data-topic-navigation]")
        ),
    );

    if (contentsContainers.length === 0 || headingElements.length === 0) {
      return;
    }

    initialized = true;

    const usedIds = new Set(
      Array.from(document.querySelectorAll("[id]"), (element) => element.id),
    );

    const createHeadingId = (heading) => {
      const headingSlug = (heading.textContent || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/gu, "-")
        .replace(/^-|-$/gu, "");

      const baseId = headingSlug || "section";
      let headingId = baseId;
      let suffix = 2;

      while (usedIds.has(headingId)) {
        headingId = `${baseId}-${suffix}`;
        suffix += 1;
      }

      heading.id = headingId;
      usedIds.add(headingId);
    };

    const contentsTargets = headingElements.map((heading) => {
      if (!heading.id) createHeadingId(heading);

      heading.classList.add("scroll-mt-24");

      return {
        heading,
        label: (heading.textContent || "").trim(),
        level: Number(heading.tagName.substring(1)),
      };
    });

    const baseClass =
      "block border-l-2 py-1.5 pl-3 text-sm transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

    const idleClasses = ["border-transparent", "text-slate-600"];
    const activeClasses = ["border-blue-600", "font-semibold", "text-blue-700"];
    const contentsLinks = [];

    contentsContainers.forEach((container) => {
      const listElement = document.createElement("ul");
      let parentListItem;
      let nestedList;

      listElement.className = "space-y-0.5";

      contentsTargets.forEach(({ heading, label, level }) => {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");

        anchor.href = `#${heading.id}`;
        anchor.textContent = label;
        anchor.className = `${baseClass} ${level === 3 ? "text-xs" : "text-sm"}`;
        anchor.classList.add(...idleClasses);

        contentsLinks.push({ anchor, targetId: heading.id });

        if (level === 3 && parentListItem) {
          if (!nestedList) {
            nestedList = document.createElement("ul");
            nestedList.className = "ml-3 space-y-0.5";
            parentListItem.append(nestedList);
          }

          listItem.append(anchor);
          nestedList.append(listItem);
          return;
        }

        listItem.append(anchor);
        listElement.append(listItem);
        parentListItem = listItem;
        nestedList = undefined;
      });

      container.replaceChildren(listElement);
    });

    const highlightTarget = (targetId) => {
      contentsLinks.forEach(({ anchor, targetId: linkTarget }) => {
        const isActive = linkTarget === targetId;

        anchor.classList.remove(...(isActive ? idleClasses : activeClasses));
        anchor.classList.add(...(isActive ? activeClasses : idleClasses));

        if (isActive) {
          anchor.setAttribute("aria-current", "location");
        } else {
          anchor.removeAttribute("aria-current");
        }
      });
    };

    const isHeadingInActiveRegion = (heading) => {
      const bounds = heading.getBoundingClientRect();
      const activeRegionBottom = window.innerHeight * 0.35;

      return bounds.bottom > 96 && bounds.top < activeRegionBottom;
    };

    const findFragmentTarget = (fragmentId) => {
      const exactTarget = contentsTargets.find(
        ({ heading }) => heading.id === fragmentId,
      );

      if (exactTarget) return exactTarget;

      const fragmentElement = document.getElementById(fragmentId);

      if (!fragmentElement) return;

      return contentsTargets.findLast(({ heading }) =>
        Boolean(
          heading.compareDocumentPosition(fragmentElement) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        ),
      );
    };

    const findVisibleFragmentTarget = () => {
      const fragmentId = decodeURIComponent(window.location.hash.slice(1));
      const target = findFragmentTarget(fragmentId);
      const element = document.getElementById(fragmentId);

      if (!target || !element) return;

      return isHeadingInActiveRegion(element) ? target.heading : undefined;
    };

    let pendingTargetId = "";

    const handleScrollEnd = () => {
      pendingTargetId = "";

      const activeFragmentTarget = findVisibleFragmentTarget();

      if (activeFragmentTarget) {
        highlightTarget(activeFragmentTarget.id);
      }
    };

    contentsLinks.forEach(({ anchor, targetId }) => {
      anchor.addEventListener("click", () => {
        const target = contentsTargets.find(
          ({ heading }) => heading.id === targetId,
        );

        if (!target) return;

        pendingTargetId = isHeadingInActiveRegion(target.heading)
          ? ""
          : targetId;

        highlightTarget(targetId);
      });
    });

    if ("onscrollend" in window) {
      document.addEventListener("scrollend", handleScrollEnd);
    } else {
      let scrollTimer;

      document.addEventListener(
        "scroll",
        () => {
          window.clearTimeout(scrollTimer);
          scrollTimer = window.setTimeout(handleScrollEnd, 150);
        },
        { passive: true },
      );
    }

    const initialFragment = decodeURIComponent(window.location.hash.slice(1));
    const initialTarget = findFragmentTarget(initialFragment);

    highlightTarget(
      initialTarget ? initialTarget.heading.id : contentsTargets[0].heading.id,
    );

    if ("IntersectionObserver" in window) {
      const intersectingHeadings = new Set();

      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              intersectingHeadings.add(entry.target);
            } else {
              intersectingHeadings.delete(entry.target);
            }
          });

          const visibleHeadings = Array.from(intersectingHeadings).sort(
            (first, second) =>
              first.getBoundingClientRect().top -
              second.getBoundingClientRect().top,
          );

          const pendingTarget = contentsTargets.find(
            ({ heading }) => heading.id === pendingTargetId,
          );

          const activeFragmentTarget = findVisibleFragmentTarget();

          const activeHeading =
            pendingTarget?.heading ||
            activeFragmentTarget ||
            visibleHeadings[0];

          if (activeHeading) highlightTarget(activeHeading.id);
        },
        { rootMargin: "-96px 0px -65% 0px" },
      );

      contentsTargets.forEach(({ heading }) => {
        sectionObserver.observe(heading);
      });
    }
  };

  document.addEventListener("markdown:rendered", initializeTableOfContents);

  if (!document.querySelector("[data-markdown-content]")) {
    initializeTableOfContents();
  }
})();
