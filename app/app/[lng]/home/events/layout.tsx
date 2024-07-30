import Link from "next/link";
import { useTranslation } from "@/app/i18n";
import type { BaseLangPageProps } from "@/app/interfaces";

interface EventLayout extends BaseLangPageProps {
  children: React.ReactNode;
}

const EventLayout = async ({ children, params: { lng } }: EventLayout) => {
  const { t } = await useTranslation(lng, "events");

  return (
    <>
      <Link href={`/${lng}/home/events`}>
        <h1 className="text-4xl md:text-6xl text-center dark:text-white">
          {t("title")}
        </h1>
      </Link>
      <p className="text-2xl md:text-xl text-center dark:text-white">
        {t("description")}
      </p>
      {children}
    </>
  );
};

export default EventLayout;
