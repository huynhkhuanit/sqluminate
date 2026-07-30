"use client";

import { useEffect, useState } from "react";

export type ColorTheme = "light" | "dark";

const THEME_STORAGE_KEY = "sqluminate.theme.v1";

function getPreferredTheme(): ColorTheme {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
  } catch (error: unknown) {
    console.warn("Theme preference could not be read.", error);
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useColorTheme() {
  const [theme, setTheme] = useState<ColorTheme>("light");

  useEffect(() => {
    const themeTimer = window.setTimeout(() => {
      const preferredTheme = getPreferredTheme();
      setTheme(preferredTheme);
      document.documentElement.dataset.theme = preferredTheme;
    }, 0);

    return () => window.clearTimeout(themeTimer);
  }, []);

  function toggleTheme() {
    const nextTheme: ColorTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error: unknown) {
      console.warn("Theme preference could not be saved.", error);
    }
  }

  return {
    theme,
    toggleTheme,
  };
}
