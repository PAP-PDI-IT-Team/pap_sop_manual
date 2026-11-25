(() => {
  const copyButton = document.querySelector("[data-copy-page]");
  const copyStatus = document.querySelector("[data-copy-status]");

  if (
    !(copyButton instanceof HTMLButtonElement) ||
    !(copyStatus instanceof HTMLElement)
  ) {
    return;
  }

  copyButton.addEventListener("click", async () => {
    if (
      !navigator.clipboard ||
      typeof navigator.clipboard.writeText !== "function"
    ) {
      copyStatus.textContent = "Copying is not supported in this browser.";
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      copyStatus.textContent = "Page link copied.";
    } catch (error) {
      console.error("Could not copy the documentation page URL.", error);
      copyStatus.textContent =
        "Could not copy the page link. Copy it from the address bar instead.";
    }
  });
})();
