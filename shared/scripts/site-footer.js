// Keep the footer year current.
const yearElement = document.getElementById("footer-year");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
