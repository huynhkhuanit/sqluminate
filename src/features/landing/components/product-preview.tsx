import { Check, FileCode2, Paintbrush } from "lucide-react";
import { SqlCodeBlock } from "@/components/ui/sql-code-block";
import type { AppDictionary } from "@/lib/i18n/dictionaries";
import {
  isSqlDialect,
  type SqlDialect,
  type SqlDialectOption,
} from "@/lib/sql/dialects";
import styles from "@/features/landing/components/landing-page.module.css";

type PreviewMode = "before" | "formatted";
type StatusTone = "neutral" | "success" | "error";

interface ProductPreviewProps {
  copy: AppDictionary["landing"]["demo"];
  dialect: SqlDialect;
  dialectLabels: AppDictionary["dialects"];
  dialectOptions: readonly SqlDialectOption[];
  displaySql: string;
  isFormatting: boolean;
  isFormatted: boolean;
  isFormattedAvailable: boolean;
  onDialectChange: (dialect: SqlDialect) => void;
  onFormat: () => void;
  onModeChange: (mode: PreviewMode) => void;
  statusMessage: string;
  statusTone: StatusTone;
}

const iconProps = {
  "aria-hidden": true,
  size: 15,
  strokeWidth: 1.8,
} as const;

export function ProductPreview({
  copy,
  dialect,
  dialectLabels,
  dialectOptions,
  displaySql,
  isFormatting,
  isFormatted,
  isFormattedAvailable,
  onDialectChange,
  onFormat,
  onModeChange,
  statusMessage,
  statusTone,
}: ProductPreviewProps) {
  return (
    <div
      aria-busy={isFormatting}
      aria-describedby="guided-format-status"
      className={styles.previewFrame}
    >
      <div className={styles.previewChrome}>
        <div className={styles.previewChromeLeft}>
          <span aria-hidden="true" className={styles.windowDots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.previewFileLabel}>{copy.fileName}</span>
        </div>
        <span className={styles.previewLocalLabel}>{copy.localOnly}</span>
      </div>

      <div className={styles.previewToolbar}>
        <div
          aria-label={copy.previewMode}
          className={styles.segmentedControl}
          role="group"
        >
          <button
            aria-pressed={!isFormatted}
            className={`${styles.segmentButton} ${!isFormatted ? styles.segmentButtonActive : ""}`}
            onClick={() => onModeChange("before")}
            type="button"
          >
            {copy.before}
          </button>
          <button
            aria-pressed={isFormatted}
            className={`${styles.segmentButton} ${isFormatted ? styles.segmentButtonActive : ""}`}
            disabled={!isFormattedAvailable}
            onClick={() => onModeChange("formatted")}
            type="button"
          >
            {copy.formatted}
          </button>
        </div>
        <button
          aria-busy={isFormatting}
          className={`${styles.button} ${styles.buttonPrimary} ${styles.previewFormatButton}`}
          disabled={isFormatting}
          onClick={onFormat}
          type="button"
        >
          <Paintbrush {...iconProps} />
          <span>{isFormatting ? copy.formatting : copy.formatExample}</span>
        </button>
        <label className={styles.previewDialect}>
          <span>{copy.dialect}</span>
          <select
            aria-label={copy.dialect}
            onChange={(event) => {
              if (isSqlDialect(event.target.value)) {
                onDialectChange(event.target.value);
              }
            }}
            value={dialect}
          >
            {dialectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {dialectLabels[option.value]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.previewBody}>
        <div className={styles.codePane} data-formatting={isFormatting}>
          <div className={styles.codePaneHeader}>
            <span>
              <FileCode2 {...iconProps} />
              {dialectLabels[dialect]}
            </span>
            <span>{copy.sampleQuery}</span>
          </div>
          <SqlCodeBlock
            ariaLabel={`${dialectLabels[dialect]} ${copy.previewAria}`}
            className={styles.codeBlock}
            dialect={dialect}
            sql={displaySql}
          />
        </div>

        <aside aria-label={copy.testedExample} className={styles.previewAside}>
          <span className={styles.previewAsideLabel}>{copy.testedExample}</span>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
          <dl className={styles.previewFacts}>
            <div>
              <dt>{copy.dialect}</dt>
              <dd>{dialectLabels[dialect]}</dd>
            </div>
            <div>
              <dt>{copy.processing}</dt>
              <dd>{copy.inBrowser}</dd>
            </div>
            <div>
              <dt>{copy.database}</dt>
              <dd>{copy.notConnected}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <p
        aria-live="polite"
        className={styles.demoStatus}
        data-tone={statusTone}
        id="guided-format-status"
        role={statusTone === "error" ? "alert" : "status"}
      >
        {statusTone === "success" ? <Check {...iconProps} /> : null}
        <span>{statusMessage}</span>
      </p>
    </div>
  );
}
