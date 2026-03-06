---
name: write-tests
description: Write or update Vue component unit tests with Vitest and @vue/test-utils using black-box assertions. Use when asked to create, fix, or refactor tests for one or more components while keeping all changes inside the module test directory.
---

# Write Tests

## Inputs

- Strict input pattern: `$action?; $module-name; $component-name1, component-name2, etc.`
- `$action` is optional. Supported values:
  - `implement`: implement only marked test blocks.
  - `write`: design and write tests from component/file public API.
- If `$action` is omitted, treat it as `implement`.
- `$module-name`: module path relative to repository root.
- `$component-name1, component-name2, etc.`: one or more component/file names in comma-separated format (for example `name1, name2`).

Map each component name to:

`$module-name/tests/<component-name>.spec.ts`

## Guardrails

- Edit only files under `$module-name/tests`, except when missing hooks require adding `data-qt` attributes in source component files.
- For `implement` action: write or change only tests containing the marker `// t2test`.
- For `implement` action: do not touch any test code outside marked `// t2test` blocks.
- For `implement` when working on test is finished remove the mark `// t2test`.
- For `write` action: read the original component/file source first, then design tests for public API (props, emits, slots, rendered output, user interactions) or exported functionality.
- Use `vitest` and `@vue/test-utils`.
- Apply black-box strategy: verify observable behavior and avoid implementation details.
- Keep tests deterministic: avoid external network calls, unstable timing, and non-deterministic inputs.
- Treat behavior comments in tests as source of truth.
- Infer expected behavior from suite names, test names, and component public API when comments are absent.
- Do not use selectors to target elements in tests. Always select through `data-qt` attributes.
- If source code must be changed, add only `data-qt` attributes. Do not change anything else in original code.

## Workflow

1. Parse input as `$action?; $module-name; $component-name1, component-name2, etc.`.
2. If `$action` is missing, set `$action = implement`.
3. Parse component names into a trimmed, unique list.
4. Resolve each test path as `$module-name/tests/<component-name>.spec.ts`.
5. For `implement`:
   - Open each existing test file.
   - Add or update only `// t2test` blocks.
   - Do not modify any non-marked test block.
   - When working is finished remove `// t2test` mark
6. For `write`:
   - Open original source file(s) for each requested component/export.
   - Create missing test files when needed.
   - Design and write tests for the public API or exported functionality.
7. Use `data-qt` attributes for every element query in tests.
8. If an element has no `data-qt` hook, add only `data-qt` attributes in source code and nothing else.
9. Avoid assertions on internals (`vm`, private methods, implementation-only CSS hooks).

## Validation

Run validation on changed test files:

- `npx vitest run <changed-test-file>...`
- `npx eslint <changed-test-file>...`
- `npx vue-tsc --noEmit --project .nuxt/tsconfig.app.json`

Treat the task as incomplete until all validation commands pass.
