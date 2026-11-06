"use strict";

// Shared behavior for every page. Keep page-specific features in that page's assets.
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
