# Structure Sample

```text
it_sop_manual/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── documentation_request.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
├── assets/
│   ├── styles/
│   │   └── main.css
│   └── script/
│       └── main.js
├── docs/
│   ├── README.md
│   ├── ac-local-deployment.md
│   ├── onboarding.md
│   └── sop-template.md
├── pages/
│   ├── about/
│   │   ├── assets/
│   │   │   ├── styles/
│   │   │   │   └── about.css
│   │   │   └── script/
│   │   │       └── about.js
│   │   └── index.html
│   └── index.html
├── .gitignore
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── index.html
├── LICENSE.md
├── README.md
├── SECURITY.md
├── SOP.md
└── STRUCTURE_SAMPLE.md
```

## Conventions

- Use lowercase, hyphen-separated names for new page folders and asset files.
- Use `index.html` as each page folder's entry point.
- Put reusable styles and scripts in the root `assets/` folders.
- Keep page-specific styles and scripts under that page's `assets/` folder.
- Use relative paths so the site can run from a local folder or a hosted subfolder.
- Keep editable procedure sources and supporting references in `docs/`.
- Treat `.github/` as repository collaboration configuration. GitHub recognizes these template locations when the repository is hosted there.

For another page, copy the About page layout, update the relative asset paths and page title, and add navigation where appropriate.
