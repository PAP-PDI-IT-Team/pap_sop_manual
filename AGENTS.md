# AGENTS.md instructions

Do not assume scope, confirmations, or intent from context unless explicitly verified in the repository or stated by the user.

Do not agree or affirm correctness without checking the relevant files first.

Keep responses direct, factual, and based on verified repository state.

## Scope

Apply these instructions everywhere

## Human Priority

- Human intent and decisions take precedence over AI suggestions.
- Follow the process: Plan > Execute > Feedback > Revise.
- Do not make workspace-level architecture or naming changes without explicit user approval.

## Repository Structure and Local Development

- This is a static, zero-build documentation site using HTML, Tailwind CSS, and browser JavaScript. Do not introduce a framework, bundler, package requirement, or build step without explicit approval.
- The root `index.html` owns the home-page shell. Its page-specific assets live under `assets/`.
- Reusable site-wide styles, scripts, data, and images belong under `shared/`.
- Documentation meaning lives under `docs/` as Markdown. The site does not parse Markdown at runtime, so synchronize each changed Markdown source deliberately with its rendered page content.
- `shared\scripts\on-this-page.js`owns shared inner-page navigation behavior.
- `design-system.md` is the source of truth for visual tokens and design decisions. Cross-reference it before changing colors, spacing, radii, or typography.

## Coding Principles

- Use clear spacing between functions, classes, and logical sections.
- Use explicit, multi-word, intention-revealing names. Do not use single-letter or overly generic identifiers.
- Follow separation of concerns and give each function a single responsibility.
- Keep JavaScript at one level of abstraction per function or module.
- Keep HTML, CSS, and JavaScript in separate files. Do not add inline `<script>` or `<style>` elements.
- Use focused JavaScript and CSS files. Preserve existing aggregators and load order where applicable.
- Keep CSS modular. Prefer nested CSS when supported by a preprocessor; otherwise use clear section grouping.
- Use explicit JavaScript getters and setters where appropriate.
- Do not introduce implicit global state or hidden side effects.
- Only add `TODO` comments or explicit HTML section/component markers. Do not add other comments.
- Follow the established JavaScript IIFE pattern and expose only an explicitly scoped global namespace when a page or shared module requires one.
- Name global namespaces by scope, functions with intention-revealing verb-first names, variables in `camelCase`, classes in `PascalCase`, and constants in `SNAKE_UPPER_CASE`.
- Build DOM nodes with safe browser APIs and assign plain text with `textContent`. Use HTML strings only when the markup is necessary and the content is explicitly trusted.
- Missing required dependencies or data must produce an explicit error. Do not add silent returns, hidden defaults, compatibility paths, or legacy fallbacks to suppress failures.
- Prefer Tailwind utilities already used by the page. Add custom CSS only for presentation that is not cleanly represented by the existing utilities or shared components.

## Verification Checklist

- Verify changed pages render locally through a static file server.
- Confirm changed shared assets and every applicable page reference remain synchronized.
- Update relevant `docs/*.md` files when behavior changes.
- Ensure images have alternative text and form controls have labels.
- Verify keyboard access, focus behavior, and relevant ARIA state for drawers, dialogs, navigation, and interactive controls.
- Run a quick lint or format pass on changed CSS and JavaScript.
- Do not remove or skip a verification step without discussing it with the user and receiving approval.

## Change Records

- Treat every pull request merged into `main` as a release. This repository does not use an `Unreleased` changelog section.
- One new pull request creates exactly one new semantic version and dated changelog section. Additional changes in the same pull request update that section without creating another version.
- Every notable human or AI-assisted change must appear under that pull request's version and date before merge.
- When the pull request boundary is not reliably detectable, append a verified `PR #number` to the version heading. If no PR number exists, use the first commit SHA that actually belongs to the PR.

## Branch, Commit, and Review Rules

- Do not commit contribution work directly to `main`. Use one dedicated `<label>/<intent-summary>` branch per pull request.
- Branch labels are limited to `feat` for new work and `fix` for changes, repairs, corrections, or alterations to existing work.
- Write the branch intent summary in lowercase kebab-case with no more than five hyphen-separated words.
- Commit labels are limited to `feat`, `fix`, or `docs`.
- Use `docs` for any commit that changes a Markdown (`.md`) file, including additions, corrections, and removals.
- Use `feat` for a new non-Markdown capability. Use `fix` for every other non-Markdown change, repair, alteration, refactor, maintenance task, or security correction.
- When one logical commit changes Markdown and non-Markdown files, use `docs`. Split it only when the changes are genuinely independent responsibilities.
- Format commits as `<label>(<optional-scope>): <imperative summary>`. Keep summaries concise, specific, lowercase after the colon, and without a trailing period.
- One branch maps to one pull request and one changelog version. Additional commits in the same pull request do not create another version.
- Every pull request targeting `main` requires approval from at least one reviewer other than the author.
- Do not merge while requested changes or review conversations remain unresolved.
- Do not state that a pull request is ready to merge until the peer approval and applicable verification are confirmed.

## Instruction Maintenance

- Use targeted file globs for project instructions. Do not use `applyTo: "**"`.
- Do not place secrets or long-running scripts in project instructions.
- Check the project README or internal team documentation for the repository owner or maintainer.
