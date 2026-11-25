# Design System

The landing page uses Tailwind CSS utilities from the Tailwind browser CDN and
Boxicons from its CDN. The site does not keep a generated CSS bundle or custom
stylesheet. This keeps the current scaffold simple while it uses standard
utilities and does not need to work offline.

## Guidelines

- Use Tailwind utility classes directly in markup for layout, spacing, colors,
  typography, and responsive behavior.
- Keep shared component setup in `shared/components/` and reusable behavior in
  `shared/scripts/`. Each page should load only the files it needs.
- Keep page-specific scripts and styles beside that page under
  `pages/<name>/assets/`.
- Avoid adding a custom CSS file until a design need cannot be met clearly with
  existing utilities.
- Use semantic headings, landmarks, and buttons. Keep keyboard focus visible
  and give icon-only controls accessible names.
- Use the native `<dialog>` element for modal navigation and keep its control
  button's `aria-expanded` state synchronized.
- Keep the About cards at a consistent minimum height. Use restrained hover
  states across content cards and reduced-motion-aware card and mobile-menu
  animations.
- Keep active documentation navigation and important links in the established
  blue and cyan palette.
- Keep manual-page copy and previous/next controls compact, keyboard
  accessible, and aligned with the page title.
- Keep the left navigation focused on the manual's top-level pages. Keep the
  dynamic page TOC on the right for detailed, page-specific heading links.

## External resources

| Resource                   | URL                                                     | Purpose                                      |
| -------------------------- | ------------------------------------------------------- | -------------------------------------------- |
| Tailwind CSS browser build | `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`   | Generates utilities from classes in the page |
| Boxicons                   | `https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css` | Icon font used by the landing page           |

These resources require an internet connection. If offline support becomes a
requirement, revisit the delivery approach and document the added local assets.
