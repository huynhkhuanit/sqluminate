# SQLuminate

Visualize SQL. Understand every query.

SQLuminate is an open-source, browser-based SQL learning and analysis tool. The current repository includes a dark-first product landing page and the editor vertical slice from Milestones 0 and 1.

## Current status

This first milestone includes:

- A Next.js App Router application with strict TypeScript.
- A responsive, dark-first landing page with a real multi-dialect formatting demo.
- Transparent capability and roadmap status for the current MVP boundary.
- A responsive SQL workspace built with Tailwind CSS.
- A locally bundled Monaco Editor with SQL highlighting and line numbers.
- PostgreSQL, MySQL, SQLite, SQL Server, and Oracle dialect selection.
- Local SQL formatting through `sql-formatter`, with dialect-aware code-block highlighting.
- Site-wide English, Tiếng Việt, and 中文 localization with cookie persistence.
- Query persistence in browser local storage.
- Light and dark themes.
- Vitest, React Testing Library, Playwright, ESLint, Prettier, and CI.

There is no hosted demo for this milestone.

## Supported dialects and syntax

The current formatter and code-preview dialects are PostgreSQL, MySQL, SQLite, SQL Server, and Oracle. SQL Server maps to `transactsql` and Oracle maps to `plsql` in `sql-formatter`.

The code block highlighter is a small local lexical highlighter. It colors keywords, functions, strings, comments, numbers, operators, and identifiers using dialect-specific keyword sets. It is presentation-only and does not validate SQL semantics.

SQLuminate does not parse SQL yet. It does not validate query semantics, create a query structure, render JOIN graphs, or build logical flows. Those capabilities begin after the parser boundary in Milestone 2.

## Privacy model

- SQL is edited, formatted, and saved locally in the browser.
- Query text is not sent to a server.
- SQL is never executed against a database.
- No analytics, accounts, backend, database, or AI provider is included.
- Input is limited to 100,000 characters to reduce browser lockup risk.

The application sends a restrictive Content Security Policy. Monaco worker code is bundled with the application and runs through the browser worker mechanism. The landing page does not load Monaco, WebGL, or canvas visuals.

## Internationalization

The locale boundary is implemented at the root layout so future pages can reuse it without duplicating language logic:

- Supported locales are `en`, `vi`, and `zh`.
- `I18nProvider` exposes the active locale and dictionary to client components.
- Server pages use `getRequestLocale()` and `getDictionary()` before rendering metadata or page copy.
- The language selector uses flag icons and native language names, and persists the choice in the `sqluminate-locale` cookie.
- Shared copy lives in `src/lib/i18n/dictionaries.ts`; add keys to all dictionaries before using them in a new page.

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

Open [http://localhost:3000](http://localhost:3000) for the landing page. The working SQL editor is available at [http://localhost:3000/workspace](http://localhost:3000/workspace).

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
│   ├── page.tsx
│   └── workspace/
│       └── page.tsx
├── features/
│   ├── landing/
│   │   └── components/
│   │       ├── landing-page.tsx
│   │       ├── landing-header.tsx
│   │       ├── landing-page.module.css
│   │       ├── guided-format-demo.tsx
│   │       └── product-preview.tsx
│   └── sql-editor/
│       ├── components/
│       ├── hooks/
│       ├── model/
│       └── index.ts
├── components/
│   ├── i18n/
│   └── ui/
└── lib/
    ├── i18n/
    │   ├── dictionaries.ts
    │   └── server.ts
    ├── sql/
    │   ├── dialects.ts
    │   ├── formatter-adapter.ts
    │   └── sql-highlighter.ts
    └── storage/
        └── query-storage.ts
```

The landing page remains a server component. Its client boundaries are the guided formatter, language switcher, and shared locale provider. The guided formatter lazy-loads the project-owned formatting adapter after the user requests formatting. The editor workspace is a separate focused client boundary because it uses Monaco, local storage, browser theme APIs, and the same locale provider. Formatting, highlighting, storage, and localization remain isolated behind small project-owned adapters.

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

See [CONTRIBUTING.md](CONTRIBUTING.md) for the English workflow or [CONTRIBUTING.vi.md](CONTRIBUTING.vi.md) for the Vietnamese version. Keep changes small, add tests for behavior, and use Conventional Commits.

## License

SQLuminate is licensed under the [MIT License](LICENSE).

## Acknowledgements

The landing page and editor foundation use Next.js, React, Tailwind CSS, Lucide icons, Monaco Editor, and `sql-formatter`.
