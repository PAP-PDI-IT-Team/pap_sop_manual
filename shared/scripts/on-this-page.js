(() => {
  const contentsContainers = document.querySelectorAll("[data-toc]");
  const headingElements = Array.from(
    document.querySelectorAll("main h2, main h3"),
  ).filter(
    (heading) =>
      !heading.closest("aside") &&
      !(heading.tagName === "H3" && heading.closest("[data-topic-navigation]")),
  );

  const createHeadingId = (heading, usedIds) => {
    const headingLabel = (heading.textContent || "").trim();
    const headingSlug = headingLabel
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

  const usedIds = new Set(
    Array.from(document.querySelectorAll("[id]"), (element) => element.id),
  );
  const contentsTargets = headingElements.map((heading) => {
    if (!heading.id) {
      createHeadingId(heading, usedIds);
    }

    heading.classList.add("scroll-mt-24");

    return {
      heading,
      label: (heading.textContent || "").trim(),
      level: Number(heading.tagName.substring(1)),
    };
  });

  if (contentsContainers.length === 0 || contentsTargets.length === 0) {
    return;
  }

  const baseClass =
    "block border-l-2 py-1.5 pl-3 text-sm transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";
  const idleClasses = ["border-transparent", "text-slate-600"];
  const activeClasses = ["border-blue-600", "font-semibold", "text-blue-700"];
  const nestedClass = "ml-3";
  const contentsLinks = [];
  let pendingTargetId = "";

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
          nestedList.className = `${nestedClass} space-y-0.5`;
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

    container.append(listElement);
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

  const highlightClickedTarget = ({ anchor, targetId }) => {
    anchor.addEventListener("click", () => {
      const clickedTarget = contentsTargets.find(
        ({ heading }) => heading.id === targetId,
      );

      if (!clickedTarget) {
        throw new Error(`The contents link target "${targetId}" is missing.`);
      }

      pendingTargetId =
        isHeadingInActiveRegion(clickedTarget.heading) ? "" : targetId;
      highlightTarget(targetId);
    });
  };

  const isHeadingInActiveRegion = (heading) => {
    const targetBounds = heading.getBoundingClientRect();
    const activeRegionBottom = window.innerHeight * 0.35;

    return targetBounds.bottom > 96 && targetBounds.top < activeRegionBottom;
  };

  const findFragmentTarget = (fragmentTargetId) => {
    const exactTarget = contentsTargets.find(
      ({ heading }) => heading.id === fragmentTargetId,
    );

    if (exactTarget) {
      return exactTarget;
    }

    const fragmentElement = document.getElementById(fragmentTargetId);

    if (!fragmentElement) {
      return;
    }

    // A heading hidden from the contents belongs to the closest tracked
    // heading before it.
    return contentsTargets.findLast(({ heading }) =>
      Boolean(
        heading.compareDocumentPosition(fragmentElement) &
        Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    );
  };

  const findVisibleFragmentTarget = () => {
    const fragmentTargetId = window.location.hash.slice(1);
    const fragmentTarget = findFragmentTarget(fragmentTargetId);
    const fragmentElement = document.getElementById(fragmentTargetId);

    if (!fragmentTarget || !fragmentElement) {
      return;
    }

    return isHeadingInActiveRegion(fragmentElement) ?
        fragmentTarget.heading
      : undefined;
  };

  const handleScrollEnd = () => {
    pendingTargetId = "";

    const activeFragmentTarget = findVisibleFragmentTarget();

    if (activeFragmentTarget) {
      highlightTarget(activeFragmentTarget.id);
    }
  };

  contentsLinks.forEach(highlightClickedTarget);

  if ("onscrollend" in window) {
    document.addEventListener("scrollend", handleScrollEnd);
  } else {
    // No scrollend here: 150ms without scroll events counts as the end.
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

  const initialTarget = findFragmentTarget(window.location.hash.slice(1));

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
          (firstHeading, secondHeading) => {
            return (
              firstHeading.getBoundingClientRect().top -
              secondHeading.getBoundingClientRect().top
            );
          },
        );
        const pendingTarget = contentsTargets.find(
          ({ heading }) => heading.id === pendingTargetId,
        );
        const activeFragmentTarget = findVisibleFragmentTarget();
        const activeHeading =
          pendingTarget?.heading || activeFragmentTarget || visibleHeadings[0];

        if (activeHeading) {
          highlightTarget(activeHeading.id);
        }
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );

    contentsTargets.forEach(({ heading }) => sectionObserver.observe(heading));
  }
})();
