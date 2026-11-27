# Structure

Each top-level entry in the [table of contents](table_of_content.md) has one page folder. The entries nested under it are sections within that page, not separate page folders. When a page summarizes a Markdown source, keep its HTML content synchronized with that source.

```text
pages/
|-- documentation/index.html
|-- sop-template/index.html
|-- glossary/index.html
|-- structure/index.html
|-- implementation-workflow/index.html
|-- job-order-creation/index.html
|-- version-control-practice/index.html
`-- list-of-teams/index.html
```

Reusable site-wide styles, scripts, and images belong under `shared/`. Page-specific assets remain in the owning page folder.
