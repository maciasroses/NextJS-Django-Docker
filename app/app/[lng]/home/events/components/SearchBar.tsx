"use client";

import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Category, Location } from "@/app/interfaces";

interface SearchBarProps {
  searchbarProps: {
    search: string;
    filters: {
      categories: {
        title: string;
        description: string;
        mainOption: string;
      };
      locations: {
        title: string;
        description: string;
        mainOption: string;
      };
    };
  };
  categories: Category[];
  locations: Location[];
}

const SearchBar = ({
  searchbarProps,
  categories,
  locations,
}: SearchBarProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <search className="max-w-lg mx-auto mt-6">
      <div className="flex flex-col md:flex-row">
        <select
          aria-label="Category"
          onChange={(e) => handleSearch("category", e.target.value)}
          defaultValue={searchParams.get("category")?.toString()}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-s-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">
            {searchbarProps.filters.categories.mainOption}
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          aria-label="Location"
          onChange={(e) => handleSearch("location", e.target.value)}
          defaultValue={searchParams.get("location")?.toString()}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">
            {searchbarProps.filters.locations.mainOption}
          </option>
          {locations.map((location) => (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>

        <div className="relative w-full">
          <input
            aria-label="Search events"
            placeholder={searchbarProps.search}
            type="search"
            onChange={(e) => {
              handleSearch("q", e.target.value);
            }}
            defaultValue={searchParams.get("q")?.toString()}
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          />
        </div>
      </div>
    </search>
  );
};

export default SearchBar;
