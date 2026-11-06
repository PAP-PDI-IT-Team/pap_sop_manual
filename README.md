# IT SOP Manual

A simple alignment site for IT standard operating procedures, project scope, and collaboration with other departments. This IT initiative also serves as a project for Senior High School interns from Rizal High.

## Purpose

- Provide a shared reference for IT and requesting departments.
- Document project scope, handoffs, and approval points.
- Support onboarding and knowledge transfer within the IT team.
- Introduce interns to maintainable HTML, CSS, JavaScript, and reviewed contributions.

## Technology and local setup

The site uses plain HTML, CSS, and JavaScript. No installation or build step is required.

1. Download or clone the project.
2. Open `index.html` in a browser.
3. Navigate to Process Library and About to check the starter pages.

An editor's local preview server is optional. Markdown links may display as text or download depending on the browser/server; HTML pages are the site interface.

## Project structure

See [STRUCTURE_SAMPLE.md](STRUCTURE_SAMPLE.md) for the full layout and naming conventions. Shared assets live under `assets/`; each feature page can keep its own assets beside its HTML file.

## Contributing

1. Read the [Code of Conduct](CODE_OF_CONDUCT.md), [SOP](SOP.md), and [onboarding checklist](docs/onboarding.md).
2. Create an issue describing the intended change and acceptance criteria. Use a private approved channel for sensitive details.
3. Create a focused branch, such as `docs/deployment-scope` or `feat/process-library`.
4. Update the relevant files and [changelog](CHANGELOG.md).
5. Check navigation, relative links, keyboard access, and small-screen layout in a browser. Check the browser console for errors.
6. Open a pull request using the supplied template and request review from the assigned IT mentor or maintainer.

Process owners must approve operational content. Interns should use sanitized examples and must not publish credentials, personal data, or internal production details.

## Documentation

- [Documentation index](docs/README.md)
- [Draft AC Local workflow](docs/ac-local-deployment.md)
- [Reusable procedure template](docs/sop-template.md)
- [Security policy](SECURITY.md)
- [License status](LICENSE.md)

## Current status

Initial scaffold; all workflow examples are drafts. Before adopting this manual, the IT team must assign maintainers, process owners, approvers, a private reporting contact, and a license. Hosting, authentication, search, and document approval automation are outside this initial setup. Any hosting decision must account for the sensitivity of future content.
