// Builds the "On this page" lists from the page's section headings and
// highlights the section being read.
const contentsContainers = document.querySelectorAll("[data-toc]");
const contentsTargets = [];

document.querySelectorAll("main h2").forEach((heading) => {
  if (heading.closest("aside")) {
    return;
  }

  const target = heading.closest("[id]:not(#main, body)");

  if (target) {
    contentsTargets.push({
      target,
      label: (heading.textContent || "").trim(),
    });
  }
});

if (contentsContainers.length > 0 && contentsTargets.length > 0) {
  const baseClass =
    "block border-l-2 py-1.5 pl-3 text-sm transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";
  const idleClasses = ["border-transparent", "text-slate-600"];
  const activeClasses = ["border-blue-600", "font-semibold", "text-blue-700"];
  const contentsLinks = [];

  contentsContainers.forEach((container) => {
    const listElement = document.createElement("ul");

    contentsTargets.forEach(({ target, label }) => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");

      anchor.href = `#${target.id}`;
      anchor.textContent = label;
      anchor.className = baseClass;
      anchor.classList.add(...idleClasses);
      contentsLinks.push({ anchor, targetId: target.id });
      listItem.append(anchor);
      listElement.append(listItem);
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

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            highlightTarget(entry.target.id);
          }
        });
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );

    contentsTargets.forEach(({ target }) => sectionObserver.observe(target));
  }
}
