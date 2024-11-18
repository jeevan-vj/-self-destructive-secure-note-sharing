import { Analytics } from "@/components/analytics";
import { ActiveNotes } from "@/components/active-notes";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Analytics />
      <ActiveNotes />
    </div>
  );
}