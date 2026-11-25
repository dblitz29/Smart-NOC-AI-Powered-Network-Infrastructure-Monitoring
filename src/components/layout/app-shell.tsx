import { Header } from "@/components/layout/header";
import { MobileNav, Sidebar } from "@/components/layout/sidebar";

export function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={title} />
        <MobileNav />
        <main className="flex-1 px-4 py-5 md:px-6">{children}</main>
        <footer className="border-t border-border px-4 py-3 text-xs text-muted-foreground md:px-6">
          Prototype. Every figure, camera feed and alert is sample data generated in the browser.
        </footer>
      </div>
    </div>
  );
}
