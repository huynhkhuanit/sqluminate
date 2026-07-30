import { format } from "sql-formatter";
import type { SqlDialect } from "@/lib/sql/dialects";

export type FormatSqlResult =
  | {
      ok: true;
      sql: string;
    }
  | {
      ok: false;
      message: string;
    };

export function formatSql(sql: string, dialect: SqlDialect): FormatSqlResult {
  try {
    return {
      ok: true,
      sql: format(sql, {
        language: dialect,
        keywordCase: "upper",
        dataTypeCase: "upper",
        functionCase: "upper",
        tabWidth: 2,
        linesBetweenQueries: 1,
      }),
    };
  } catch (error: unknown) {
    const details =
      error instanceof Error ? error.message : "Unknown formatter failure.";

    return {
      ok: false,
      message: `Formatting failed. ${details}`,
    };
  }
}
