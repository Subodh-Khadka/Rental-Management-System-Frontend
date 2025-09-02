import Sidebar from "../Layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen rounded-t-xl overflow-hidden">
      <Sidebar />

      <main className="flex-1 bg-stone-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
