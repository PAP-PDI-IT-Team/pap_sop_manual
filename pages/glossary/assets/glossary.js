(() => {
  const glossarySearch = document.getElementById("glossary-search");
  const categoryButtons = Array.from(
    document.querySelectorAll("[data-category-filter]"),
  );
  const glossaryEntries = Array.from(
    document.querySelectorAll("[data-glossary-entry]"),
  );
  const categorySections = Array.from(
    document.querySelectorAll("[data-glossary-category-section]"),
  );
  const resultsMessage = document.getElementById("glossary-results");
  const emptyMessage = document.getElementById("glossary-empty");

  if (
    !(glossarySearch instanceof HTMLInputElement) ||
    !(resultsMessage instanceof HTMLParagraphElement) ||
    !(emptyMessage instanceof HTMLParagraphElement) ||
    categoryButtons.length === 0 ||
    glossaryEntries.length === 0 ||
    categorySections.length === 0
  ) {
    throw new Error("Glossary search controls or entries are missing.");
  }

  const filterGlossaryEntries = () => {
    const activeCategoryButton = categoryButtons.find(
      (categoryButton) =>
        categoryButton.getAttribute("aria-pressed") === "true",
    );

    if (!activeCategoryButton) {
      throw new Error("No glossary category filter is selected.");
    }

    const selectedCategory = activeCategoryButton.dataset.categoryFilter;

    if (!selectedCategory) {
      throw new Error("The selected glossary category filter has no category.");
    }

    const searchTerm = glossarySearch.value.trim().toLocaleLowerCase();
    let visibleEntryCount = 0;

    glossaryEntries.forEach((glossaryEntry) => {
      const matchesCategory =
        selectedCategory === "all" ||
        glossaryEntry.dataset.glossaryCategory === selectedCategory;
      const matchesSearch = glossaryEntry.textContent
        .toLocaleLowerCase()
        .includes(searchTerm);

      glossaryEntry.hidden = !(matchesCategory && matchesSearch);

      if (!glossaryEntry.hidden) {
        visibleEntryCount += 1;
      }
    });

    categorySections.forEach((categorySection) => {
      const sectionHasVisibleEntries = Array.from(
        categorySection.querySelectorAll("[data-glossary-entry]"),
      ).some((glossaryEntry) => !glossaryEntry.hidden);

      categorySection.hidden = !sectionHasVisibleEntries;
    });

    const termLabel = visibleEntryCount === 1 ? "term" : "terms";
    resultsMessage.textContent = `Showing ${visibleEntryCount} ${termLabel}`;
    emptyMessage.hidden = visibleEntryCount > 0;
  };

  const selectCategoryFilter = (selectedButton) => {
    categoryButtons.forEach((categoryButton) => {
      const isSelected = categoryButton === selectedButton;

      categoryButton.setAttribute("aria-pressed", String(isSelected));
      categoryButton.classList.toggle("border-blue-700", isSelected);
      categoryButton.classList.toggle("bg-blue-700", isSelected);
      categoryButton.classList.toggle("text-white", isSelected);
      categoryButton.classList.toggle("border-slate-300", !isSelected);
      categoryButton.classList.toggle("bg-white", !isSelected);
      categoryButton.classList.toggle("text-slate-700", !isSelected);
    });

    filterGlossaryEntries();
  };

  glossarySearch.addEventListener("input", filterGlossaryEntries);
  categoryButtons.forEach((categoryButton) => {
    categoryButton.addEventListener("click", () => {
      selectCategoryFilter(categoryButton);
    });
  });

  filterGlossaryEntries();
})();
