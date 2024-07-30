"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export async function getEvents(searchParams = {}) {
  const jwt = cookies().get("jwt");
  try {
    const queryParams = new URLSearchParams(searchParams).toString();
    const url = `${BACKEND_URL}/api/event/${
      queryParams ? "?" + queryParams : ""
    }`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        cookie: `jwt=${jwt?.value}`,
      },
    });

    const resJson = await response.json();

    if (response.ok) {
      return resJson;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw new Error("An internal error occurred");
  }
}

export async function getEvent(id: string) {
  const jwt = cookies().get("jwt");
  try {
    const response = await fetch(`${BACKEND_URL}/api/event/${id}`, {
      headers: {
        "Content-Type": "application/json",
        cookie: `jwt=${jwt?.value}`,
      },
    });

    const resJson = await response.json();

    if (response.ok) {
      return resJson.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw new Error("An internal error occurred");
  }
}

export async function changeFavorite(eventId: string, isAdding: boolean) {
  const jwt = cookies().get("jwt");
  try {
    const body = {
      isAdding,
    };
    const response = await fetch(`${BACKEND_URL}/api/event/${eventId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: `jwt=${jwt?.value}`,
      },
      body: JSON.stringify(body),
    });

    // const resJson = await response.json();

    if (!response.ok) return null;
  } catch (error) {
    console.error(error);
    throw new Error("An internal error occurred");
  }
  revalidatePath(`/events/${eventId}`);
}
