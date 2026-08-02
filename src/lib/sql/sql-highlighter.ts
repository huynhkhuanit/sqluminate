import type { SqlDialect } from "@/lib/sql/dialects";

export type SqlTokenKind =
  | "comment"
  | "function"
  | "identifier"
  | "keyword"
  | "number"
  | "operator"
  | "plain"
  | "punctuation"
  | "string";

export interface SqlToken {
  kind: SqlTokenKind;
  value: string;
}

const commonKeywords = new Set([
  "ALL",
  "ALTER",
  "AND",
  "AS",
  "ASC",
  "BEGIN",
  "BETWEEN",
  "BY",
  "CASE",
  "CAST",
  "COMMIT",
  "CONSTRAINT",
  "CREATE",
  "CROSS",
  "DELETE",
  "DESC",
  "DISTINCT",
  "DROP",
  "ELSE",
  "END",
  "EXCEPT",
  "EXISTS",
  "FETCH",
  "FOREIGN",
  "FROM",
  "FULL",
  "GROUP",
  "HAVING",
  "IN",
  "INDEX",
  "INNER",
  "INSERT",
  "INTERSECT",
  "INTO",
  "IS",
  "JOIN",
  "KEY",
  "LEFT",
  "LIKE",
  "LIMIT",
  "NOT",
  "NULL",
  "OFFSET",
  "ON",
  "OR",
  "ORDER",
  "OUTER",
  "PRIMARY",
  "REFERENCES",
  "RETURNING",
  "RIGHT",
  "ROLLBACK",
  "SELECT",
  "SET",
  "TABLE",
  "THEN",
  "UNION",
  "UNIQUE",
  "UPDATE",
  "VALUES",
  "VIEW",
  "WHEN",
  "WHERE",
  "WITH",
  "WITHIN",
]);

const dialectKeywords: Record<SqlDialect, ReadonlySet<string>> = {
  postgresql: new Set([
    "ILIKE",
    "JSONB",
    "LATERAL",
    "MATERIALIZED",
    "SERIAL",
    "RETURNING",
  ]),
  mysql: new Set([
    "AUTO_INCREMENT",
    "DESCRIBE",
    "REGEXP",
    "SHOW",
    "STRAIGHT_JOIN",
    "UNSIGNED",
  ]),
  sqlite: new Set([
    "AUTOINCREMENT",
    "GLOB",
    "PRAGMA",
    "RECURSIVE",
    "VACUUM",
    "VIRTUAL",
    "WITHOUT",
  ]),
  sqlserver: new Set([
    "GO",
    "IDENTITY",
    "MERGE",
    "NVARCHAR",
    "OUTPUT",
    "ROW_NUMBER",
    "TOP",
  ]),
  oracle: new Set([
    "CONNECT",
    "NUMBER",
    "PRIOR",
    "ROWNUM",
    "START",
    "SYSDATE",
    "VARCHAR2",
  ]),
};

const knownFunctions = new Set([
  "AVG",
  "COALESCE",
  "COUNT",
  "DATE",
  "GROUP_CONCAT",
  "LOWER",
  "MAX",
  "MIN",
  "NULLIF",
  "ROUND",
  "SUM",
  "UPPER",
]);

const operators = [
  "#>>",
  "#>",
  "->>",
  "->",
  "::",
  "||",
  "<> ".trim(),
  "!=",
  "<=",
  ">=",
  "**",
  "&&",
  "@>",
  "<@",
];

function isWordStart(character: string): boolean {
  return /[A-Za-z_$]/.test(character);
}

function isWordPart(character: string): boolean {
  return /[A-Za-z0-9_$]/.test(character);
}

function isDigit(character: string): boolean {
  return /[0-9]/.test(character);
}

function readQuotedValue(sql: string, start: number): number {
  const opening = sql[start];
  const closing = opening === "[" ? "]" : opening;
  let index = start + 1;

  while (index < sql.length) {
    if (sql[index] === closing) {
      if (sql[index + 1] === closing && opening !== "[") {
        index += 2;
        continue;
      }

      return index + 1;
    }

    index += 1;
  }

  return sql.length;
}

function readNumber(sql: string, start: number): number {
  let index = start;

  while (index < sql.length && /[0-9A-Fa-fxX._]/.test(sql[index])) {
    index += 1;
  }

  return index;
}

function readWord(sql: string, start: number): number {
  let index = start + 1;

  while (index < sql.length && isWordPart(sql[index])) {
    index += 1;
  }

  return index;
}

function nextNonWhitespace(sql: string, start: number): string | undefined {
  let index = start;

  while (index < sql.length && /\s/.test(sql[index])) {
    index += 1;
  }

  return sql[index];
}

function getWordKind(
  word: string,
  sql: string,
  end: number,
  dialect: SqlDialect,
): SqlTokenKind {
  const normalizedWord = word.toUpperCase();

  if (
    commonKeywords.has(normalizedWord) ||
    dialectKeywords[dialect].has(normalizedWord)
  ) {
    return "keyword";
  }

  if (
    knownFunctions.has(normalizedWord) ||
    nextNonWhitespace(sql, end) === "("
  ) {
    return "function";
  }

  return "plain";
}

function pushToken(tokens: SqlToken[], kind: SqlTokenKind, value: string) {
  if (value.length > 0) {
    tokens.push({ kind, value });
  }
}

export function tokenizeSql(sql: string, dialect: SqlDialect): SqlToken[] {
  const tokens: SqlToken[] = [];
  let index = 0;

  while (index < sql.length) {
    const character = sql[index];
    const nextCharacter = sql[index + 1];

    if (character === "\n") {
      pushToken(tokens, "plain", "\n");
      index += 1;
      continue;
    }

    if (character === "\r") {
      pushToken(tokens, "plain", "\r");
      index += 1;
      continue;
    }

    if (
      (character === "-" && nextCharacter === "-") ||
      (character === "#" && dialect === "mysql")
    ) {
      const lineEnd = sql.indexOf("\n", index);
      const end = lineEnd === -1 ? sql.length : lineEnd;
      pushToken(tokens, "comment", sql.slice(index, end));
      index = end;
      continue;
    }

    if (character === "/" && nextCharacter === "*") {
      const commentEnd = sql.indexOf("*/", index + 2);
      const end = commentEnd === -1 ? sql.length : commentEnd + 2;
      pushToken(tokens, "comment", sql.slice(index, end));
      index = end;
      continue;
    }

    if (character === "'") {
      const end = readQuotedValue(sql, index);
      pushToken(tokens, "string", sql.slice(index, end));
      index = end;
      continue;
    }

    if (
      character === '"' ||
      character === "`" ||
      (character === "[" && dialect === "sqlserver")
    ) {
      const end = readQuotedValue(sql, index);
      pushToken(tokens, "identifier", sql.slice(index, end));
      index = end;
      continue;
    }

    if (isDigit(character)) {
      const end = readNumber(sql, index);
      pushToken(tokens, "number", sql.slice(index, end));
      index = end;
      continue;
    }

    if (isWordStart(character)) {
      const end = readWord(sql, index);
      const word = sql.slice(index, end);
      pushToken(tokens, getWordKind(word, sql, end, dialect), word);
      index = end;
      continue;
    }

    const operator = operators.find((candidate) =>
      sql.startsWith(candidate, index),
    );
    if (operator || "=<>+-*/%|&^!~".includes(character)) {
      const value = operator ?? character;
      pushToken(tokens, "operator", value);
      index += value.length;
      continue;
    }

    if (",.;()[]".includes(character)) {
      pushToken(tokens, "punctuation", character);
      index += 1;
      continue;
    }

    pushToken(tokens, "plain", character);
    index += 1;
  }

  return tokens;
}

export function highlightSql(sql: string, dialect: SqlDialect): SqlToken[][] {
  const lines: SqlToken[][] = [[]];

  for (const token of tokenizeSql(sql, dialect)) {
    const parts = token.value.split("\n");

    parts.forEach((part, index) => {
      pushToken(lines[lines.length - 1], token.kind, part);

      if (index < parts.length - 1) {
        lines.push([]);
      }
    });
  }

  return lines;
}
