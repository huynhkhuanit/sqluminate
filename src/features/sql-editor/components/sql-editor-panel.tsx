"use client";

import dynamic from "next/dynamic";
import { EditorErrorBoundary } from "@/features/sql-editor/components/editor-error-boundary";
import { EditorLoading } from "@/features/sql-editor/components/editor-loading";
import type { ColorTheme } from "@/features/sql-editor/hooks/use-color-theme";

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
  query: string;
  theme: ColorTheme;
  onChange: (query: string) => void;
  onFormat: () => void;
}

export function SqlEditorPanel(props: SqlEditorPanelProps) {
  return (
    <EditorErrorBoundary query={props.query} onChange={props.onChange}>
      <div className="h-[420px] overflow-hidden bg-[var(--surface)] md:h-[520px]">
        <MonacoSqlEditor {...props} />
      </div>
    </EditorErrorBoundary>
  );
}
