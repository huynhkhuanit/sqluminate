"use client";

import {
  createContext,
  startTransition,
  useContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  getDictionary,
  getDictionaryValue,
  LOCALE_COOKIE_NAME,
  LOCALE_STORAGE_KEY,
  type AppDictionary,
  type Locale,
  normalizeLocale,
} from "@/lib/i18n/dictionaries";

interface I18nContextValue {
  locale: Locale;
  dictionary: AppDictionary;
  setLocale: (locale: Locale) => void;
}

const defaultContextValue: I18nContextValue = {
  locale: "en",
  dictionary: getDictionary("en"),
  setLocale: () => undefined,
};

const I18nContext = createContext<I18nContextValue>(defaultContextValue);

interface I18nProviderProps {
  initialLocale: Locale;
  children: ReactNode;
}

export function I18nProvider({ initialLocale, children }: I18nProviderProps) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      const normalizedLocale = normalizeLocale(nextLocale);

      if (normalizedLocale === locale) {
        return;
      }

      document.cookie = `${LOCALE_COOKIE_NAME}=${normalizedLocale}; path=/; max-age=31536000; SameSite=Lax`;

      try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, normalizedLocale);
      } catch {
        // Cookie persistence remains the source of truth when storage is unavailable.
      }

      setLocaleState(normalizedLocale);
      startTransition(() => router.refresh());
    },
    [locale, router],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dictionary: getDictionary(locale),
      setLocale,
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}

export function useTranslations(namespace?: string) {
  const { dictionary } = useI18n();

  return (key: string): string =>
    getDictionaryValue(dictionary, namespace ? `${namespace}.${key}` : key);
}
