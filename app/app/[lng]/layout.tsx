import "./globals.css";
import { ThemeComponent, AuthComponent } from "@/app/components";
import { dir } from "i18next";
import { languages } from "@/app/i18n/settings";
import type { Metadata } from "next";
import type { BaseLangPageProps } from "@/app/interfaces";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: {
    template: "%s | Feature Architecture",
    default: "Feature Architecture",
  },
  description: "This is the best feature architecture example you can find.",
};

interface RootLayoutProps extends BaseLangPageProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className="bg-gray-100 dark:bg-gray-950">
        <ThemeComponent>
          <AuthComponent>{children}</AuthComponent>
        </ThemeComponent>
      </body>
    </html>
  );
}
