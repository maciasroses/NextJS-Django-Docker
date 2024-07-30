import { Header, Sidebar } from "./components";
import { getUser } from "@/app/services/user/controller";
import type { User, BaseLangPageProps } from "@/app/interfaces";

interface HomeLayout extends BaseLangPageProps {
  children: React.ReactNode;
}

const HomeLayout = async ({ children, params: { lng } }: HomeLayout) => {
  const user = (await getUser()) as User;

  return (
    <>
      <Header user={user} lng={lng} />
      <main className="w-full max-w-[1440px] mx-auto">
        <Sidebar lng={lng} />
        <section className="sm:ml-48 mt-20 p-4 bg-gray-200 dark:bg-gray-900">
          {children}
        </section>
      </main>
    </>
  );
};

export default HomeLayout;
