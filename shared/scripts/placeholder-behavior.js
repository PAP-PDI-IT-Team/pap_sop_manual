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
