import type { Metadata } from "next";
import { SqlWorkbench } from "@/features/sql-editor";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getRequestLocale } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.metadata.workspaceTitle,
    description: dictionary.metadata.workspaceDescription,
  };
}

export default function WorkspacePage() {
  return <SqlWorkbench />;
}
