"use client";

import { useCallback, useEffect, useState } from "react";
import { readStoredQuery, writeStoredQuery } from "@/lib/storage/query-storage";

export type PersistenceState = "loading" | "saving" | "saved" | "error";

export interface PersistedQueryState {
  query: string;
  setQuery: (query: string) => void;
  isHydrated: boolean;
  persistenceState: PersistenceState;
  persistenceMessage?: string;
}

const SAVE_DELAY_MS = 300;

export function usePersistedQuery(initialQuery: string): PersistedQueryState {
  const [query, setQuery] = useState(initialQuery);
  const [isHydrated, setIsHydrated] = useState(false);
  const [persistenceState, setPersistenceState] =
    useState<PersistenceState>("loading");
  const [persistenceMessage, setPersistenceMessage] = useState<string>();

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      const result = readStoredQuery(window.localStorage);

      if (result.ok) {
        if (result.value !== null) {
          setQuery(result.value);
        }
        setPersistenceState("saved");
      } else {
        setPersistenceState("error");
        setPersistenceMessage(result.message);
      }

      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const saveTimer = window.setTimeout(() => {
      const result = writeStoredQuery(window.localStorage, query);

      if (result.ok) {
        setPersistenceState("saved");
        setPersistenceMessage(undefined);
      } else {
        setPersistenceState("error");
        setPersistenceMessage(result.message);
      }
    }, SAVE_DELAY_MS);

    return () => window.clearTimeout(saveTimer);
  }, [isHydrated, query]);

  const updateQuery = useCallback(
    (nextQuery: string) => {
      setQuery(nextQuery);

      if (isHydrated) {
        setPersistenceState("saving");
      }
    },
    [isHydrated],
  );

  return {
    query,
    setQuery: updateQuery,
    isHydrated,
    persistenceState,
    persistenceMessage,
  };
}
