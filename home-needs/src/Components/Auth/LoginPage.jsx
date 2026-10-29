import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { useFormik } from 'formik';
import { FaHome, FaEnvelope, FaLock, FaArrowRight, FaShieldAlt } from 'react-icons/fa';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: { 
      email: "", 
      password: "" 
    },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError("");

      const result = await login(values.email, values.password);
      if (!result.success) {
        setError(result.error);
        setIsSubmitting(false);
        return;
      }

      // Check role
      const role = result.user?.role || "user";
      if (role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

      setIsSubmitting(false);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Blur Background Circles */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#1E3A2F]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#C05621]/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E3A2F] to-[#2E5848] flex items-center justify-center text-white shadow-md shadow-[#1E3A2F]/20 group-hover:scale-105 transition-transform">
              <FaHome className="text-2xl text-emerald-200" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-extrabold tracking-tight text-stone-900">
                LIYANA  <span className="text-[#C05621]"> METALS</span>
              </span>
              <p className="text-[10px] tracking-widest uppercase font-semibold text-stone-600">
                Kitchen & Living Essentials
              </p>
            </div>
          </Link>
          
          <h2 className="text-2xl font-extrabold text-stone-900 mt-6 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-stone-500 text-xs mt-1">
            Sign in to access your orders, saved cart items, and wishlist.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xl">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your registered email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-3 pl-10 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F] focus:bg-white transition-colors"
                  required
                />
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your account password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-3 pl-10 text-sm text-stone-900 focus:outline-none focus:border-[#1E3A2F] focus:bg-white transition-colors"
                  required
                />
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#1E3A2F] hover:bg-[#284f3f] text-white font-bold rounded-2xl shadow-lg shadow-[#1E3A2F]/20 hover:shadow-xl transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isSubmitting ? "Signing In..." : "Sign In to Account"}</span>
              <FaArrowRight className="text-xs" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-100 text-center text-xs text-stone-500">
            Don't have an account yet?{" "}
            <Link 
              to="/register" 
              className="text-[#C05621] font-bold hover:underline ml-1"
            >
              Create Account
            </Link>
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs text-stone-500 hover:text-stone-800 transition-colors"
          >
            &larr; Back to Home Store
          </Link>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
