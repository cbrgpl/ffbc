---
name: refine-user-story
description: Create or update FFBC business-analysis User Story sections in Obsidian Markdown. Use when Codex is asked to write a User Story for a given filepath and story name in the FFBC docs, especially under `docs/бизнес анализ/*.md`; the skill instructions are in English, but generated story content must be in Russian.
---

# Refine user story

---
name: refine-user-story
description: >
  Creates, reviews, and refines FFBC User Stories using the project's
  standardized business-analysis format. Preserves existing business logic,
  separates business rules from flows and acceptance criteria, and reports
  ambiguities or contradictions without resolving them independently.
---

Use this skill when creating, reviewing, restructuring, or refining User Stories
for the FFBC project.

The purpose of this skill is to transform draft requirements into a consistent,
concise, implementation-independent User Story that can later be used as a
source for UX design, implementation, and testing.

The agent acts as a requirements structuring and review assistant.

The agent MUST preserve the business meaning of the provided requirements.

The agent MAY improve:
- structure;
- wording;
- readability;
- consistency;
- separation of concerns;
- references between flows;
- formulation of acceptance criteria.

The agent MUST NOT independently change product behavior.

---

# Core principles

A User Story should describe the business behavior of the system without
unnecessarily prescribing its UI or technical implementation.

The specification should distinguish between:

1. High-level user intent.
2. Preconditions.
3. Business rules.
4. Main flow.
5. Alternative flows.
6. Acceptance criteria.
7. Unresolved business questions.

Use the following mental model:

High-level overview
→ WHY the user needs the feature

Business rules
→ WHAT must be true

Main flow
→ HOW the normal successful scenario proceeds

Alternative flows
→ HOW meaningful branches of that scenario proceed

Acceptance criteria
→ HOW the expected behavior can be verified

Questions and inconsistencies
→ WHAT still requires a business decision

---

# Required User Story structure

Use the following structure:

## <Feature name>

**Верхнеуровневый обзор:** как <роль> я хочу <цель>, чтобы <бизнес-ценность или ожидаемый результат>

**Роль:** <роль пользователя>.

**Предусловие:** <состояние системы и пользователя до начала сценария>.

**Бизнес-правила:**

- <business rule>
- <business rule>
- ...

**Основной сценарий:**

1. <step>
2. <step>
3. <step>
4. (№<marker>) <step>
   5. `Alt.` <alternative scenario>
6. <step>
7. <step>

Критерии приемки: <criterion>; <criterion>; <criterion>

**<Alternative scenario name>:**

1. <step>
2. <step>
3. Возврат к пункту №<marker> **основного сценария**.

Критерии приемки: <criterion>; <criterion>

### Вопросы и несостыковки

1. <question if necessary>
2. <question if necessary>

Do not add sections that contain no useful information.

---

# High-level overview

The high-level overview describes the user's intent and business value.

Use the following format:

> как <роль> я хочу <действие или результат>, чтобы <ценность>

Example:

> как администратор я хочу создать входную характеристику, чтобы использовать ее при настройке УСП

Keep it short.

The high-level overview should answer:

- Who wants something?
- What do they want?
- Why do they want it?

Do not include:
- UI implementation details;
- validation algorithms;
- API behavior;
- database behavior;
- technical implementation;
- individual flow steps.

---

# Role

Specify the actor performing the scenario.

Use terminology already established in FFBC documentation.

Examples:

- администратор;
- клиент.

Do not introduce a new role unless it is explicitly required by the provided
requirements or existing project documentation.

---

# Preconditions

Describe what must already be true before the scenario starts.

Example:

> администратор открыл интерфейс создания входной характеристики.

Preconditions describe the initial state.

Do not move actions that belong to the actual scenario into the preconditions.

Good:

> администратор открыл интерфейс создания входной характеристики.

Avoid:

> администратор открыл интерфейс и ввел название характеристики.

Entering the name belongs to the scenario itself.

---

# Business rules

Business rules describe constraints, invariants, and product behavior that must
hold regardless of the exact path taken through the flow.

Business rules answer:

> What must be true?

Examples:

- Название обязательно.
- Название не обязательно должно быть уникальным.
- Тип обязателен.
- Тип может быть изменен после создания.
- Привязка к шаблону необязательна.
- Созданные в процессе создания характеристики и неиспользованные шаблоны
  должны быть удалены, если к моменту завершения создания они не используются
  создаваемой характеристикой.

Prefer short declarative statements.

Business rules MUST NOT unnecessarily describe a sequence of user actions.

Do not turn automatic system invariants into artificial user flows when they can
be expressed more clearly as business rules.

---

# Main flow

The main flow describes the primary successful path through the scenario.

It should represent the simplest expected sequence of meaningful user and system
actions.

Conceptually:

user action
→ system response
→ user action
→ result

Keep the happy path linear whenever possible.

Example:

1. Администратор указывает название входной характеристики.
2. Администратор указывает описание при необходимости.
3. Администратор выбирает тип.
4. Администратор при необходимости выбирает шаблон.
5. Администратор подтверждает создание.
6. Система создает входную характеристику.

Do not put complex conditional trees directly into the main flow.

Use alternative scenarios for meaningful branches.

Each step should normally describe an observable user or system action.

Good:

> Администратор выбирает тип входной характеристики.

Good:

> Система создает входную характеристику.

Avoid:

> Администратор не меняет шаблон.

If nothing happens, it usually does not require a separate flow step.

---

# Optional actions

An optional action does NOT automatically require an alternative scenario.

For example:

> Администратор при необходимости выбирает шаблон.

If selecting no template is valid and requires no special behavior, the absence
of a selection does not need its own alternative flow.

Create an alternative scenario only when a branch introduces meaningful
additional behavior.

This keeps the main and alternative flows focused on actual business behavior
rather than every possible absence of an action.

---

# Alternative scenarios

Use alternative scenarios when the main flow branches into another meaningful
sequence of actions.

Reference the alternative scenario directly from the relevant main-flow step.

Example:

1. (№ш) Администратор при необходимости выбирает шаблон.
   2. `Alt.` Новый шаблон

Then describe the scenario separately:

**Новый шаблон:**

1. Администратор инициирует историю создания шаблона.
2. Система автоматически выбирает созданный шаблон в качестве привязываемого.
3. Возврат к пункту №ш **основного сценария**.

Alternative scenarios may invoke another User Story.

If behavior is already described by another User Story, reference it rather than
duplicating the complete scenario.

Example:

> Администратор инициирует историю
> [создание шаблона](<Input Characteristics#Создание\редактирование шаблона входных характеристик>).

After the referenced User Story finishes, explicitly describe what happens in
the current scenario.

---

# Flow markers

When an alternative scenario needs to return to a particular point in another
flow, use stable markers instead of numeric step references.

Format:

> (№<letter>)

Example:

> 4. (№ш) Администратор при необходимости выбирает шаблон.

Then:

> Возврат к пункту №ш **основного сценария**.

Markers exist to create references between flows.

Add a marker ONLY when another flow needs to reference that point.

Do not add markers to every step.

Do not rely on step numbers for cross-flow references because numbers may change
when the User Story is edited.

---

# Automatic system behavior

Distinguish automatic system consequences from user flows.

If behavior happens automatically because a business invariant must be
maintained, prefer:

1. documenting the invariant under **Бизнес-правила**;
2. verifying the outcome under **Критерии приемки**.

Do not create a separate alternative flow unless the automatic behavior itself
contains a meaningful business process that needs to be described.

For example, instead of creating a separate flow:

> Удаление созданного шаблона

prefer:

Business rule:

> Созданные в процессе создания характеристики и неиспользованные шаблоны
> должны быть удалены, если к моменту завершения создания они не используются
> создаваемой характеристикой.

Acceptance criterion:

> Созданные в процессе создания характеристики шаблоны, которые на момент
> завершения создания не используются создаваемой характеристикой, удалены.

---

# Acceptance criteria

Acceptance criteria describe observable and testable outcomes.

They answer:

> How can we verify that the scenario behaves according to the requirements?

Write acceptance criteria as results rather than implementation instructions.

Example:

> создана входная характеристика с данными, введенными в интерфейсе создания

Example:

> созданные в процессе создания характеристики шаблоны, которые на момент
> завершения создания не используются создаваемой характеристикой, удалены

For an alternative scenario:

> новый шаблон создан в системе; новый шаблон автоматически выбран в качестве
> привязываемого

Separate multiple criteria using semicolons unless a list would materially
improve readability.

Acceptance criteria must be consistent with:

- business rules;
- main flow;
- alternative flows.

Do not introduce new business behavior only through acceptance criteria.

Every acceptance criterion must be supported by the requirements described
elsewhere in the User Story or provided source material.

---

# Business logic integrity

The agent MUST preserve the business logic provided by the user and existing
project documentation.

The agent's responsibility is to:

- structure requirements;
- clarify wording;
- improve readability;
- separate business rules, flows, and acceptance criteria;
- identify contradictions;
- identify ambiguities;
- identify missing business decisions;
- identify inconsistencies between different parts of the requirements.

The agent MUST NOT independently:

- change an existing business rule;
- remove a business rule because it appears unnecessary;
- replace unusual behavior with more conventional behavior;
- introduce new business behavior;
- resolve contradictions by choosing one interpretation;
- change the expected result of a scenario;
- change relationships between entities;
- change validation requirements;
- change automatic system behavior;
- change entity lifecycle rules;
- convert a business decision into a different UX decision;
- assume unspecified behavior merely because it is common in other products.

This applies even when the agent believes another behavior would:

- provide better UX;
- simplify implementation;
- be more conventional;
- be architecturally cleaner;
- make the User Story easier to describe.

The agent structures product decisions.

The agent does NOT make product decisions without the user's approval.

---

# Detecting ambiguities and inconsistencies

While refining a User Story, actively inspect the requirements for:

- contradictions between business rules;
- contradictions between business rules and flows;
- contradictions between the main flow and alternative flows;
- contradictions between flows and acceptance criteria;
- undefined behavior;
- missing branches that materially affect business behavior;
- ambiguous conditions;
- unclear entity lifecycle behavior;
- unclear relationships between entities;
- unclear consequences of cancellation;
- unclear consequences of failure;
- references to another User Story where the return behavior is undefined;
- business rules that cannot be unambiguously represented by the current flows.

Do NOT silently resolve these issues.

Do NOT modify the requirements merely to make them internally consistent.

If an issue does not prevent the known parts of the User Story from being
structured, complete the User Story using the known requirements and report the
issue afterward.

---

# Questions and inconsistencies

After refining the User Story, report unresolved business issues under:

### Вопросы и несостыковки

Each item should:

1. identify the specific situation;
2. explain what is undefined, ambiguous, or contradictory;
3. ask a concrete question requiring a product/business decision.

Example:

### Вопросы и несостыковки

1. **Отмена создания характеристики после создания нового шаблона.**

   Бизнес-правило определяет удаление неиспользуемых шаблонов к моменту
   завершения создания характеристики, но не определяет поведение при полной
   отмене создания.

   **Вопрос:** должен ли созданный в рамках этого процесса шаблон удаляться,
   если администратор отменяет создание входной характеристики?

2. **Создание нескольких шаблонов в рамках одного процесса.**

   Требования позволяют создать новый шаблон, вернуться к выбору и потенциально
   создать еще один шаблон. Судьба предыдущего шаблона до завершения создания
   характеристики явно не определена.

   **Вопрос:** когда должен удаляться предыдущий созданный шаблон — сразу после
   выбора другого шаблона или только после завершения создания характеристики?

Questions should focus on decisions that materially affect business behavior.

Do NOT ask questions about details that can safely be decided later during
UX/UI design or implementation.

For example, do NOT ask:

- should the selector be a dropdown;
- should creation happen in a modal or drawer;
- where should a button be positioned;
- what color should represent success;
- what spacing should be used;
- which Nuxt component should implement the control.

Those decisions do not belong to the User Story unless explicitly established
as a product requirement.

---

# Blocking ambiguity

Some ambiguities may make it impossible to produce a logically complete User
Story without inventing business behavior.

In this situation:

1. Do NOT invent the missing behavior.
2. Structure all requirements that are known.
3. Preserve the unresolved area instead of choosing an interpretation.
4. Stop the affected flow at the point where the missing decision becomes
   necessary, if required.
5. Describe the problem under `Вопросы и несостыковки`.
6. Ask a concrete question.

Do not prevent refinement of the entire User Story merely because one part is
ambiguous.

Refine everything that can safely be refined.

---

# Non-blocking ambiguity

If an ambiguity does not prevent the User Story from being structured:

1. Complete the User Story.
2. Do not make assumptions to resolve the ambiguity.
3. Add the issue to `Вопросы и несостыковки`.

The default workflow should therefore be:

requirements
→ refined User Story
→ questions and inconsistencies
→ user decisions
→ subsequent refinement if necessary

Avoid interrupting the user with questions before producing the User Story
unless absolutely necessary.

---

# No issues found

Do not invent questions merely to populate `Вопросы и несостыковки`.

If no material business ambiguities or contradictions were found, omit the
section.

Do not ask speculative questions about hypothetical edge cases unless they have
a realistic effect on the described business process.

---

# UX independence

Keep User Stories independent from specific UI implementations whenever
possible.

Prefer:

> администратор открыл интерфейс создания

instead of:

> администратор открыл модальное окно

Prefer:

> администратор выбирает шаблон

instead of:

> администратор выбирает шаблон в dropdown

Prefer:

> система уведомляет администратора

instead of:

> система показывает зеленый toast в правом верхнем углу

UI decisions belong to UX/UI design unless a particular interaction is itself a
business requirement.

The User Story should provide enough information for UX design without
unnecessarily dictating that design.

---

# Technical implementation independence

Do not introduce technical implementation details unless they are themselves
part of an explicit requirement.

Avoid introducing:

- API endpoints;
- HTTP methods;
- database tables;
- database operations;
- frontend component names;
- Nuxt/Vue implementation details;
- cache behavior;
- internal events;
- queues;
- implementation-specific state management.

For example, prefer:

> Система удаляет неиспользованный шаблон.

Do not transform this into:

> Frontend sends DELETE /templates/{id} and removes the template from Pinia.

Technical behavior should be specified separately when required.

---

# Existing project documentation

When existing FFBC documentation is available, treat it as context and preserve
established:

- terminology;
- entity names;
- role names;
- relationships;
- business rules;
- links between User Stories.

Do not silently modify existing project-wide rules to make an individual User
Story easier to formulate.

If the current User Story conflicts with existing project documentation, keep
the provided requirements intact and report the conflict under:

`Вопросы и несостыковки`

Do not independently decide which requirement takes precedence.

---

# Language and formatting

Preserve the language used by the project's requirements.

For FFBC User Stories, write the resulting specification in Russian unless the
user explicitly requests another language.

Keep established domain abbreviations such as `УСП` when they are already used
by the project.

Use Markdown.

Keep descriptions concise and functional.

Do not turn a User Story into a large analytical document.

Prefer simple declarative language.

Do not add explanations of basic business-analysis concepts to the resulting
User Story unless requested.

---

# Refinement workflow

When asked to refine an existing User Story:

1. Read the complete source User Story.
2. Identify the actor and user goal.
3. Identify existing business rules.
4. Separate business rules from sequential behavior.
5. Identify the primary happy path.
6. Move meaningful branches into alternative flows.
7. Remove unnecessary branches that merely represent optional inactivity.
8. Identify automatic system behavior that belongs to business rules rather
   than flows.
9. Add stable flow markers where cross-flow references are required.
10. Formulate observable acceptance criteria from already established
    requirements.
11. Check consistency between all sections.
12. Check relevant existing FFBC documentation when it has been provided as
    context.
13. Do not resolve discovered business ambiguities independently.
14. Produce the refined User Story.
15. After the User Story, list unresolved material issues under
    `Вопросы и несостыковки`.

---

# Final review checklist

Before returning a refined User Story, verify that:

- the high-level overview contains role, goal, and value;
- the role uses established project terminology;
- preconditions describe only the state before the scenario begins;
- business rules are declarative;
- business rules do not unnecessarily contain user-flow algorithms;
- the main flow represents the normal successful path;
- the main flow remains as linear as reasonably possible;
- each step represents meaningful user or system behavior;
- optional inactivity is not unnecessarily represented as an alternative flow;
- meaningful branches are represented as alternative scenarios;
- alternative scenarios clearly return to the appropriate point when required;
- existing User Stories are referenced instead of unnecessarily duplicated;
- stable flow markers exist only where references require them;
- automatic cleanup and system invariants are not unnecessarily modeled as
  user flows;
- acceptance criteria are observable and testable;
- acceptance criteria are supported by the requirements;
- acceptance criteria do not introduce new business logic;
- terminology matches existing FFBC documentation;
- UI implementation details have not been introduced without a business reason;
- technical implementation details have not been introduced without a
  requirement;
- no existing business behavior has been changed during refinement;
- no unusual business behavior has been "corrected" merely because the agent
  prefers another solution;
- no ambiguity or contradiction has been silently resolved;
- all material unresolved business questions are listed under
  `Вопросы и несостыковки`;
- no unnecessary UX/UI or implementation questions have been added;
- no unsupported business behavior has been invented.
