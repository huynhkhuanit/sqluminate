import { highlightSql, type SqlToken } from "@/lib/sql/sql-highlighter";
import type { SqlDialect } from "@/lib/sql/dialects";
import styles from "@/components/ui/sql-code-block.module.css";

interface SqlCodeBlockProps {
  sql: string;
  dialect: SqlDialect;
  ariaLabel: string;
  className?: string;
}

function tokenClassName(token: SqlToken): string {
  return styles[`token${token.kind[0].toUpperCase()}${token.kind.slice(1)}`];
}

export function SqlCodeBlock({
  sql,
  dialect,
  ariaLabel,
  className,
}: SqlCodeBlockProps) {
  const lines = highlightSql(sql, dialect);
  const codeBlockClassName = [styles.codeBlock, className]
    .filter(Boolean)
    .join(" ");

  return (
    <pre
      aria-label={ariaLabel}
      className={codeBlockClassName}
      data-sql-dialect={dialect}
    >
      <code>
        {lines.map((tokens, lineIndex) => (
          <span className={styles.codeLine} key={`line-${lineIndex}`}>
            <span aria-hidden="true" className={styles.lineNumber}>
              {String(lineIndex + 1).padStart(2, "0")}
            </span>
            <span className={styles.lineText}>
              {tokens.length > 0
                ? tokens.map((token, tokenIndex) => (
                    <span
                      className={tokenClassName(token)}
                      key={`${lineIndex}-${tokenIndex}-${token.value}`}
                    >
                      {token.value}
                    </span>
                  ))
                : " "}
            </span>
          </span>
        ))}
      </code>
    </pre>
  );
}
