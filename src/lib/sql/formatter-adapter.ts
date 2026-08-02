import { format } from "sql-formatter";
import { getSqlFormatterLanguage, type SqlDialect } from "@/lib/sql/dialects";

export type FormatSqlResult =
  | {
      ok: true;
      sql: string;
    }
  | {
      ok: false;
      message: string;
    };

export interface FormatSqlOptions {
  failurePrefix?: string;
}

export function formatSql(
  sql: string,
  dialect: SqlDialect,
  options: FormatSqlOptions = {},
): FormatSqlResult {
  try {
    return {
      ok: true,
      sql: format(sql, {
        language: getSqlFormatterLanguage(dialect),
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
      message: `${options.failurePrefix ?? "Formatting failed."} ${details}`,
    };
  }
}
