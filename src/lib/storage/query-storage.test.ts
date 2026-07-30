import { describe, expect, it, vi } from "vitest";
import {
  MAX_SQL_LENGTH,
  QUERY_STORAGE_KEY,
  readStoredQuery,
  writeStoredQuery,
} from "@/lib/storage/query-storage";

describe("query storage", () => {
  it("reads and writes the query under the versioned key", () => {
    const getItem = vi.fn(() => "select 1;");
    const setItem = vi.fn();

    expect(readStoredQuery({ getItem })).toEqual({
      ok: true,
      value: "select 1;",
    });
    expect(getItem).toHaveBeenCalledWith(QUERY_STORAGE_KEY);

    expect(writeStoredQuery({ setItem }, "select 2;")).toEqual({
      ok: true,
    });
    expect(setItem).toHaveBeenCalledWith(QUERY_STORAGE_KEY, "select 2;");
  });

  it("returns a clear error when browser storage is blocked", () => {
    const getItem = vi.fn(() => {
      throw new Error("blocked");
    });
    const setItem = vi.fn(() => {
      throw new Error("blocked");
    });

    expect(readStoredQuery({ getItem })).toEqual({
      ok: false,
      message: "Browser storage is unavailable. Changes will not be saved.",
    });
    expect(writeStoredQuery({ setItem }, "select 1;")).toEqual({
      ok: false,
      message: "Browser storage is unavailable. Changes will not be saved.",
    });
  });

  it("rejects oversized saved and edited queries", () => {
    const oversizedQuery = "x".repeat(MAX_SQL_LENGTH + 1);

    expect(
      readStoredQuery({
        getItem: () => oversizedQuery,
      }),
    ).toEqual({
      ok: false,
      message:
        "The saved query is larger than the 100,000 character safety limit.",
    });
    expect(
      writeStoredQuery(
        {
          setItem: vi.fn(),
        },
        oversizedQuery,
      ),
    ).toEqual({
      ok: false,
      message: "Queries are limited to 100,000 characters for browser safety.",
    });
  });
});
