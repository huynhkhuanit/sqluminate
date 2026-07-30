"use client";

import {
  Braces,
  Eraser,
  FileCode2,
  Moon,
  Paintbrush,
  ShieldCheck,
  Sun,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import { SqlEditorPanel } from "@/features/sql-editor/components/sql-editor-panel";
import { useColorTheme } from "@/features/sql-editor/hooks/use-color-theme";
import { usePersistedQuery } from "@/features/sql-editor/hooks/use-persisted-query";
import { POSTGRESQL_EXAMPLE } from "@/features/sql-editor/model/example-query";
import {
  isSqlDialect,
  SQL_DIALECT_OPTIONS,
  type SqlDialect,
} from "@/lib/sql/dialects";
import { formatSql } from "@/lib/sql/formatter-adapter";
import { MAX_SQL_LENGTH } from "@/lib/storage/query-storage";

type FeedbackTone = "neutral" | "success" | "error";

interface EditorFeedback {
  tone: FeedbackTone;
  message: string;
}

const iconProps = {
  "aria-hidden": true,
  size: 16,
  strokeWidth: 1.75,
} as const;

export function SqlWorkbench() {
  const [dialect, setDialect] = useState<SqlDialect>("postgresql");
  const [feedback, setFeedback] = useState<EditorFeedback>({
    tone: "neutral",
    message: "Ready for local editing.",
  });
  const { theme, toggleTheme } = useColorTheme();
  const { query, setQuery, isHydrated, persistenceState, persistenceMessage } =
    usePersistedQuery(POSTGRESQL_EXAMPLE.sql);

  const handleFormat = useCallback(() => {
    if (query.trim().length === 0) {
      setFeedback({
        tone: "error",
        message: "Add SQL before formatting.",
      });
      return;
    }

    const result = formatSql(query, dialect);

    if (!result.ok) {
      setFeedback({
        tone: "error",
        message: result.message,
      });
      return;
    }

    setQuery(result.sql);
    setFeedback({
      tone: "success",
      message: "Query formatted locally.",
    });
  }, [dialect, query, setQuery]);

  useEffect(() => {
    function handleKeyboardShortcut(event: KeyboardEvent) {
      const isFormatShortcut =
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "f";

      if (isFormatShortcut) {
        event.preventDefault();
        handleFormat();
      }
    }

    window.addEventListener("keydown", handleKeyboardShortcut);
    return () => window.removeEventListener("keydown", handleKeyboardShortcut);
  }, [handleFormat]);

  const characterCount = useMemo(
    () => query.length.toLocaleString("en-US"),
    [query.length],
  );

  function handleQueryChange(nextQuery: string) {
    if (nextQuery.length > MAX_SQL_LENGTH) {
      setFeedback({
        tone: "error",
        message:
          "Queries are limited to 100,000 characters for browser safety.",
      });
      return;
    }

    setQuery(nextQuery);
    setFeedback({
      tone: "neutral",
      message: "Editing locally.",
    });
  }

  function handleDialectChange(event: ChangeEvent<HTMLSelectElement>) {
    if (isSqlDialect(event.target.value)) {
      setDialect(event.target.value);
    }
  }

  function loadExample() {
    setDialect(POSTGRESQL_EXAMPLE.dialect);
    setQuery(POSTGRESQL_EXAMPLE.sql);
    setFeedback({
      tone: "success",
      message: `Loaded example: ${POSTGRESQL_EXAMPLE.title}.`,
    });
  }

  function clearEditor() {
    setQuery("");
    setFeedback({
      tone: "success",
      message: "Editor cleared.",
    });
  }

  const persistenceLabel =
    persistenceState === "loading"
      ? "Restoring saved query"
      : persistenceState === "saving"
        ? "Saving locally"
        : persistenceState === "saved"
          ? "Saved locally"
          : "Local save unavailable";

  return (
    <main className="min-h-[100dvh] bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex min-h-16 max-w-[1480px] items-center justify-between gap-4 px-4 sm:px-6">
          <a
            className="group flex min-w-0 items-center gap-3 rounded-sm"
            href="#workspace"
          >
            <span
              aria-hidden="true"
              className="grid size-9 shrink-0 place-items-center rounded-md bg-[var(--accent)] font-mono text-xs font-semibold tracking-tight text-white"
            >
              SQL
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold tracking-[-0.01em]">
                SQLuminate
              </span>
              <span className="hidden text-xs text-[var(--foreground-muted)] sm:block">
                Visual SQL Explorer
              </span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-[var(--foreground-muted)] md:block">
              Local-first workspace
            </span>
            <button
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="grid size-11 cursor-pointer place-items-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)] active:bg-[var(--surface-subtle)]"
              onClick={toggleTheme}
              type="button"
            >
              {theme === "dark" ? (
                <Sun {...iconProps} />
              ) : (
                <Moon {...iconProps} />
              )}
            </button>
          </div>
        </div>
      </header>

      <section
        aria-labelledby="workspace-title"
        className="mx-auto max-w-[1480px] px-4 py-6 sm:px-6 md:py-8"
        id="workspace"
      >
        <div className="mb-6 max-w-3xl">
          <h1
            className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
            id="workspace-title"
          >
            Understand SQL from the query outward.
          </h1>
          <p className="mt-2 max-w-[65ch] text-sm leading-6 text-[var(--foreground-muted)] sm:text-base">
            Write and format PostgreSQL in your browser. Parsing and
            visualization are intentionally outside this first milestone.
          </p>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
          <section
            aria-labelledby="editor-heading"
            className="min-w-0 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]"
          >
            <div className="border-b border-[var(--border)] px-3 py-3 sm:px-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FileCode2 {...iconProps} />
                  <h2 className="text-sm font-semibold" id="editor-heading">
                    SQL editor
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <label
                    className="text-xs font-medium text-[var(--foreground-muted)]"
                    htmlFor="sql-dialect"
                  >
                    Dialect
                  </label>
                  <select
                    className="h-10 cursor-pointer rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm font-medium text-[var(--foreground)] hover:border-[var(--border-strong)]"
                    id="sql-dialect"
                    onChange={handleDialectChange}
                    value={dialect}
                  >
                    {SQL_DIALECT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-md bg-[var(--accent)] px-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] active:opacity-90"
                  onClick={handleFormat}
                  title="Format SQL (Ctrl+Shift+F)"
                  type="button"
                >
                  <Paintbrush {...iconProps} />
                  Format
                </button>
                <button
                  className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3.5 text-sm font-medium transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] active:bg-[var(--surface-strong)]"
                  onClick={loadExample}
                  type="button"
                >
                  <Braces {...iconProps} />
                  Load example
                </button>
                <button
                  className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3.5 text-sm font-medium transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] active:bg-[var(--surface-strong)]"
                  onClick={clearEditor}
                  type="button"
                >
                  <Eraser {...iconProps} />
                  Clear
                </button>
              </div>
            </div>

            {isHydrated ? (
              <SqlEditorPanel
                onChange={handleQueryChange}
                onFormat={handleFormat}
                query={query}
                theme={theme}
              />
            ) : (
              <div className="min-h-[360px] md:min-h-[520px]">
                <div className="h-full min-h-[360px] animate-pulse bg-[#17201c] p-5 md:min-h-[520px]">
                  <span className="block h-3 w-3/4 rounded-sm bg-[#344139]" />
                  <span className="mt-3 block h-3 w-1/2 rounded-sm bg-[#344139]" />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-2.5 text-xs text-[var(--foreground-muted)]">
              <span aria-live="polite">{persistenceLabel}</span>
              <span>{characterCount} characters</span>
            </div>
          </section>

          <aside className="min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 lg:sticky lg:top-5">
            {query.trim().length === 0 ? (
              <div className="py-6 text-center">
                <FileCode2
                  aria-hidden="true"
                  className="mx-auto text-[var(--foreground-muted)]"
                  size={28}
                  strokeWidth={1.5}
                />
                <h2 className="mt-4 text-base font-semibold">
                  Start with a query
                </h2>
                <p className="mx-auto mt-2 max-w-[34ch] text-sm leading-6 text-[var(--foreground-muted)]">
                  Write SQL in the editor or load the tested PostgreSQL example.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                    <ShieldCheck {...iconProps} />
                  </span>
                  <div>
                    <h2 className="text-base font-semibold">
                      Private by default
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
                      Your SQL stays in this browser. It is formatted locally
                      and never executed.
                    </p>
                  </div>
                </div>

                <dl className="mt-6 space-y-4 border-t border-[var(--border)] pt-5 text-sm">
                  <div>
                    <dt className="font-medium">Editor</dt>
                    <dd className="mt-1 text-[var(--foreground-muted)]">
                      Monaco with SQL highlighting and line numbers
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Dialect support</dt>
                    <dd className="mt-1 text-[var(--foreground-muted)]">
                      PostgreSQL only in this milestone
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Current limitation</dt>
                    <dd className="mt-1 text-[var(--foreground-muted)]">
                      SQL is not parsed, visualized, or sent to a database
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 rounded-md bg-[var(--surface-subtle)] p-4">
                  <p className="text-xs font-semibold">
                    Example learning objective
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
                    {POSTGRESQL_EXAMPLE.learningObjective}
                  </p>
                </div>
              </>
            )}

            <div
              aria-live="polite"
              className={`mt-5 rounded-md border px-3 py-2.5 text-sm ${
                feedback.tone === "error"
                  ? "border-[var(--danger)] bg-[var(--danger-soft)] text-[var(--danger)]"
                  : feedback.tone === "success"
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-strong)]"
                    : "border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--foreground-muted)]"
              }`}
              role={feedback.tone === "error" ? "alert" : "status"}
            >
              {feedback.message}
            </div>

            {persistenceMessage ? (
              <p className="mt-3 text-sm text-[var(--danger)]" role="alert">
                {persistenceMessage}
              </p>
            ) : null}
          </aside>
        </div>

        <footer className="mt-6 flex flex-col gap-1 border-t border-[var(--border)] pt-4 text-xs leading-5 text-[var(--foreground-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>SQL is processed locally and is not executed.</span>
          <span>Milestones 0 and 1</span>
        </footer>
      </section>
    </main>
  );
}
