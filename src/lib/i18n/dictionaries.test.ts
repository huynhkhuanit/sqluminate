import { describe, expect, it } from "vitest";
import {
  getDictionary,
  getDictionaryValue,
  LOCALE_OPTIONS,
  normalizeLocale,
  SUPPORTED_LOCALES,
} from "@/lib/i18n/dictionaries";

describe("i18n dictionaries", () => {
  it("normalizes supported locale tags and falls back to English", () => {
    expect(normalizeLocale("vi-VN")).toBe("vi");
    expect(normalizeLocale("zh-CN")).toBe("zh");
    expect(normalizeLocale("en-US")).toBe("en");
    expect(normalizeLocale("fr-FR")).toBe("en");
    expect(normalizeLocale(null)).toBe("en");
  });

  it("keeps a complete dictionary for every supported locale", () => {
    for (const locale of SUPPORTED_LOCALES) {
      const dictionary = getDictionary(locale);

      expect(dictionary.metadata.siteTitle).toBeTruthy();
      expect(dictionary.landing.header.openWorkspace).toBeTruthy();
      expect(dictionary.workspace.feedback.formatted).toBeTruthy();
    }
  });

  it("exposes flag and native-name choices for the language control", () => {
    expect(LOCALE_OPTIONS.map((option) => option.value)).toEqual([
      "en",
      "vi",
      "zh",
    ]);
    expect(LOCALE_OPTIONS.map((option) => option.flag)).toEqual([
      "🇬🇧",
      "🇻🇳",
      "🇨🇳",
    ]);
    expect(
      getDictionaryValue(getDictionary("vi"), "landing.hero.titleStart"),
    ).toBe("Trực quan hóa SQL.");
  });
});
