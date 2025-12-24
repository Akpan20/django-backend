"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminLogin, clearError, resetLoading } from "@/store/authSlice";
import { Eye, EyeOff, Lock, User, AlertCircle, ChevronRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  // Redirect on auth success
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      router.push("/admin/dashboard");
    }
    return () => {
      dispatch(clearError());
      dispatch(resetLoading());
    };
  }, [isAuthenticated, isAdmin, router, dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (loading) return;

    const { username, password } = formData;
    
    if (!username.trim() || !password.trim()) {
      dispatch(adminLogin.rejected({
        payload: { message: "Please provide both username and password" }
      }));
      return;
    }
    
    try {
      dispatch(clearError());
      await dispatch(adminLogin({ username, password })).unwrap();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 font-sans">
      <div className="w-full max-w-md">
        
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h1>
            <p className="text-purple-200/70 mt-1">Sign in to manage your system</p>
          </header>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-red-200 font-medium">{error}</p>
                <p className="text-red-300/60 text-xs mt-0.5">Note: Use username instead of email.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-purple-100 ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300/50 group-focus-within:text-purple-400 transition-colors" />
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="admin"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:ring-2 focus:ring-purple-500 focus:bg-white/10 transition-all outline-none"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-purple-100 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300/50 group-focus-within:text-purple-400 transition-colors" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:ring-2 focus:ring-purple-500 focus:bg-white/10 transition-all outline-none"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300/50 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between text-xs px-1">
              <label className="flex items-center gap-2 cursor-pointer text-purple-200/70 hover:text-purple-100">
                <input type="checkbox" className="accent-purple-500 rounded" />
                <span>Remember me</span>
              </label>
              <button type="button" onClick={() => alert("Contact Admin")} className="text-purple-300 hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5 text-center">
            <p className="text-xs text-purple-300/60 italic">
              Demo Access: <span className="text-purple-200">admin</span> / <span className="text-purple-200">123456</span>
            </p>
          </div>
        </div>
        {/* Footer */}
        <footer className="mt-8 text-center space-y-4">
          <p className="text-purple-300/60 text-sm">
            Not an admin? <Link href="/" className="text-purple-200 hover:underline font-medium">Return Home</Link>
          </p>
          <div className="text-[10px] uppercase tracking-widest text-white/20">
            &copy; {new Date().getFullYear()} Hotel Systems • Secure Admin Access
          </div>
        </footer>
      </div>
    </div>
  );
}