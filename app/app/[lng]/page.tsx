import Link from "next/link";
import { useTranslation } from "@/app/i18n";
import { BaseLangPageProps } from "@/app/interfaces";

export default async function Home({ params: { lng } }: BaseLangPageProps) {
  const { t } = await useTranslation(lng, "index");
  return (
    <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center dark:text-white">
      <h1 className="text-8xl">{t("title")}</h1>
      <p className="text-2xl">{t("description")}</p>
      <Link className="text-4xl text-blue-600 underline" href={`${lng}/home`}>
        {t("link")}
      </Link>
    </div>
  );
}
