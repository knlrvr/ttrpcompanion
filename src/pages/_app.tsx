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
      <Sidebar />
      <div className="p-2">
        <div className="sm:ml-64 min-h-screen rounded-xl bg-gray-50 dark:bg-[#222] dark:text-neutral-200 dark:bg-opacity-50">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
