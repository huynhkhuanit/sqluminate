"use client";

import Editor, {
  loader,
  type BeforeMount,
  type OnMount,
} from "@monaco-editor/react";
import * as monaco from "monaco-editor/editor/editor.api.js";
import "monaco-editor/languages/definitions/sql/register.js";
import type { ColorTheme } from "@/features/sql-editor/hooks/use-color-theme";

loader.config({ monaco });

if (typeof window !== "undefined" && !window.MonacoEnvironment) {
  window.MonacoEnvironment = {
    getWorker() {
      return new Worker(
        new URL("monaco-editor/editor/editor.worker.js", import.meta.url),
        { type: "module" },
      );
    },
  };
}

interface MonacoSqlEditorProps {
  query: string;
  theme: ColorTheme;
  onChange: (query: string) => void;
  onFormat: () => void;
}

export function MonacoSqlEditor({
  query,
  theme,
  onChange,
  onFormat,
}: MonacoSqlEditorProps) {
  const handleBeforeMount: BeforeMount = (monacoInstance) => {
    monacoInstance.editor.defineTheme("sqluminate-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "string", foreground: "B42318" },
        { token: "string.sql", foreground: "B42318" },
      ],
      colors: {},
    });
    monacoInstance.editor.defineTheme("sqluminate-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "string", foreground: "FF8A80" },
        { token: "string.sql", foreground: "FF8A80" },
      ],
      colors: {},
    });
  };

  const handleMount: OnMount = (editor, monacoInstance) => {
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd |
        monacoInstance.KeyMod.Shift |
        monacoInstance.KeyCode.KeyF,
      onFormat,
    );
  };

  return (
    <Editor
      beforeMount={handleBeforeMount}
      height="100%"
      language="sql"
      onChange={(value) => onChange(value ?? "")}
      onMount={handleMount}
      options={{
        ariaLabel: "SQL editor",
        automaticLayout: true,
        fontFamily: "var(--font-mono), monospace",
        fontLigatures: true,
        fontSize: 14,
        lineHeight: 22,
        minimap: { enabled: false },
        padding: { top: 16, bottom: 16 },
        renderLineHighlight: "line",
        scrollBeyondLastLine: false,
        tabSize: 2,
        wordWrap: "on",
      }}
      theme={theme === "dark" ? "sqluminate-dark" : "sqluminate-light"}
      value={query}
    />
  );
}
