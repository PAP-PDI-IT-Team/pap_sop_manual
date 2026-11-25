# Changelog

Record meaningful changes here. Date released versions when they are approved.

## [1.0.7] - 2026-11-25

### Fixed

- Use the GitHub Pages upload and deployment action versions documented for a single-job workflow.

## [1.0.6]

### Updated

- Added stable numbered glossary anchors and superscript links on manual pages.
- Synced the Markdown and rendered glossaries to the supplied term list, retaining IT as #4 for existing references and keeping numbered entries in order.
- Kept the Glossary table of contents synchronized with search and category filters.
- Kept a clicked table-of-contents target active while smooth scrolling settles, preventing active-link flicker.
- Matched the Glossary page to the shared documentation layout and added Glossary links beside Home in inner-page headers.
- Added a responsive glossary with search and category filters.
- Centered the IT SOP Manual footer branding above the copyright notice and removed footer navigation links.
- Added a shared search dialog with page and heading results and Ctrl/Cmd+K support across the homepage and documentation pages.
- Rebuilt the mobile navigation as a left slide-in drawer with grouped sections, an active-page highlight, and "Soon" badges for pages not yet available.
- Added a desktop documentation layout to the Manual Contents and Content Template Sample pages: a left sidebar with grouped page links and an "On this page" list that highlights the section being read.
- Built the sidebar and the mobile drawer from one shared list in `shared/scripts/site-nav.js`, so a new page is added in one place.
- Show the mobile menu button and drawer below the large breakpoint, where the sidebar takes over.
- Added the mobile navigation to the Content Template Sample page.
- Moved the drawer slide, backdrop fade, and section scroll offset into Tailwind classes.

## [1.0.5]

## [1.0.6]

### Updated

- Added stable numbered glossary anchors and superscript links on manual pages.
- Synced the Markdown and rendered glossaries to the supplied term list, retaining IT as #4 for existing references and keeping numbered entries in order.
- Kept the Glossary table of contents synchronized with search and category filters.
- Kept a clicked table-of-contents target active while smooth scrolling settles, preventing active-link flicker.
- Matched the Glossary page to the shared documentation layout and added Glossary links beside Home in inner-page headers.
- Added a responsive glossary with search and category filters.
- Centered the IT SOP Manual footer branding above the copyright notice and removed footer navigation links.
- Added a shared search dialog with page and heading results and Ctrl/Cmd+K support across the homepage and documentation pages.
- Rebuilt the mobile navigation as a left slide-in drawer with grouped sections, an active-page highlight, and "Soon" badges for pages not yet available.
- Added a desktop documentation layout to the Manual Contents and Content Template Sample pages: a left sidebar with grouped page links and an "On this page" list that highlights the section being read.
- Built the sidebar and the mobile drawer from one shared list in `shared/scripts/site-nav.js`, so a new page is added in one place.
- Show the mobile menu button and drawer below the large breakpoint, where the sidebar takes over.
- Added the mobile navigation to the Content Template Sample page.
- Moved the drawer slide, backdrop fade, and section scroll offset into Tailwind classes.

## [1.0.5]

### Updated

- Confirm 2 processes documented with upper management
- Added the new changes to flow on JO lifecycle

## [1.0.4]

- Edited static.yml for auto deploy, fixes removed css styles build

## [1.0.3]

- Added the IT SOP Manual landing page with a skip link, hero, three resource cards, and Contributors section.
- Added shared header and footer navigation, including a mobile menu, with links to the page sections.
- Added a mobile-first layout with stacked buttons, larger tap targets, and full-width footer links.
- Updated color tokens to a blue and cyan palette with brand tokens for light and dark themes.
- Switched page icons from inline SVGs to the Boxicons library.
- Added an HTML manual contents page with procedure summaries, source links, and visible draft statuses.
- Added forward lift, blue-to-cyan gradient hover states, and icon motion to feature and contributor cards.
- Animated the mobile navigation sheet and staggered its links, with reduced-motion support and Escape-key focus restoration.
- Added shared hover, keyboard focus, and reduced-motion styles for links and buttons.
- Reduced footer padding for a more compact footer.
- Started tracking the generated stylesheet in git so the site renders without a local build.
- Updated the design system documentation to match the new tokens, navigation, and interactions.
- Replaced the local Tailwind build with the CDN browser build and removed the generated CSS files.
- Organized shared component setup and scripts under `shared/`.
- Added a floating mobile menu and sticky desktop header navigation.
- Moved design-system documentation into `docs/design/`.

## [1.0.2]

- Centralized documentation navigation and numbered jargon definitions, simplified the structure reference, and recorded documentation rules with top-to-bottom Mermaid guidance.
- Job Order discovery records organized into process references and supporting discovery records, with documentation navigation and developer and QA onboarding links.
- Initial HTML, CSS, and JavaScript scaffold with Home, Process Library, and About pages.
- Shared assets and About-page asset folders.
- README, Code of Conduct, structure sample, security policy, and pending license notice.
- Pull request and issue templates for repository collaboration.
- Draft documentation lifecycle SOP, contributor onboarding, AC Local deployment example, and reusable SOP template.

## [1.0.1]

- Introduced centralized design tokens for colors, typography, borders, and surfaces.
- Added light and dark theme variables.
- Added reusable button, badge, card, and link styles.
- Added Tailwind CSS v4 build configuration.
- Standardized typography and component styling.
- Improved the maintainability of shared design resources.

## [1.0.0]

- Added Pull Request checks for changelog versions and site conventions.
- Grouped related PR checks to share setup and limited the Pages artifact to site files.
