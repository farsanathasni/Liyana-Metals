import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SignupValidatio } from "./SignupValidation";
import { useAuth } from "../../Contexts/AuthContext";

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
        createdAt:  new Date().toISOString()
      });
      
      if (result.success) {
        alert("Registration successful! Please login.");
        resetForm();
        navigate("/loginpage"); 
      } else {
        setError(result.error);
      }
      
      setIsSubmitting(false);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-amber-700 mb-6 text-center">
          Register
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                errors.name && touched.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && touched.name && (
              <small className="text-red-500 text-sm">{errors.name}</small>
            )}
          </div>

         
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                errors.email && touched.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && touched.email && (
              <small className="text-red-500 text-sm">{errors.email}</small>
            )}
          </div>

          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                errors.password && touched.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && touched.password && (
              <small className="text-red-500 text-sm">{errors.password}</small>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm your password"
              value={values.cpassword}
              onBlur={handleBlur}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                errors.cpassword && touched.cpassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cpassword && touched.cpassword && (
              <small className="text-red-500 text-sm">{errors.cpassword}</small>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link 
            to="/loginpage" 
            className="text-amber-600 font-semibold hover:text-amber-700"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;