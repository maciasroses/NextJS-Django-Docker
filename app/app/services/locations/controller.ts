"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export async function getLocations() {
  const jwt = cookies().get("jwt");
  try {
    const response = await fetch(`${BACKEND_URL}/api/location/`, {
      headers: {
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
