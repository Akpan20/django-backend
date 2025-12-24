"use client";

import { usePathname } from "next/navigation";
import "../globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import Footer from "@/components/Footer";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Don't wrap login page with ProtectedRoute
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        {/* Admin Header */}
        <header className="bg-black text-white p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
            </div>
            <div className="text-xs font-mono bg-gray-800 px-3 py-1 rounded border border-gray-700">
              System: <span className="text-green-400">Online</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="grow w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 min-h-[60vh] p-6">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}