import { cookies } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  normalizeLocale,
  type Locale,
} from "@/lib/i18n/dictionaries";

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  return localeCookie ? normalizeLocale(localeCookie) : DEFAULT_LOCALE;
}
