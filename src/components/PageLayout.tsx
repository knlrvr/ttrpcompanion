import Sidebar from "./Sidebar";
import ToggleTheme from "./ThemeToggle";


export default function PageLayout({
    children,
  }: {
    children: React.ReactNode
  }){
    return (
        <>
            <Sidebar />
            <main className="p-2 sm:ml-64 bg-neutral-100 dark:bg-[#111]">
              <div className="p-4 min-h-screen rounded-xl bg-neutral-50 dark:bg-[#222] dark:text-neutral-200 dark:bg-opacity-50">
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