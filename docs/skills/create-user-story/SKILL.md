---
name: create-user-story
description: Create or update FFBC business-analysis User Story sections in Obsidian Markdown. Use when Codex is asked to write a User Story for a given filepath and story name in the FFBC docs, especially under `docs/бизнес анализ/*.md`; the skill instructions are in English, but generated story content must be in Russian.
---

# Create User Story

## Overview

Use this skill to write a page-local User Story in the FFBC documentation style. The user should provide two inputs: `filepath` and `storyname`.

The skill workflow is written in English. The User Story output itself must be written in Russian, in a concise formal business style.

## Required Inputs

- `filepath`: path to the target Markdown file, usually relative to the current repository or docs root.
- `storyname`: exact Russian section title to create or update.

If either input is missing, ask for the missing value before editing.

## Workflow

1. Read `agent_docs/basic-info.md` before reading or editing the target file.
2. Read `filepath` and identify the local context around `storyname`.
3. Use `Добавление\изменение УСП` from `бизнес анализ/Услуга создания.md` as the primary structure reference for new or refactored stories.
4. If the story already exists, preserve its intent and improve it only as needed.
5. If the story does not exist, add a new `## {storyname}` section in the most appropriate local User Story area.
6. Write the story in Russian, using the structure below.
7. Keep existing page terminology and Obsidian links. Add glossary links only when the target page pattern already makes the required term clear.
8. Do not rewrite unrelated sections.

## Story Structure

Follow the pattern from the `Добавление\изменение УСП` story:

```md
## {storyname}

**Роль:** [user role].

**Цель:** [business goal].

**Предусловие:** [state before the scenario starts].

**Основной сценарий:**

1. [Actor action].
2. [Actor action].
3. [Actor action].
    1. `Alt.` [Alternative scenario name]
    2. `Alt.` [Validation or optional-flow branch]
4. [Actor action].
5. [System response].

**[Alternative scenario name]:**
3. [Alternative step].
4. [Alternative step].
    1. `Alt.` [Nested alternative scenario name]
5. Возврат к пункту N **основного сценария**.

**[Nested alternative scenario name]:**
4. [Nested alternative step].
5. Возврат к пункту N **текущего сценария**.

**Результат:** [observable final business state].
```

## Writing Rules

- Use Russian for story content.
- Use formal business wording.
- Wrap entity names in backticks, for example `` `Услуга` `` and `` `Модификатор услуги` ``.
- End every sentence and scenario step with a period.
- Keep scenario steps short and observable.
- Separate actor actions from system responses where possible, but allow consecutive actor actions for form-filling flows.
- Use alternatives for validation failures, optional steps, or creation flows that branch from a normal step.
- Reference alternative scenarios from the main scenario as nested numbered items using the page-local style, for example ``1. `Alt.` Входные характеристики не выбраны``.
- Define each alternative after the main scenario with a bold heading: `**Входные характеристики не выбраны:**`.
- Number an alternative from the same step number where the branch starts when that matches the surrounding page.
- End alternatives with a return point when the flow rejoins the main scenario.
- Use `Возврат к пункту N **основного сценария**.` when returning from an alternative to the main flow.
- Use `Возврат к пункту N **текущего сценария**.` when returning from a nested alternative to its parent alternative.
- Use the same numbering style as the surrounding page.
- Do not add implementation details, UI component names, API names, or database details unless the source page already treats them as business terms.

## Output Contract

After editing, report the changed file and the story section name. Mention if the story could not be written because the source context was insufficient.
