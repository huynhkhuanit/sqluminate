import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { I18nProvider } from "@/components/i18n/i18n-provider";
import { getDictionary, type Locale } from "@/lib/i18n/dictionaries";
import { getRequestLocale } from "@/lib/i18n/server";
import "./globals.css";

const sansFont = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.metadata.siteTitle,
    description: dictionary.metadata.siteDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale: Locale = await getRequestLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${sansFont.variable} ${monoFont.variable}`}
        suppressHydrationWarning
      >
        <I18nProvider initialLocale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
