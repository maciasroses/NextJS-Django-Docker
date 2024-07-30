import Link from "next/link";
import { Metadata } from "next";
import { Form } from "./components";
import { BaseLangPageProps } from "@/app/interfaces";

export const metadata: Metadata = {
  title: "Log in",
};

const LoginPage = ({ params: { lng } }: BaseLangPageProps) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center dark:text-white">
      <div className="flex flex-col items-center gap-4">
        <Link className="text-4xl" href="/">
          LOGO
        </Link>
        <Form lng={lng} />
        <p>
          Not registered yet?{" "}
          <span>
            <Link className="text-blue-500" href={`/${lng}/signup`}>
              Sign up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
