const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
  const navigationToggle = siteHeader.querySelector(
    '[aria-controls="navigation-sheet"]',
  );
  const navigationSheet = siteHeader.querySelector("#navigation-sheet");
  const navigationCloseButton = siteHeader.querySelector(
    "[data-navigation-close]",
  );

  if (
    navigationToggle instanceof HTMLButtonElement &&
    navigationSheet instanceof HTMLDialogElement &&
    navigationCloseButton instanceof HTMLButtonElement &&
    window.siteScripts &&
    typeof window.siteScripts.initializeMobileNavigation === "function"
  ) {
    window.siteScripts.initializeMobileNavigation(
      navigationToggle,
      navigationSheet,
      navigationCloseButton,
    );
  }
}
