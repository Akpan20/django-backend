"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    isAdmin: false,
    hasMounted: false,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("isAdmin");

    const timeoutId = setTimeout(() => {
      setAuthState({
        isLoggedIn: !!token,
        isAdmin: admin === "true",
        hasMounted: true,
      });
    }, 0);

    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
    localStorage.removeItem("refresh");
    setAuthState({ isLoggedIn: false, isAdmin: false, hasMounted: true });
    setIsMenuOpen(false);
    router.push("/");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Guard for SSR
  if (!authState.hasMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">🏨</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white">BOPHILL SUITES</span>
                <div className="text-xs text-blue-300">Premium Hospitality</div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-slate-900/95 backdrop-blur-md shadow-2xl border-b border-white/10" 
          : "bg-slate-900/80 backdrop-blur-sm border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all group-hover:scale-110">
              <span className="text-xl">🏨</span>
            </div>
            <div>
              <span className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors">
                BOPHILL SUITES
              </span>
              <div className="text-xs text-blue-300">Premium Hospitality</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium"
            >
              Home
            </Link>
            <Link 
              href="/rooms" 
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium"
            >
              Rooms
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {authState.isLoggedIn ? (
              <>
                {authState.isAdmin && (
                  <Link 
                    href="/admin/dashboard" 
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-purple-500/50 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Admin Panel</span>
                  </Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="px-5 py-2 bg-red-600/20 text-red-300 border border-red-500/30 rounded-lg font-semibold hover:bg-red-600/30 hover:border-red-500/50 transition-all flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/admin/login" 
                  className="px-4 py-2 text-purple-300 hover:text-purple-200 transition-colors font-medium flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Admin</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 space-y-2 border-t border-white/10 pt-4 animate-fadeIn">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)} 
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium"
            >
              Home
            </Link>
            <Link 
              href="/rooms" 
              onClick={() => setIsMenuOpen(false)} 
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium"
            >
              Rooms
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsMenuOpen(false)} 
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setIsMenuOpen(false)} 
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium"
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-white/10 space-y-2">
              {authState.isLoggedIn ? (
                <>
                  {authState.isAdmin && (
                    <Link 
                      href="/admin/dashboard" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold text-center"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout} 
                    className="block w-full px-4 py-3 bg-red-600/20 text-red-300 border border-red-500/30 rounded-lg font-semibold text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-center text-white hover:bg-white/10 rounded-lg transition-all font-medium"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-center"
                  >
                    Get Started
                  </Link>
                  <Link 
                    href="/admin/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-center text-purple-300 hover:bg-white/10 rounded-lg transition-all font-medium"
                  >
                    Admin Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}