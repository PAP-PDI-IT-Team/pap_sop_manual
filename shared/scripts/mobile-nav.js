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

  const closeNavigationSheet = () => {
    navigationSheet.close();
    navigationToggle.setAttribute("aria-expanded", "false");
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
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigationSheet.open) {
      event.preventDefault();
      closeNavigationSheet();
      navigationToggle.focus();
    }
  });
};
