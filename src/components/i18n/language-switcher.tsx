"use client";

import { ChevronDown } from "lucide-react";
import { LOCALE_OPTIONS, normalizeLocale } from "@/lib/i18n/dictionaries";
import { useI18n, useTranslations } from "@/components/i18n/i18n-provider";
import styles from "@/components/i18n/language-switcher.module.css";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const translate = useTranslations("language");

  return (
    <label className={styles.root}>
      <span className="sr-only">{translate("label")}</span>
      <select
        aria-label={translate("label")}
        className={styles.select}
        onChange={(event) => setLocale(normalizeLocale(event.target.value))}
        title={translate("switchTo")}
        value={locale}
      >
        {LOCALE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.flag} {option.nativeLabel}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className={styles.chevron} size={14} />
    </label>
  );
}
