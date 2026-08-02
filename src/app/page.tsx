import { LandingPage } from "@/features/landing";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getRequestLocale } from "@/lib/i18n/server";

export default async function HomePage() {
  const locale = await getRequestLocale();

  return <LandingPage dictionary={getDictionary(locale)} />;
}
