"use client";

import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import LangSelector from "./LangSelector";
import ThemeSelector from "./ThemeSelector";
import { useTranslation } from "@/app/i18n/client";
import type { User } from "@/app/interfaces";

interface HeaderProps {
  user: User;
  lng: string;
}

const Header = ({ user, lng }: HeaderProps) => {
  const { t } = useTranslation(lng, "header");
  const themeSelector = JSON.parse(t("themeSelector"));
  const languageSelector = JSON.parse(t("languageSelector"));
  const profileMenu = JSON.parse(t("profileMenu"));

  return (
    <header className="fixed z-40 top-0 w-full h-20">
      <div className="h-full flex justify-between items-center p-4 max-w-[1440px] mx-auto bg-gray-50 dark:bg-gray-800">
        <Link className="text-4xl dark:text-white" href={`/${lng}/home`}>
          LOGO
        </Link>
        <div className="flex items-center gap-2">
          <ThemeSelector props={themeSelector} />
          <LangSelector lng={lng} props={languageSelector} />
          <ProfileMenu lng={lng} props={profileMenu} user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
