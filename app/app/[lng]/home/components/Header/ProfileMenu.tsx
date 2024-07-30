"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/providers/AuthContext";
import { logout } from "@/app/services/user/controller";
import type { User } from "@/app/interfaces";

interface ProfileMenuProps {
  lng: string;
  user: User;
  props: {
    dashboard: string;
    accounting: string;
    profile: string;
    settings: string;
    logout: string;
  };
}

const ProfileMenu = ({ lng, user, props }: ProfileMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { setUser } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !(menuRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={toggleMenu}
        >
          <Image
            src="/assets/profilepic.webp"
            alt="Profile"
            className="h-10 w-10 rounded-full"
            width={40}
            height={40}
          />
        </button>
      </div>
      {menuOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow list-none bg-red-white bg-gray-50 dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
          aria-roledescription="menu"
        >
          <div className="py-1" aria-roledescription="none">
            <div className="px-4 py-3">
              <p className="text-base text-gray-900 dark:text-white">
                {user?.username}
              </p>
              <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {user?.email}
              </p>
            </div>

            {/* THE FOLLOWING IS FOR MOBILE DEVICES */}

            <div className="sm:hidden pb-1">
              <div className="border-t border-gray-300 dark:border-gray-800"></div>
              <Link
                href={`/${lng}/home`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                role="menuitem"
                onClick={closeMenu}
              >
                {props.dashboard}
              </Link>
              <Link
                href={`/${lng}/home/accounting`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                role="menuitem"
                onClick={closeMenu}
              >
                {props.accounting}
              </Link>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-800"></div>
            <Link
              href={`/${lng}/home/profile`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              role="menuitem"
              onClick={closeMenu}
            >
              {props.profile}
            </Link>
            <Link
              href={`/${lng}/home/settings`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              role="menuitem"
              onClick={closeMenu}
            >
              {props.settings}
            </Link>
            <form action={logout}>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
                type="submit"
                role="menuitem"
              >
                {props.logout}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
