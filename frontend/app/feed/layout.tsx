// app/(app)/layout.tsx
import { Sidebar } from "../components/widgets/sidebar";
import TopBar from "../components/widgets/topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-x-2">
      <Sidebar />
      <main className="md:ml-15">
        <TopBar />
        {children}
      </main>
    </div>
  );
}
