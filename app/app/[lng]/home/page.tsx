import { useTranslation } from "@/app/i18n";
import type { BaseLangPageProps } from "@/app/interfaces";

const HomePage = async ({ params: { lng } }: BaseLangPageProps) => {
  const { t } = await useTranslation(lng, "home");

  return (
    <>
      <h1 className="dark:text-white">{t("title")}</h1>
    </>
  );
};

export default HomePage;
