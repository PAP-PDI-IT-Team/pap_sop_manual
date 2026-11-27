(() => {
  const backToTopLink = document.querySelector("[data-back-to-top]");

  if (!(backToTopLink instanceof HTMLAnchorElement)) {
    throw new Error("The Back to top link is missing.");
  }

  const updateBackToTopVisibility = () => {
    backToTopLink.hidden = window.scrollY < 320;
  };

  window.addEventListener("scroll", updateBackToTopVisibility, {
    passive: true,
  });
  updateBackToTopVisibility();
})();
