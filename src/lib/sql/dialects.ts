export type SqlDialect = "postgresql";

export interface SqlDialectOption {
  value: SqlDialect;
  label: string;
  supportLabel: string;
}

export const SQL_DIALECT_OPTIONS: readonly SqlDialectOption[] = [
  {
    value: "postgresql",
    label: "PostgreSQL",
    supportLabel: "Primary support",
  },
];

export function isSqlDialect(value: string): value is SqlDialect {
  return SQL_DIALECT_OPTIONS.some((option) => option.value === value);
}
