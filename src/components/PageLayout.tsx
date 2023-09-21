import Sidebar from "./Sidebar";
import ToggleTheme from "./ThemeToggle";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


export default function PageLayout({
    children,
  }: {
    children: React.ReactNode
  }){
    return (
        <>
          <Sidebar />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <main className="p-2 sm:ml-64 bg-neutral-100 dark:bg-[#111]">
              <div className="p-2 sm:p-4 min-h-screen rounded-xl bg-neutral-50 dark:bg-[#222] dark:text-neutral-200 dark:bg-opacity-50">
                {children}
              </div>
              <div className="flex items-center justify-between pb-4 pt-6">
                <ToggleTheme />
                <span className="text-neutral-500 text-xs"> &copy; 2023 TTRPCompanion.</span>
              </div>
            </main>
        </>
    )
}