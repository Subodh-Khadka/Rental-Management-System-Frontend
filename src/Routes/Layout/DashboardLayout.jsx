import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function DashboardLayout() {
  const [showSidebar, setShowSidebar] = useState(true);

  function handleSidebar() {
    setShowSidebar(!showSidebar);
  }
  return (
    <div className="flex min-h-screen text-sm relative">
      {showSidebar && (
        <aside className={`w-64 bg-white text-black flex flex-col`}>
          <Sidebar />
        </aside>
      )}
      <button
        onClick={handleSidebar}
        className={`absolute bg-white text-black rounded-full p-2 drop-shadow-lg top-4 transition-all duration-300 ${
          showSidebar ? "left-56" : "left-4"
        }`}
      >
        {showSidebar ? <FaTimes /> : <FaBars />}
      </button>

      <main className="flex-1 bg-gray-100 p-2 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
