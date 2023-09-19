import Sidebar from "./Sidebar";


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
            </main>
        </>
    )
}