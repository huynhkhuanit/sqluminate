# AGENTS.md — SQLuminate

## 1. Project identity

**Project name:** SQLuminate  
**Repository/folder name:** `sqluminate`  
**Tagline:** Visualize SQL. Understand every query.  
**License target:** MIT  
**Primary delivery:** Open-source web application  
**Primary language for source code and public documentation:** English

SQLuminate is a browser-based SQL learning and analysis tool that converts SQL queries into clear visual representations. Its main purpose is to help students, developers, instructors, and data practitioners understand what a query does, how tables are related, and how the logical stages of the query connect.

The product must be useful without registration and must provide meaningful value without AI.

---

## 2. Product vision

Build the simplest trustworthy web tool for turning SQL into understandable visual models.

A user should be able to:

1. Open the website.
2. Paste or write a SQL query.
3. Select a SQL dialect.
4. Parse the query locally.
5. See syntax errors with useful messages.
6. Inspect the query structure.
7. View involved tables and JOIN relationships.
8. View a pedagogical logical-processing flow.
9. Export or share the visualization.
10. Learn why the query behaves as it does.

SQLuminate should prioritize correctness, clarity, privacy, and maintainability over feature count.

---

## 3. Target users

### Primary users

- Students learning SQL and relational databases.
- Backend and full-stack developers reading unfamiliar SQL.
- Teaching assistants and instructors demonstrating SQL concepts.
- Junior data analysts learning joins, filters, grouping, and aggregation.

### Secondary users

- Open-source contributors.
- Developers reviewing queries during debugging.
- Technical writers creating SQL learning materials.
- Teams that need lightweight query documentation.

---

## 4. Core product principles

1. **Useful before AI**
   - Parsing, formatting, visualization, diagnostics, examples, and export must work without an AI provider.

2. **Local-first**
   - SQL text should remain in the browser by default.
   - Do not transmit queries to a backend unless the user explicitly activates a server-dependent feature.

3. **Correct over impressive**
   - Never show a visualization that implies unsupported or uncertain SQL semantics.
   - Unsupported syntax must produce an explicit diagnostic, not a fabricated graph.

4. **Educational, not misleading**
   - The “logical processing flow” is a pedagogical model.
   - It is not a database engine’s physical execution plan.
   - The interface must label this distinction clearly.

5. **Progressive scope**
   - Complete a focused MVP before authentication, collaboration, AI, or database connections.

6. **Contributor-friendly**
   - Keep feature boundaries modular.
   - Favor readable TypeScript and documented domain models.
   - Avoid unnecessary framework abstraction.

7. **No fake functionality**
   - Buttons, menus, exports, parsers, and settings must work.
   - Do not ship placeholder interactions that silently do nothing.

---

## 5. MVP scope

The MVP is a client-first website. It does not require authentication, an application database, or a separate backend.

### 5.1 Required MVP features

#### A. SQL editor

- Monaco-based editor.
- SQL syntax highlighting.
- Line numbers.
- Light and dark themes.
- Keyboard shortcut to visualize.
- Clear editor action.
- Insert example query action.
- Responsive split layout.
- Preserve the current query in local storage.

#### B. SQL dialect selection

Start with:

- PostgreSQL as the primary supported dialect.
- MySQL as a secondary supported dialect only when tests confirm behavior.

Do not claim full dialect support. Display the current support status and limitations.

#### C. SQL formatting

- Format the current query.
- Preserve semantic content.
- Show formatting errors without deleting user input.
- Use a maintained formatter library rather than a custom formatter.

#### D. SQL parsing

- Parse SQL into an abstract syntax tree.
- Run parser work outside the main UI thread when practical.
- Normalize third-party parser output into SQLuminate-owned domain types.
- Do not let visual components depend directly on a parser library’s raw AST.
- Return structured diagnostics containing message, location when available, dialect, and unsupported-feature information.

#### E. Query structure view

Show a readable tree or structured panel for:

- CTEs.
- SELECT projections.
- FROM sources.
- JOIN clauses.
- ON predicates.
- WHERE.
- GROUP BY.
- HAVING.
- ORDER BY.
- LIMIT/OFFSET.
- Nested subqueries when supported.

The initial view may intentionally support only a documented subset.

#### F. JOIN graph

Create a node-and-edge graph containing:

- One node per table, CTE, derived table, or subquery source.
- Aliases.
- JOIN type.
- Join predicate summary.
- Edge direction used only for readability, not to imply foreign-key direction.
- Visual indication for INNER, LEFT, RIGHT, FULL, and CROSS JOIN when supported.
- Automatic graph layout.
- Pan, zoom, fit view, and reset view.

If a query does not contain a JOIN, show an informative empty state rather than an error.

#### G. Logical query flow

Show a pedagogical sequence based on clauses present in the query:

1. CTE preparation, when present.
2. FROM.
3. JOIN / ON.
4. WHERE.
5. GROUP BY.
6. HAVING.
7. SELECT.
8. DISTINCT, when present.
9. Set operations, when applicable and supported.
10. ORDER BY.
11. LIMIT / OFFSET.

Important:

- This is a simplified logical model.
- It must not be called an execution plan.
- Nested queries need nested flows instead of being flattened incorrectly.
- Database-specific optimizer behavior is outside MVP scope.

#### H. Diagnostics

- Parser error banner.
- Approximate error location when available.
- Unsupported syntax warning.
- Clear distinction between syntax errors, unsupported features, and internal errors.
- Copyable error details for issue reporting.

#### I. Example gallery

Provide tested examples for:

- Basic SELECT.
- WHERE and ORDER BY.
- INNER JOIN.
- LEFT JOIN.
- Multiple JOINs.
- GROUP BY and HAVING.
- Aggregate functions.
- CTE.
- Subquery.
- CASE expression.
- UNION, only if supported reliably.

Each example must include:

- Title.
- Learning objective.
- Dialect.
- SQL text.
- Expected visualization characteristics.

#### J. Export

Minimum:

- Export graph as SVG.
- Export graph as PNG.
- Copy a textual query summary.
- Copy current SQL.

Exports must include a small “Generated by SQLuminate” footer unless the user disables it.

#### K. Privacy and limitations

The interface must state:

- Queries are processed locally for MVP.
- SQL is not executed against a database.
- Visualizations represent parsed query structure.
- Logical flow is educational and is not a physical query plan.

---

## 6. Explicit non-goals for MVP

Do not implement these until the MVP is stable:

- User accounts.
- Team workspaces.
- Real-time collaboration.
- Cloud query history.
- Remote database credentials.
- Executing arbitrary SQL on the server.
- Database administration.
- Schema migrations.
- AI query generation.
- AI query optimization.
- AI explanations.
- Physical `EXPLAIN` or `EXPLAIN ANALYZE` visualization.
- Multi-tenant SaaS billing.
- Mobile-native application.
- A custom SQL grammar or parser written from scratch.
- Full support for every SQL dialect.
- D3-based custom rendering when React Flow is sufficient.

Do not expand scope merely because a feature is easy for an AI agent to generate.

---

## 7. Post-MVP roadmap

### Phase 2 — Better visualization and learning

- Interactive clause-by-clause explanation.
- Column lineage for supported SELECT queries.
- Schema input for table columns and key metadata.
- ER-style schema diagram from DDL.
- Shareable compressed URLs for small local-only examples.
- Mermaid export.
- Improved accessibility and keyboard navigation.
- Internationalization with English and Vietnamese.

### Phase 3 — Safe local SQL playground

Prefer browser sandboxing:

- DuckDB-WASM or SQLite WASM.
- Predefined datasets.
- Import CSV with explicit limits.
- Query execution entirely in the browser.
- Result table and basic charting.

Do not send arbitrary SQL to a shared server execution engine.

### Phase 4 — Physical plan visualization

- PostgreSQL `EXPLAIN (FORMAT JSON)` import.
- Visualization of scans, joins, sort, aggregate, cost, rows, and timing.
- Import-first design before direct database connections.
- Strong warnings about sensitive plan contents.

### Phase 5 — Optional AI

AI must be an optional adapter, not a core dependency.

Possible features:

- Explain a query at beginner/intermediate/advanced levels.
- Suggest readability improvements.
- Explain parser errors.
- Summarize a physical execution plan.

Requirements:

- Explicit opt-in.
- Show which provider receives the query.
- Support bring-your-own-key where practical.
- Never present speculative performance advice as fact.
- Prefer deterministic analysis before LLM analysis.
- AI output must be visually labeled as generated guidance.

---

## 8. Recommended technology stack

Use stable releases compatible with each other. Do not upgrade major versions casually.

### Core

- Next.js with App Router.
- React.
- TypeScript in strict mode.
- Node.js LTS.
- `pnpm`.

### Interface

- Tailwind CSS.
- shadcn/ui for accessible primitives and consistent components.
- Monaco Editor for SQL editing.
- `@xyflow/react` for graph visualization.
- Lucide icons.

### SQL and data processing

- `node-sql-parser` behind a project-owned adapter.
- `sql-formatter` behind a project-owned adapter.
- Zod for runtime validation where external or serialized data enters the app.
- A Web Worker for parsing if editor interaction becomes noticeably blocked.

### State management

Start with:

- React state for local component state.
- A small Zustand store only for shared editor/visualization state.

Do not add Redux unless project complexity clearly requires it.

### Export

- SVG produced from the graph where possible.
- `html-to-image` or an equivalent maintained library for PNG export.
- Avoid server-side screenshot generation in MVP.

### Testing

- Vitest.
- React Testing Library.
- Playwright.
- Parser fixture tests.
- Snapshot tests only when they provide stable value.

### Quality

- ESLint.
- Prettier.
- Husky and lint-staged only if they do not create contributor friction.
- GitHub Actions for lint, type-check, unit tests, build, and selected E2E tests.

### Deployment

- Vercel for the web application.
- No database is required for MVP.
- No secret environment variables should be required for basic usage.

---

## 9. Initial repository structure

Use a single Next.js application first. Do not create a monorepo until reusable packages actually exist.

```text
sqluminate/
├── AGENTS.md
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── package.json
├── pnpm-lock.yaml
├── next.config.ts
├── tsconfig.json
├── public/
│   ├── examples/
│   └── branding/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── about/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── features/
│   │   ├── sql-editor/
│   │   ├── sql-formatting/
│   │   ├── sql-parsing/
│   │   ├── query-structure/
│   │   ├── join-graph/
│   │   ├── logical-flow/
│   │   ├── diagnostics/
│   │   ├── examples/
│   │   └── export/
│   ├── lib/
│   │   ├── sql/
│   │   │   ├── parser-adapter.ts
│   │   │   ├── formatter-adapter.ts
│   │   │   ├── normalize-ast.ts
│   │   │   └── dialects.ts
│   │   ├── graph/
│   │   ├── storage/
│   │   └── utils/
│   ├── workers/
│   │   └── sql-parser.worker.ts
│   ├── types/
│   │   ├── query-model.ts
│   │   ├── visualization.ts
│   │   └── diagnostics.ts
│   └── test/
│       ├── fixtures/
│       └── helpers/
├── tests/
│   └── e2e/
└── .github/
    ├── workflows/
    ├── ISSUE_TEMPLATE/
    └── pull_request_template.md
```

A feature directory may contain:

```text
feature-name/
├── components/
├── hooks/
├── model/
├── services/
├── tests/
└── index.ts
```

Keep this structure proportional. Do not create empty directories or abstractions in advance.

---

## 10. Domain model

The application must own a normalized representation independent of third-party parser types.

Suggested types:

```ts
export type SqlDialect = "postgresql" | "mysql";

export interface SourceLocation {
  line?: number;
  column?: number;
  startOffset?: number;
  endOffset?: number;
}

export interface QueryDiagnostic {
  severity: "info" | "warning" | "error";
  code: string;
  message: string;
  dialect: SqlDialect;
  location?: SourceLocation;
  details?: string;
}

export interface QuerySource {
  id: string;
  kind: "table" | "cte" | "subquery" | "derived-table";
  name: string;
  alias?: string;
  schema?: string;
}

export interface JoinRelation {
  id: string;
  leftSourceId: string;
  rightSourceId: string;
  joinType: "inner" | "left" | "right" | "full" | "cross" | "unknown";
  predicate?: string;
  location?: SourceLocation;
}

export interface ProjectionItem {
  expression: string;
  alias?: string;
  isWildcard: boolean;
}

export interface LogicalStep {
  id: string;
  type:
    | "cte"
    | "from"
    | "join"
    | "where"
    | "group-by"
    | "having"
    | "select"
    | "distinct"
    | "set-operation"
    | "order-by"
    | "limit"
    | "offset";
  label: string;
  summary: string;
  children?: LogicalStep[];
}

export interface NormalizedQuery {
  dialect: SqlDialect;
  statementType: "select" | "insert" | "update" | "delete" | "unknown";
  sources: QuerySource[];
  joins: JoinRelation[];
  projections: ProjectionItem[];
  logicalSteps: LogicalStep[];
  diagnostics: QueryDiagnostic[];
  rawAst?: unknown;
}
```

Rules:

- `rawAst` may be retained for debugging but must not be the public feature API.
- IDs must be deterministic for the same normalized query when possible.
- Never use `any` for parser output. Use `unknown`, type guards, and normalization.
- A parsing failure returns diagnostics and no misleading partial visualization.
- Partial visualization is allowed only when explicitly marked partial and covered by tests.

---

## 11. Parsing and visualization behavior

### Supported statement strategy

MVP should prioritize `SELECT`.

For `INSERT`, `UPDATE`, and `DELETE`:

- Parse when the library supports it.
- Show a structured summary if reliable.
- Do not force them into a SELECT-oriented JOIN flow.
- Mark support as experimental until fixtures exist.

### CTE behavior

- Treat each CTE as a named query source.
- Allow a CTE to contain its own nested visualization.
- Resolve references by alias/name within the query scope.
- Handle recursive CTEs only after explicit tests are added.

### Subquery behavior

- Preserve nesting.
- Never flatten predicates across query scopes.
- Assign a readable generated label when no alias exists.
- Warn when the current visualizer cannot represent a valid structure.

### JOIN behavior

- Extract all available source aliases.
- Preserve JOIN type.
- Summarize ON predicates without pretending to infer database constraints.
- A predicate such as `a.user_id = b.id` can be shown as an edge label.
- Do not describe this as a foreign-key relationship unless schema metadata proves it.

### Logical-flow behavior

- Generate steps only for clauses present.
- The educational order must be documented.
- For UNION/INTERSECT/EXCEPT, model each branch separately.
- Physical database execution order must never be inferred from the SQL text alone.

---

## 12. User experience requirements

### Desktop

Primary layout:

- Top navigation.
- Left pane: SQL editor and controls.
- Right pane: visualization tabs.
- Bottom or inline diagnostics.
- Resizable panes.

Visualization tabs:

1. JOIN Graph.
2. Logical Flow.
3. Query Structure.
4. Diagnostics.

### Mobile

- Editor and visualization use stacked views.
- Tabs remain keyboard and screen-reader accessible.
- Monaco may use a simplified height and toolbar.
- Export controls must remain usable.

### Empty states

Use helpful states for:

- No query.
- Valid query with no JOIN.
- Unsupported statement.
- Parse error.
- Empty export.
- Browser feature not available.

### Accessibility

- Meet WCAG-oriented contrast and keyboard interaction expectations.
- Do not encode JOIN types by color alone.
- Give graph nodes and controls accessible labels.
- Respect reduced-motion preferences.
- Ensure focus remains visible.
- Provide a textual representation of the graph.

---

## 13. Security and privacy constraints

1. Do not execute user SQL on the application server.
2. Do not collect or log query content by default.
3. Do not embed secrets in the client bundle.
4. Sanitize any generated HTML or SVG.
5. Treat imported files and serialized shared state as untrusted.
6. Limit input size to prevent browser lockups.
7. Parse in a worker or apply cancellation/debouncing for large input.
8. Add a Content Security Policy suitable for Monaco and application assets.
9. Avoid `dangerouslySetInnerHTML`; any exception requires sanitization and a comment explaining why.
10. Do not add analytics that capture editor content.
11. Error monitoring must redact SQL text unless a user explicitly opts in.
12. Dependency updates must be reviewed for supply-chain risk and licensing compatibility.

---

## 14. Performance expectations

MVP target on a typical modern laptop:

- Initial page becomes interactive quickly.
- Editing remains responsive for ordinary teaching and application queries.
- Parsing is debounced.
- A stale parse result must not overwrite a newer query.
- Graph layout should remain usable for at least 30 source nodes.
- Large or pathological inputs should fail safely with a warning.
- Monaco and heavy visual components may be dynamically loaded.
- Avoid unnecessary rerenders of the editor and graph.

Do not claim hard performance numbers until measured in CI or a documented benchmark.

---

## 15. Coding standards

### TypeScript

- Enable strict mode.
- No implicit `any`.
- Prefer `unknown` plus validation for external data.
- Prefer discriminated unions for domain states.
- Export explicit public types.
- Avoid type assertions unless a runtime invariant has been checked.
- Keep pure transformation logic separate from React components.

### React

- Prefer server components only where they provide value.
- Editor, graph, local storage, and browser APIs are client components.
- Keep components focused.
- Move domain logic into tested functions.
- Avoid effects for derived state.
- Do not mirror props into state without a clear reason.
- Clean up event listeners and workers.

### Naming

- Components: `PascalCase`.
- Hooks: `useSomething`.
- Files: `kebab-case.ts` / `kebab-case.tsx`.
- Domain types: precise nouns.
- Booleans: `is`, `has`, `can`, or `should` prefixes.
- Avoid vague names such as `data`, `item`, `handler`, or `utils` when a precise name exists.

### Comments

Comment:

- SQL semantic assumptions.
- Parser library workarounds.
- Security decisions.
- Non-obvious graph transformations.
- Why a trade-off was chosen.

Do not comment obvious syntax.

### Error handling

- Never swallow errors.
- Convert expected failures into typed diagnostics.
- Unexpected failures should show a safe user message and retain developer detail for local debugging.
- Do not replace real errors with fabricated success states.

---

## 16. Testing strategy

### Unit tests

Required for:

- Parser adapter.
- AST normalization.
- Source extraction.
- JOIN extraction.
- Logical-step generation.
- Diagnostics mapping.
- Share-state serialization if added.
- Export naming and metadata.

### Fixture tests

Maintain SQL fixtures by dialect and feature:

```text
src/test/fixtures/
├── postgresql/
│   ├── basic-select.sql
│   ├── inner-join.sql
│   ├── multiple-joins.sql
│   ├── group-having.sql
│   ├── cte.sql
│   └── subquery.sql
└── mysql/
```

Each fixture should include expected normalized output or focused assertions.

Include edge cases:

- Quoted identifiers.
- Schema-qualified table names.
- Aliases.
- Multiple joins.
- No joins.
- Nested subqueries.
- Functions.
- CASE.
- DISTINCT.
- NULL predicates.
- Invalid SQL.
- Unsupported syntax.
- Very large input.
- Comments and semicolons.
- Dialect-specific syntax.

### Component tests

Test:

- Editor actions.
- Dialect selection.
- Diagnostics display.
- Empty states.
- Tab navigation.
- Example loading.
- Export controls.

### E2E tests

Minimum flows:

1. Load an example and render a JOIN graph.
2. Enter invalid SQL and see a diagnostic.
3. Format a query.
4. Switch dialect.
5. Refresh and restore local query.
6. Export a visualization.
7. Use core controls by keyboard.

### Regression policy

Every fixed parsing or visualization bug must add a regression fixture or test.

---

## 17. Commands expected in the repository

Codex should keep these commands working:

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

Preferred combined verification:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Do not claim a command passed unless it was executed successfully in the current environment.

---

## 18. Open-source repository requirements

Before the first public release, create:

- `README.md`.
- `LICENSE` using MIT.
- `CONTRIBUTING.md`.
- `CODE_OF_CONDUCT.md`.
- `SECURITY.md`.
- Issue templates for bug reports and feature requests.
- Pull request template.
- GitHub Actions workflow.
- Labels such as `good first issue`, `help wanted`, `bug`, `enhancement`, `documentation`, and `parser`.
- A public roadmap or milestones.
- Screenshots or a short demo GIF.
- A deployed demo.
- Clear known limitations.

README sections:

1. Product screenshot.
2. One-sentence value proposition.
3. Live demo.
4. Feature overview.
5. Supported dialects and syntax.
6. Privacy model.
7. Local development.
8. Architecture.
9. Roadmap.
10. Contributing.
11. License.
12. Acknowledgements and major dependencies.

Do not use inflated claims such as “the ultimate SQL platform” or “supports all SQL.”

---

## 19. Git workflow

Recommended:

- Default branch: `main`.
- Feature branches: `feat/<short-name>`.
- Bug branches: `fix/<short-name>`.
- Documentation: `docs/<short-name>`.
- Refactor: `refactor/<short-name>`.

Use Conventional Commits:

```text
feat: add logical query flow
fix: preserve aliases in join graph
docs: document PostgreSQL limitations
test: add nested subquery fixtures
refactor: isolate parser adapter
```

Pull requests should:

- Solve one coherent problem.
- Explain user impact.
- Include screenshots for UI changes.
- Include tests for logic changes.
- State limitations and follow-up work.
- Pass all required checks.

Do not mix broad refactors with unrelated features.

---

## 20. Vibe-coding guardrails

AI-assisted implementation is allowed and expected, but generated code is not accepted merely because it runs once.

For every meaningful change:

1. Restate the requirement.
2. Inspect existing code before editing.
3. Identify affected modules.
4. Implement the smallest coherent change.
5. Explain non-obvious decisions in code or documentation.
6. Add or update tests.
7. Run relevant verification commands.
8. Review the diff for duplication, dead code, and unsupported claims.
9. Report what changed, what was tested, and what remains limited.

The maintainer must be able to:

- Explain the feature.
- Debug it.
- Review a pull request affecting it.
- Reproduce its tests.
- Remove or replace the dependency if needed.

Never:

- Paste an entire generated application over working code.
- Introduce five libraries to avoid writing a small function.
- Add a backend solely because a generated template includes one.
- Mark untested code as production-ready.
- hide parser limitations.
- generate fake contributors, fake testimonials, fake benchmarks, or fake usage metrics.
- copy code without checking its license.

---

## 21. Codex operating instructions

When working in this repository, Codex must:

1. Read this file before making changes.
2. Inspect `README.md`, `package.json`, and relevant feature files.
3. Preserve established architecture unless a change is justified.
4. Prefer small, reviewable diffs.
5. Avoid unrelated formatting or refactoring.
6. Ask no question when repository evidence resolves the ambiguity.
7. Use reasonable defaults for minor details.
8. State assumptions when requirements are genuinely ambiguous.
9. Do not add out-of-scope features.
10. Do not silently change the chosen stack.
11. Do not add authentication, a database, AI, or a backend during MVP tasks unless explicitly requested.
12. Do not directly expose third-party AST structures to UI components.
13. Add regression tests for parser bugs.
14. Keep user SQL local by default.
15. Run the most relevant checks before finishing.
16. Update documentation when behavior, commands, architecture, or limitations change.
17. Mention any check that could not be run and the reason.
18. Never claim completion when key acceptance criteria remain unmet.

For large work:

- First create a short implementation plan in the response.
- Break work into independently verifiable milestones.
- Finish one vertical slice before starting another.
- Avoid scaffolding every future phase at once.

---

## 22. Definition of done

A task is complete only when:

- The requested behavior works.
- Types are correct.
- Relevant unit or component tests exist.
- Regression coverage exists for fixed bugs.
- Lint and type-check pass.
- Relevant tests pass.
- Production build passes when feasible.
- The UI handles loading, empty, error, and success states as applicable.
- Accessibility was considered.
- Documentation reflects changed behavior.
- No unrelated generated files or dependencies were added.
- The final report lists changed files and verification performed.

A feature is not done when only a visual mockup exists.

---

## 23. MVP acceptance criteria

The first public MVP is ready when a new visitor can:

1. Open the deployed site without signing in.
2. Load a tested PostgreSQL example.
3. Edit SQL in Monaco.
4. Format it.
5. Parse it locally.
6. See useful diagnostics for invalid SQL.
7. View a correct table/JOIN graph for supported syntax.
8. View a clearly labeled logical query flow.
9. Inspect query structure.
10. Export the visualization.
11. Refresh and retain the current query.
12. Read supported syntax and limitations.
13. Find local setup and contribution instructions.
14. Run the project and test suite from a clean checkout.

---

## 24. Initial implementation sequence

Codex should implement the project in this order unless the repository already contains later work.

### Milestone 0 — Bootstrap

- Create Next.js TypeScript project with `pnpm`.
- Configure strict TypeScript.
- Configure Tailwind.
- Configure lint, formatting, Vitest, and Playwright.
- Add initial shell layout.
- Add GitHub Actions for lint, type-check, tests, and build.
- Add project metadata and MIT license.

### Milestone 1 — Editor vertical slice

- Monaco editor.
- Query state.
- PostgreSQL example.
- Format action.
- Local storage.
- Responsive two-pane layout.
- Unit/component tests.

### Milestone 2 — Parser boundary

- Parser adapter.
- Normalized domain types.
- Diagnostics.
- Tested fixtures.
- No visualization until normalization is reliable.

### Milestone 3 — Query structure

- Readable structured view.
- SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.
- CTE and subquery support only with tests.

### Milestone 4 — JOIN graph

- Sources and joins mapped to graph nodes/edges.
- Auto layout.
- Join type labels.
- Empty and error states.
- Textual accessibility representation.

### Milestone 5 — Logical flow

- Generate clause steps.
- Nested flow where needed.
- Educational disclaimer.
- Tests against fixtures.

### Milestone 6 — Export and release readiness

- PNG/SVG export.
- Example gallery.
- Privacy and limitations.
- README and contributing documents.
- E2E coverage.
- Deploy preview.
- Version `0.1.0`.

Do not begin optional AI features before Milestone 6 is complete.

---

## 25. First task for Codex

When this repository contains only this file, perform the following:

> Bootstrap SQLuminate Milestone 0 and Milestone 1 only. Create a clean Next.js TypeScript application using pnpm, Tailwind CSS, Monaco Editor, a simple accessible responsive layout, PostgreSQL dialect selection, one tested sample query, formatting, local persistence, and the initial quality toolchain. Do not add a backend, database, authentication, AI, React Flow, or SQL parsing yet. Add README setup instructions and run lint, type-check, tests, and build. Report exact commands and results.

Before coding:

- Briefly list the files and architecture you intend to create.
- Verify dependency compatibility.
- Keep the first implementation small and functional.
- Do not generate future modules as empty placeholders.

---

## 26. Branding direction

Name presentation:

- Product: `SQLuminate`
- Repository: `sqluminate`
- Package scope if needed later: `@sqluminate/*`
- Suggested website title: `SQLuminate — Visual SQL Explorer`
- Suggested description: `An open-source web app that turns SQL queries into understandable structure, JOIN graphs, and logical flows.`

Visual direction:

- Clean developer-tool interface.
- Neutral dark and light themes.
- One restrained accent color.
- Strong typography and spacing.
- Avoid excessive gradients, glassmorphism, and decorative animation.
- Diagrams must remain readable before being visually impressive.

Possible logo concept:

- A database cylinder or SQL brackets emitting connected graph nodes.
- A subtle light/clarity motif reflecting “illuminate.”
- Must remain recognizable at GitHub avatar size.

---

## 27. Product decision log

Current decisions:

- Use the name SQLuminate.
- Build a website first.
- Open-source under MIT.
- Use English for public repository text.
- Use a client-first MVP.
- Start with PostgreSQL.
- Add MySQL only after verified fixtures.
- Use Monaco for editing.
- Use a parser adapter and normalized AST.
- Use React Flow only when implementing the graph milestone.
- Keep AI outside MVP.
- Avoid a backend and application database in MVP.
- Do not execute SQL in MVP.
- Optimize for students and developers who need to understand SQL.

When a major decision changes, update this section and the relevant architecture documentation in the same pull request.
