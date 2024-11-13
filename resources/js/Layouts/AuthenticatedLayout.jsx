import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import { createContext, useState } from "react";
import { usePage } from "@inertiajs/react";

export const AuthContext = createContext();

export default function AuthenticatedLayout({ user, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { auth } = usePage().props;
  const role = auth?.role;
  return (
    <AuthContext.Provider value={{ user, role }}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className=" mx-auto max-w-screen-2xl p-4 md:px-6 md:py-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
