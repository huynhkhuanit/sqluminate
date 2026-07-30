import { describe, expect, it } from "vitest";
import { formatSql } from "@/lib/sql/formatter-adapter";

describe("formatSql", () => {
  it("formats PostgreSQL with readable clauses and uppercase keywords", () => {
    const result = formatSql(
      "select id,name from users where active=true order by name;",
      "postgresql",
    );

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.sql).toContain("SELECT");
      expect(result.sql).toContain("FROM\n  users");
      expect(result.sql).toContain("WHERE");
      expect(result.sql).toContain("ORDER BY");
      expect(result.sql).toContain("active = TRUE");
    }
  });

  it("returns a typed failure without replacing the source SQL", () => {
    const result = formatSql("select 'unterminated", "postgresql");

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.message).toMatch(/^Formatting failed\./);
    }
  });
});
