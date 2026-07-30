# SQLuminate

Visualize SQL. Understand every query.

SQLuminate is an open-source, browser-based SQL learning and analysis tool. The current repository implements the project foundation and editor vertical slice from Milestones 0 and 1.

## Current status

This first milestone includes:

- A Next.js App Router application with strict TypeScript.
- A responsive SQL workspace built with Tailwind CSS.
- A locally bundled Monaco Editor with SQL highlighting and line numbers.
- PostgreSQL dialect selection and one tested learning example.
- Local SQL formatting through `sql-formatter`.
- Query persistence in browser local storage.
- Light and dark themes.
- Vitest, React Testing Library, Playwright, ESLint, Prettier, and CI.

There is no hosted demo for this milestone.

## Supported dialects and syntax

PostgreSQL is the only selectable dialect. Formatting uses the PostgreSQL mode from `sql-formatter`.

SQLuminate does not parse SQL yet. It does not validate query semantics, create a query structure, render JOIN graphs, or build logical flows. Those capabilities begin after the parser boundary in Milestone 2.

## Privacy model

- SQL is edited, formatted, and saved locally in the browser.
- Query text is not sent to a server.
- SQL is never executed against a database.
- No analytics, accounts, backend, database, or AI provider is included.
- Input is limited to 100,000 characters to reduce browser lockup risk.

The application sends a restrictive Content Security Policy. Monaco worker code is bundled with the application and runs through the browser worker mechanism.

## Requirements

- Node.js 24.15 or newer in the Node 24 LTS line.
- pnpm 11 or newer.

The exact pnpm version is recorded in `package.json`.

## Local development

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality commands

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

Playwright requires Chromium. Install it once when needed:

```bash
pnpm exec playwright install chromium
```

## Architecture

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── features/
│   └── sql-editor/
│       ├── components/
│       ├── hooks/
│       ├── model/
│       └── index.ts
└── lib/
    ├── sql/
    │   ├── dialects.ts
    │   └── formatter-adapter.ts
    └── storage/
        └── query-storage.ts
```

The page shell remains a server component. The editor workspace is a focused client boundary because it uses Monaco, local storage, and browser theme APIs. Formatting and storage are isolated behind small project-owned adapters.

No parser, normalized AST, graph, or future feature folder is scaffolded in advance.

## Roadmap

The implementation follows the milestones in `AGENTS.md`:

1. Parser boundary and normalized domain types.
2. Query structure.
3. JOIN graph.
4. Pedagogical logical flow.
5. Export and release readiness.

AI, authentication, server-side SQL execution, and database connections remain outside the MVP.

## Contributing

The dedicated contribution guide is planned for release readiness. Until then, read `AGENTS.md`, keep changes small, add tests for behavior, and use Conventional Commits.

## License

SQLuminate is licensed under the [MIT License](LICENSE).

## Acknowledgements

The editor and formatting foundation uses Next.js, React, Tailwind CSS, Monaco Editor, and `sql-formatter`.
