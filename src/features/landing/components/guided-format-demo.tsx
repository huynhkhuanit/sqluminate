"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { ProductPreview } from "@/features/landing/components/product-preview";
import { SQL_EXAMPLES } from "@/features/sql-editor/model/example-query";
import { SQL_DIALECT_OPTIONS, type SqlDialect } from "@/lib/sql/dialects";

type PreviewMode = "before" | "formatted";
type StatusTone = "neutral" | "success" | "error";

interface DemoStatus {
  message: string;
  tone: StatusTone;
}

export function GuidedFormatDemo() {
  const { dictionary } = useI18n();
  const copy = dictionary.landing.demo;
  const formattingFailed = dictionary.workspace.feedback.formattingFailed;
  const [dialect, setDialect] = useState<SqlDialect>("postgresql");
  const [formattedSql, setFormattedSql] = useState<string | null>(null);
  const [isFormatting, setIsFormatting] = useState(false);
  const [mode, setMode] = useState<PreviewMode>("before");
  const [status, setStatus] = useState<DemoStatus>({
    message: copy.ready,
    tone: "neutral",
  });

  const example = SQL_EXAMPLES[dialect];

  const handleFormat = useCallback(async () => {
    setIsFormatting(true);
    setStatus({ message: copy.formattingLocally, tone: "neutral" });

    try {
      const { formatSql } = await import("@/lib/sql/formatter-adapter");
      const result = formatSql(example.sql, example.dialect, {
        failurePrefix: formattingFailed,
      });

      if (!result.ok) {
        setStatus({ message: result.message, tone: "error" });
        return;
      }

      setFormattedSql(result.sql);
      setMode("formatted");
      setStatus({ message: copy.formattedLocally, tone: "success" });
    } catch {
      setStatus({
        message: copy.formatterUnavailable,
        tone: "error",
      });
    } finally {
      setIsFormatting(false);
    }
  }, [copy, example, formattingFailed]);

  function handleModeChange(nextMode: PreviewMode) {
    if (nextMode === "formatted" && formattedSql === null) {
      setStatus({ message: copy.formatFirst, tone: "neutral" });
      return;
    }

    setMode(nextMode);
    setStatus({
      message:
        nextMode === "formatted" ? copy.showingFormatted : copy.showingOriginal,
      tone: "neutral",
    });
  }

  function handleDialectChange(nextDialect: SqlDialect) {
    setDialect(nextDialect);
    setFormattedSql(null);
    setMode("before");
    setStatus({ message: copy.ready, tone: "neutral" });
  }

  const displaySql =
    mode === "formatted" && formattedSql !== null ? formattedSql : example.sql;

  return (
    <ProductPreview
      copy={copy}
      dialect={dialect}
      dialectLabels={dictionary.dialects}
      dialectOptions={SQL_DIALECT_OPTIONS}
      displaySql={displaySql}
      isFormatted={mode === "formatted" && formattedSql !== null}
      isFormattedAvailable={formattedSql !== null}
      isFormatting={isFormatting}
      onDialectChange={handleDialectChange}
      onFormat={handleFormat}
      onModeChange={handleModeChange}
      statusMessage={status.message}
      statusTone={status.tone}
    />
  );
}
