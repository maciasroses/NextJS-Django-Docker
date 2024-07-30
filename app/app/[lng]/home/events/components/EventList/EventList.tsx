import { getEvents } from "@/app/services/events/controller";
import EventCard from "./EventCard";
import { Card404 } from "@/app/components";
import type { SearchParams, EventListProps } from "@/app/interfaces";

interface EventThisListProps {
  searchParams: SearchParams;
  lng: string;
}

const EventList = async ({ searchParams, lng }: EventThisListProps) => {
  const { results: events } = (await getEvents(searchParams)) as EventListProps;

  return (
    <>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
          {events.map((event) => (
            <EventCard key={event.id} lng={lng} event={event} />
          ))}
        </div>
      ) : (
        <Card404
          title={
            lng === "en"
              ? "Events were not found with this search"
              : "No se encontraron eventos con esta búsqueda"
          }
          description={
            lng === "en" ? "Try another search" : "Intenta otra búsqueda"
          }
        />
      )}
    </>
  );
};

export default EventList;
