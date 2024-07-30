"use client";

import { useOptimistic } from "react";
import { useAuth } from "@/app/providers/AuthContext";
import { changeFavorite } from "@/app/services/events/controller";
import type { User, Event } from "@/app/interfaces";

const HeartFilled = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-8 md:size-12 text-red-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
);

const HeartEmpty = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-8 md:size-12 text-gray-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
);

const FavoriteButton = ({ event }: { event: Event }) => {
  const { user } = useAuth();
  const isFavorite = event.users.some(
    (eventUser: User) => eventUser.id === user?.id
  );
  const [optimisticFavorite, changeOptimisticFavorite] = useOptimistic<
    boolean,
    boolean
  >(isFavorite, (state, newFavorite) => newFavorite);

  async function formAction(formData: FormData) {
    const favorite = formData.get("favorite") === "true";
    changeOptimisticFavorite(favorite);
    await changeFavorite(event.id, favorite);
  }

  return (
    <div className="absolute top-0 right-0">
      <form action={formAction}>
        <button
          className="flex items-center gap-2"
          aria-label={
            optimisticFavorite ? "Remove from favorites" : "Add to favorites"
          }
          type="submit"
          name="favorite"
          value={optimisticFavorite ? "false" : "true"}
        >
          {optimisticFavorite ? <HeartFilled /> : <HeartEmpty />}
        </button>
      </form>
    </div>
  );
};

export default FavoriteButton;
