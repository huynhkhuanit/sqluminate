import { describe, expect, it } from "vitest";
import { highlightSql, tokenizeSql } from "@/lib/sql/sql-highlighter";

describe("SQL highlighter", () => {
  it("classifies common SQL tokens and preserves comments and strings", () => {
    const tokens = tokenizeSql(
      "select count(id) from users where name = 'Ada' -- local sample",
      "postgresql",
    );

    expect(tokens).toContainEqual({ kind: "keyword", value: "select" });
    expect(tokens).toContainEqual({ kind: "function", value: "count" });
    expect(tokens).toContainEqual({ kind: "string", value: "'Ada'" });
    expect(tokens).toContainEqual({
      kind: "comment",
      value: "-- local sample",
    });
  });

  it("recognizes dialect-specific keywords", () => {
    expect(
      tokenizeSql("select top 10 * from users", "sqlserver"),
    ).toContainEqual({ kind: "keyword", value: "top" });
    expect(tokenizeSql("pragma foreign_keys = on", "sqlite")).toContainEqual({
      kind: "keyword",
      value: "pragma",
    });
    expect(tokenizeSql("show tables", "mysql")).toContainEqual({
      kind: "keyword",
      value: "show",
    });
    expect(tokenizeSql("select rownum from users", "oracle")).toContainEqual({
      kind: "keyword",
      value: "rownum",
    });
  });

  it("returns line-aware tokens for reusable code blocks", () => {
    const lines = highlightSql("select id\nfrom users", "postgresql");

    expect(lines).toHaveLength(2);
    expect(lines[0]).toContainEqual({ kind: "keyword", value: "select" });
    expect(lines[1]).toContainEqual({ kind: "keyword", value: "from" });
  });
});
