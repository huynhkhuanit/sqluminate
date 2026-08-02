import type { SqlLanguage } from "sql-formatter";

export type SqlDialect =
  "postgresql" | "mysql" | "sqlite" | "sqlserver" | "oracle";

export interface SqlDialectOption {
  value: SqlDialect;
  label: string;
  supportLabel: string;
  formatterLanguage: SqlLanguage;
}

export const SQL_DIALECT_OPTIONS: readonly SqlDialectOption[] = [
  {
    value: "postgresql",
    label: "PostgreSQL",
    supportLabel: "Formatting and preview",
    formatterLanguage: "postgresql",
  },
  {
    value: "mysql",
    label: "MySQL",
    supportLabel: "Formatting and preview",
    formatterLanguage: "mysql",
  },
  {
    value: "sqlite",
    label: "SQLite",
    supportLabel: "Formatting and preview",
    formatterLanguage: "sqlite",
  },
  {
    value: "sqlserver",
    label: "SQL Server",
    supportLabel: "Formatting and preview",
    formatterLanguage: "transactsql",
  },
  {
    value: "oracle",
    label: "Oracle",
    supportLabel: "Formatting and preview",
    formatterLanguage: "plsql",
  },
];

export function isSqlDialect(value: string): value is SqlDialect {
  return SQL_DIALECT_OPTIONS.some((option) => option.value === value);
}

export function getSqlFormatterLanguage(dialect: SqlDialect): SqlLanguage {
  return (
    SQL_DIALECT_OPTIONS.find((option) => option.value === dialect)
      ?.formatterLanguage ?? "sql"
  );
}
