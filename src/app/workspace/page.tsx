import type { Metadata } from "next";
import { SqlWorkbench } from "@/features/sql-editor";

export const metadata: Metadata = {
  title: "Workspace | SQLuminate",
  description: "Write and format PostgreSQL locally in your browser.",
};

export default function WorkspacePage() {
  return <SqlWorkbench />;
}
