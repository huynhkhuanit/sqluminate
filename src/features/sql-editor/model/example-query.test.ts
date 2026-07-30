import { describe, expect, it } from "vitest";
import { POSTGRESQL_EXAMPLE } from "@/features/sql-editor/model/example-query";

describe("PostgreSQL example", () => {
  it("contains the clauses promised by its learning objective", () => {
    expect(POSTGRESQL_EXAMPLE.dialect).toBe("postgresql");
    expect(POSTGRESQL_EXAMPLE.sql).toMatch(/inner join/i);
    expect(POSTGRESQL_EXAMPLE.sql).toMatch(/where/i);
    expect(POSTGRESQL_EXAMPLE.sql).toMatch(/group by/i);
    expect(POSTGRESQL_EXAMPLE.sql).toMatch(/having/i);
    expect(POSTGRESQL_EXAMPLE.sql).toMatch(/order by/i);
  });
});
