window.siteScripts = window.siteScripts || {};
// The header component calls this after locating its navigation controls.
window.siteScripts.initializeMobileNavigation = (
  navigationToggle,
  navigationSheet,
  navigationCloseButton,
) => {
  if (
    !(navigationToggle instanceof HTMLButtonElement) ||
    !(navigationSheet instanceof HTMLDialogElement) ||
    !(navigationCloseButton instanceof HTMLButtonElement)
  ) {
    return;
  }

  let closeTimer;
  let restoreToggleFocus = false;
  const closeNavigationSheet = () => {
    if (!navigationSheet.open || closeTimer) {
      return;
    }

    navigationToggle.setAttribute("aria-expanded", "false");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      navigationSheet.close();
      return;
    }

    navigationSheet.classList.add("is-closing");
    closeTimer = window.setTimeout(() => {
      navigationSheet.close();
      navigationSheet.classList.remove("is-closing");
      closeTimer = undefined;
    }, 220);
  };

  navigationToggle.addEventListener("click", () => {
    navigationSheet.showModal();
    navigationToggle.setAttribute("aria-expanded", "true");
  });

  navigationCloseButton.addEventListener("click", () => {
    closeNavigationSheet();
  });

  navigationSheet.addEventListener("click", (event) => {
    if (event.target === navigationSheet) {
      closeNavigationSheet();
    }

    if (event.target instanceof Element && event.target.closest("a")) {
      closeNavigationSheet();
    }
  });

  navigationSheet.addEventListener("close", () => {
    navigationToggle.setAttribute("aria-expanded", "false");

    if (restoreToggleFocus) {
      navigationToggle.focus();
      restoreToggleFocus = false;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigationSheet.open) {
      event.preventDefault();
      restoreToggleFocus = true;
      closeNavigationSheet();
    }
  });
};
