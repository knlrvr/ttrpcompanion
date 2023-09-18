import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import Sidebar from "@/components/Sidebar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <SessionProvider session={session}>
      <div>
        <Sidebar />
        <div className="sm:ml-64 p-2 bg-neutral-100 dark:bg-[#111]">
          <div className="min-h-screen rounded-xl bg-neutral-50 dark:bg-[#222] dark:text-neutral-200 dark:bg-opacity-50">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
