export const QUERY_STORAGE_KEY = "sqluminate.query.v1";
export const MAX_SQL_LENGTH = 100_000;

interface QueryStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export type ReadStoredQueryResult =
  | {
      ok: true;
      value: string | null;
    }
  | {
      ok: false;
      message: string;
    };

export type WriteStoredQueryResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      message: string;
    };

export function readStoredQuery(
  storage: Pick<QueryStorage, "getItem">,
): ReadStoredQueryResult {
  try {
    const savedQuery = storage.getItem(QUERY_STORAGE_KEY);

    if (savedQuery !== null && savedQuery.length > MAX_SQL_LENGTH) {
      return {
        ok: false,
        message:
          "The saved query is larger than the 100,000 character safety limit.",
      };
    }

    return {
      ok: true,
      value: savedQuery,
    };
  } catch {
    return {
      ok: false,
      message: "Browser storage is unavailable. Changes will not be saved.",
    };
  }
}

export function writeStoredQuery(
  storage: Pick<QueryStorage, "setItem">,
  query: string,
): WriteStoredQueryResult {
  if (query.length > MAX_SQL_LENGTH) {
    return {
      ok: false,
      message: "Queries are limited to 100,000 characters for browser safety.",
    };
  }

  try {
    storage.setItem(QUERY_STORAGE_KEY, query);

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "Browser storage is unavailable. Changes will not be saved.",
    };
  }
}
