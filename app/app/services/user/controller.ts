"use server";

import { cookies } from "next/headers";
import { validateUser } from "./schema";
import { redirect } from "next/navigation";
import type { LoginStateProps, RegisterStateProps } from "@/app/interfaces";

const BACKEND_URL = process.env.BACKEND_URL;

function createUserSession(token: string) {
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour / 60 minutes
  cookies().set("jwt", token, { expires, httpOnly: true });
}

export async function login(prevState: LoginStateProps, formData: FormData) {
  const dataToValidate = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const errors = validateUser("login", dataToValidate);

  if (Object.keys(errors).length !== 0) {
    return {
      errors: errors as LoginStateProps["errors"],
      message: "",
    };
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataToValidate),
      credentials: "include",
    });

    const resJson = await response.json();

    if (response.ok) {
      createUserSession(resJson.jwt);
    } else {
      return { message: resJson.detail, errors: {} };
    }
  } catch (error) {
    console.error(error);
    throw new Error("An internal error occurred");
  }
  const lng = formData.get("lang");
  redirect(`/${lng}/home`);
}

export async function register(
  prevState: RegisterStateProps,
  formData: FormData
) {
  const dataToValidate = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const errors = validateUser("register", dataToValidate);

  if (Object.keys(errors).length !== 0) {
    return {
      errors: errors as RegisterStateProps["errors"],
      message: "",
    };
  }

  if (dataToValidate.password !== dataToValidate.confirmPassword)
    return { message: "Passwords do not match", errors: {} };

  const { confirmPassword, ...data } = dataToValidate;

  try {
    const response = await fetch(`${BACKEND_URL}/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const resJson = await response.json();

    if (response.ok) {
      createUserSession(resJson.jwt);
    } else {
      interface Errors {
        username?: string;
        email?: string;
      }

      const errors: Errors = {};
      if (resJson.username) {
        errors.username = resJson.username;
      }
      if (resJson.email) {
        errors.email = resJson.email;
      }

      return { errors: errors as RegisterStateProps["errors"], message: "" };
    }
  } catch (error) {
    console.error(error);
    throw new Error("An internal error occurred");
  }
  const lng = formData.get("lang");
  redirect(`/${lng}/home`);
}

export async function logout() {
  try {
    await fetch(`${BACKEND_URL}/api/logout/`, {
      method: "POST",
    });
  } catch (error) {
    console.error(error);
    throw new Error("An internal error occurred");
  }
  cookies().set("jwt", "", { expires: new Date(0) });
  redirect("/");
}

export async function getUser() {
  const jwt = cookies().get("jwt");
  try {
    const response = await fetch(`${BACKEND_URL}/api/user`, {
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
