# Job Order Implementation Workflow

This sequence describes feature/change delivery for a [JO [1]](../glossary.md#1-jo). System-specific details and other request types still need confirmation.

## Workflow

```mermaid
flowchart TD
    A["JO received"] --> B["Huddle meeting - Alignment"]
    B--> C["Branch from dev; implement fix"]
    C --> D["PR and merge back to dev; deploy staging"]
    D --> E["Manual QA on staging"]
    E -->|Found an Issue| C
    E -->|Pass| F["Branch from main; copy tested lines from dev"]
    F --> G["PR from pre-release into preprod"]
    G --> H["Request huddle meeting"]
    H --> I{"ASD UAT / demonstration huddle meeting"}
    I -->|Found an issue| J["Findings report returned to development"]
    J --> C
    J -->|Pass| K["PR to main / live"]
    K --> L["Authorized approval and senior merge; auto-deploy"]
    L --> M["Live checks by QA and ASD"]
    M -->|Found an Issue| C
    M -->|Pass| CLOSE["JO closing (criteria unverified)"]
```

## Delivery steps

| Step | What happens                                                                                                               |
| ---- | -------------------------------------------------------------------------------------------------------------------------- |
| A    | JO enters [ITD [3]](../glossary.md#3-itd) delivery path                                                                    |
| B    | [Huddle Meeting [21]](../glossary.md#21-huddle) - **IT & ASD** Alignment meeting with the scope of the job request         |
| C    | Developer **branches** from dev and implements the fix                                                                     |
| D    | PR merged back into [Dev [17]](../glossary.md#17-dev); [staging [18]](../glossary.md#18-staging) deployed                  |
| E    | [QA [12]](../glossary.md#12-qa) member performs manual QA; issues return to development                                    |
| F    | [Pre-release [20]](../glossary.md#20-pre-release) branch created from main; selected tested lines manually copied from dev |
| G    | [PR [14]](../glossary.md#14-pr) to [preprod [19]](../glossary.md#19-preprod) branch, preprod deployment                    |
| H    | Huddle Meeting requested                                                                                                   |
| I    | [ASD [6]](../glossary.md#6-asd) evaluates expected behavior and tests demo                                                 |
| J    | Failed evaluation produces findings and rework; loop to B                                                                  |
| K    | Accepted changes proceed via PR to main                                                                                    |
| L    | PR approved by authorized person, merged by senior; deployment automated                                                   |
| M    | QA member and ASD check production; issues return to development                                                           |

## Delivery responsibilities

| Role                                                 | Involvement                                                                               |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [IT [4]](../glossary.md#4-it) developer              | Implements JO changes in a fix branch; opens a PR back to dev                             |
| [QA [12]](../glossary.md#12-qa) member               | Performs manual [staging [18]](../glossary.md#18-staging) QA; participates in live checks |
| [ASD [6]](../glossary.md#6-asd) evaluators / testers | Attend demonstrations, evaluate changes, retest, participate in production validation     |
| Authorized [PR [14]](../glossary.md#14-pr) approver  | Approves production-targeting PR (REPORTED, role title not verified)                      |
| Senior developer / merge owner                       | Performs merge leading to live deployment (REPORTED)                                      |

These are reported responsibilities, not an approved responsibility or escalation matrix.

## Other request types

The delivery path for client extraction, [purging [11]](../glossary.md#11-purging), [renorming [9]](../glossary.md#9-renorming), and [decommissioning [10]](../glossary.md#10-decommissioning) still needs confirmation.

## Details to verify

Confirm system applicability, formal responsibilities, and closure criteria before relying on this reported sequence.
