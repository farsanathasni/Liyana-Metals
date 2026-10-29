import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { SignupValidatio } from "./SignupValidation";
import { useAuth } from "../../Contexts/AuthContext";
import { FaHome, FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

const initialValues = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: SignupValidatio,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setError('');
      
      const result = await register({
        name: values.name,
        email: values.email,
        password: values.password,
        role: "user",
        status: "active",
        createdAt: new Date().toISOString()
      });
      
      if (result.success) {
        alert("Account registered successfully! Welcome to LIYANA METALS.");
        resetForm();
        navigate("/"); 
      } else {
        setError(result.error);
      }
      
      setIsSubmitting(false);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background circles */}
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
            Create an Account
          </h2>
          <p className="text-stone-500 text-xs mt-1">
            Join 50,000+ Indian households enjoying premium home essentials.
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

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Ananya Patel"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 pl-10 text-sm text-stone-900 focus:outline-none focus:bg-white transition-colors ${
                    errors.name && touched.name
                      ? "border-red-400 focus:border-red-500"
                      : "border-stone-200 focus:border-[#1E3A2F]"
                  }`}
                />
                <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
              </div>
              {errors.name && touched.name && (
                <p className="text-red-500 text-[11px] font-medium mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. ananya@gmail.com"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 pl-10 text-sm text-stone-900 focus:outline-none focus:bg-white transition-colors ${
                    errors.email && touched.email
                      ? "border-red-400 focus:border-red-500"
                      : "border-stone-200 focus:border-[#1E3A2F]"
                  }`}
                />
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-500 text-[11px] font-medium mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 pl-10 text-sm text-stone-900 focus:outline-none focus:bg-white transition-colors ${
                    errors.password && touched.password
                      ? "border-red-400 focus:border-red-500"
                      : "border-stone-200 focus:border-[#1E3A2F]"
                  }`}
                />
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-[11px] font-medium mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="cpassword"
                  placeholder="Re-enter password"
                  value={values.cpassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full bg-[#FAF8F5] border rounded-xl px-4 py-3 pl-10 text-sm text-stone-900 focus:outline-none focus:bg-white transition-colors ${
                    errors.cpassword && touched.cpassword
                      ? "border-red-400 focus:border-red-500"
                      : "border-stone-200 focus:border-[#1E3A2F]"
                  }`}
                />
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
              </div>
              {errors.cpassword && touched.cpassword && (
                <p className="text-red-500 text-[11px] font-medium mt-1">{errors.cpassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-2 bg-[#1E3A2F] hover:bg-[#284f3f] text-white font-bold rounded-2xl shadow-lg shadow-[#1E3A2F]/20 hover:shadow-xl transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isSubmitting ? "Creating Account..." : "Register Account"}</span>
              <FaArrowRight className="text-xs" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-100 text-center text-xs text-stone-500">
            Already have an account?{" "}
            <Link 
              to="/loginpage" 
              className="text-[#C05621] font-bold hover:underline ml-1"
            >
              Sign In
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

export default RegisterPage;
