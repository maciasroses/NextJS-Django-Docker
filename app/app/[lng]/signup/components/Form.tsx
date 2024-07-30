"use client";

import { useFormState } from "react-dom";
import { register } from "@/app/services/user/controller";
import { useState } from "react";
import SubmitButton from "@/app/components/SubmitButton";
import type { RegisterStateProps } from "@/app/interfaces";

interface ErrorsProps {
  errors: RegisterStateProps["errors"];
}

const Form = ({ lng }: { lng: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialState: RegisterStateProps = { message: "", errors: {} };
  const [state, formAction] = useFormState(register, initialState);
  const { errors } = (state as ErrorsProps) ?? {};

  const handleChangeIsSearching = (value: boolean) => {
    setIsSubmitting(value);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h1 className=" text-6xl">Sign Up</h1>
        {state?.message && <p className="text-red-600">{state?.message}</p>}
      </div>
      <form action={formAction}>
        <fieldset disabled={isSubmitting}>
          <div className="flex flex-col gap-4 text-xl max-w-[500px]">
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Your username"
                  className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                    errors?.username
                      ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                {errors?.username && (
                  <small className="text-red-600">{errors?.username}</small>
                )}
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email@test.com"
                  className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                    errors?.email
                      ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                {errors?.email && (
                  <small className="text-red-600">{errors?.email}</small>
                )}
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                    errors?.password
                      ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                {errors?.password && (
                  <small className="text-red-600">{errors?.password}</small>
                )}
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                    errors?.confirmPassword
                      ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                {errors?.confirmPassword && (
                  <small className="text-red-600">
                    {errors?.confirmPassword}
                  </small>
                )}
              </div>
            </div>
          </div>
          <input type="text" hidden name="lang" defaultValue={lng} />
          <div className="text-center">
            <SubmitButton
              title="Sign up"
              handleChangeIsSearching={handleChangeIsSearching}
            />
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default Form;
