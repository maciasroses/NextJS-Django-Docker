import { Suspense } from "react";
import { useTranslation } from "@/app/i18n";
import { getEvents } from "@/app/services/events/controller";
import { getLocations } from "@/app/services/locations/controller";
import { getCategories } from "@/app/services/categories/controller";
import {
  EventListSkeleton,
  EventList,
  SearchBar,
  Pagination,
} from "@/app/[lng]/home/events/components";
import type {
  EventListProps,
  BaseLangPageProps,
  SearchParams,
  Category,
  Location,
} from "@/app/interfaces";

interface EventPageProps extends BaseLangPageProps {
  searchParams?: SearchParams;
}

const EventPage = async ({ searchParams, params: { lng } }: EventPageProps) => {
  const { t } = await useTranslation(lng, "events");
  const searchbarProps = JSON.parse(t("searchBar"));

  const categories = (await getCategories()) as Category[];
  const locations = (await getLocations()) as Location[];

  const {
    q = "",
    category = "",
    location = "",
    page = "1",
  } = searchParams || {};

  const searchParamsForList = {
    q,
    category,
    location,
    page,
  };

  const { total_pages } = (await getEvents(
    searchParamsForList
  )) as EventListProps;

  return (
    <>
      <SearchBar
        searchbarProps={searchbarProps}
        categories={categories}
        locations={locations}
      />
      <Suspense
        key={q + category + location + page}
        fallback={<EventListSkeleton />}
      >
        <EventList lng={lng} searchParams={searchParamsForList} />
      </Suspense>
      {total_pages > 1 && <Pagination totalPages={total_pages} />}
    </>
  );
};

export default EventPage;
