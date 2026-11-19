# Changelog

Record meaningful changes here. Date released versions when they are approved.

## [1.0.5]

### Updated

- Confirm 2 processes documented with upper management
- Added the new changes to flow on JO lifecycle

## [1.0.4]

- Edited static.yml for auto deploy, fixes removed css styles build

## [1.0.3]

### Added

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
