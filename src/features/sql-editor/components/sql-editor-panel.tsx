"use client";

import dynamic from "next/dynamic";
import { EditorErrorBoundary } from "@/features/sql-editor/components/editor-error-boundary";
import { EditorLoading } from "@/features/sql-editor/components/editor-loading";
import type { ColorTheme } from "@/features/sql-editor/hooks/use-color-theme";
import type { SqlDialect } from "@/lib/sql/dialects";

const MonacoSqlEditor = dynamic(
  () =>
    import("@/features/sql-editor/components/monaco-sql-editor").then(
      (module) => module.MonacoSqlEditor,
    ),
  {
    ssr: false,
    loading: EditorLoading,
  },
);

interface SqlEditorPanelProps {
  dialect: SqlDialect;
  editorAriaLabel: string;
  query: string;
  theme: ColorTheme;
  onChange: (query: string) => void;
  onFormat: () => void;
}

export function SqlEditorPanel(props: SqlEditorPanelProps) {
  const { dialect, ...editorProps } = props;

  return (
    <EditorErrorBoundary
      query={editorProps.query}
      onChange={editorProps.onChange}
    >
      <div
        className="h-[420px] overflow-hidden bg-[var(--surface)] md:h-[520px]"
        data-sql-dialect={dialect}
      >
        <MonacoSqlEditor {...editorProps} />
      </div>
    </EditorErrorBoundary>
  );
}
