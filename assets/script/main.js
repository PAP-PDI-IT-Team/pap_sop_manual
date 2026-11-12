// Shared behavior for every page.

// Placeholder links and forms should not navigate or reload the page.
const placeholderLinks = document.querySelectorAll("a[data-placeholder]");

placeholderLinks.forEach((linkElement) => {
  linkElement.addEventListener("click", (clickEvent) => {
    clickEvent.preventDefault();
  });
});

const placeholderForms = document.querySelectorAll("form[data-placeholder]");

placeholderForms.forEach((formElement) => {
  formElement.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();
  });
});

// Mobile navigation menu.
const siteHeader = document.querySelector(".site-header");
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector("#primary-navigation");

if (siteHeader && mobileNavToggle && primaryNav) {
  const setMenuOpen = (isOpen) => {
    siteHeader.classList.toggle("mobile-nav-open", isOpen);
    mobileNavToggle.setAttribute("aria-expanded", String(isOpen));
    mobileNavToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  };

  mobileNavToggle.addEventListener("click", () => {
    const isOpen = mobileNavToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !siteHeader.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      siteHeader.classList.contains("mobile-nav-open")
    ) {
      setMenuOpen(false);
      mobileNavToggle.focus();
    }
  });

  window
    .matchMedia("(max-width: 40rem)")
    .addEventListener("change", (event) => {
      if (!event.matches) {
        setMenuOpen(false);
      }
    });

  siteHeader.classList.add("mobile-nav-ready");
}

// Keep the footer year current.
const yearElement = document.getElementById("footer-year");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}