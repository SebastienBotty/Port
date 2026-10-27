import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "../../portfolio/projects";
import { SITE_URL } from "../../portfolio/seo";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Sébastien Botty — Portfolio",
  authors: [{ name: "Sébastien Botty", url: SITE_URL }],
  creator: "Sébastien Botty",
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = { themeColor: "#ebe7f2" };

export function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={lang}><body>{children}</body></html>;
}
