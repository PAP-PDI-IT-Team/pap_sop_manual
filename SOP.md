# SOP: Maintaining the IT SOP Manual

Status: Draft — requires IT team approval before adoption.

Process owner and approver: To be assigned.

## Purpose and scope

Define a proposed workflow for creating, reviewing, updating, and retiring the manual's procedures and project scope references. This document governs documentation changes; individual operating procedures belong in `docs/` using the SOP template.

## Responsibilities

- Contributors and interns draft content and implement assigned changes.
- The assigned IT mentor or maintainer reviews structure, clarity, and site behavior.
- The designated process owner checks operational accuracy and department handoffs.
- The designated approver authorizes adoption of an operating procedure.

## Procedure

1. Create an issue stating the need, audience, included work, exclusions, and acceptance criteria.
2. Identify the process owner and affected departments. Confirm scope with the assigned mentor before drafting.
3. Copy `docs/sop-template.md` for a new procedure. Keep status as Draft and document responsibilities, steps, handoffs, evidence, exceptions, and completion criteria.
4. Update corresponding HTML summaries and navigation when applicable. Use sanitized examples.
5. Check links, content consistency, keyboard navigation, small-screen layout, and relevant browser errors.
6. Open a pull request with a summary and validation evidence. Request technical review and process-owner review.
7. Resolve feedback. Keep draft status until the designated approver's decision is recorded. For approved content, record version, effective date, approval reference, and next review date.
8. Have the authorized maintainer merge according to the repository's agreed rules. Record the change in CHANGELOG.md and notify affected teams through approved channels when assigned to do so.
9. Review content on the owner-agreed schedule or when a process changes. Clearly mark superseded procedures and link to replacements.

## Exceptions and completion

If ownership, scope, or approval is unclear, keep the content as Draft and refer the issue to the assigned mentor. A procedure is ready for operational reference only when approval and required metadata are recorded and the published summary matches the approved source.
