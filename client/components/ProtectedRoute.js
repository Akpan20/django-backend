"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useMounted } from "@/hooks/useMounted"; // Import here

export default function ProtectedRoute({ children, adminOnly = false }) {
  const mounted = useMounted(); // Use the hook
  const router = useRouter();
  const pathname = usePathname();
  
  const { isAuthenticated, isAdmin, loading } = useSelector((state) => state.auth);

  const isAdminRoute = adminOnly || pathname.startsWith("/admin");
  const isAuthorized = isAuthenticated && (!isAdminRoute || isAdmin);

  useEffect(() => {
    // We only redirect once we're sure we're on the client
    if (mounted && !loading) {
      if (!isAuthenticated) {
        router.replace(isAdminRoute ? "/admin/login" : "/login");
      } else if (isAdminRoute && !isAdmin) {
        router.replace("/dashboard");
      }
    }
  }, [isAuthenticated, isAdmin, loading, isAdminRoute, router, mounted]);

  // If we haven't mounted yet, render the spinner to match the Server
  if (!mounted || loading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return children;
}