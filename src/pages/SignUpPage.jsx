import { React, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
      <div className="bg-panel text-main min-h-screen flex items-center justify-center">
        <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
        />

        <form
            onSubmit={handleSubmit}
            className="bg-surface border border-muted rounded-md drop-shadow-lg px-5 py-10 w-90 sm:px-8 lg:w-1/3 hover:bg-hover transition-all"
        >
          <h1 className="text-3xl text-center inter-large mb-2">Welcome</h1>
          <h3 className="text-center inter-small mb-5">
            Already have an account?{" "}
            <span className="underline text-primary inter-very-large">
            <Link to="/login">Login</Link>
          </span>
          </h3>

          {/* Full Name Input */}
          <div className="w-full text-sm mb-4 inter-small bg-panel flex items-center border border-muted rounded-lg py-2 px-4 focus-within:border-primary transition-colors">
            <BsPerson className="text-muted" />
            <input
                type="text"
                placeholder="Enter full name"
                className="ml-2 outline-none w-full bg-transparent text-main"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          {/* Email Input */}
          <div className="w-full text-sm mb-4 inter-small bg-panel flex items-center border border-muted rounded-lg py-2 px-4 focus-within:border-primary transition-colors">
            <MdOutlineEmail className="text-muted" />
            <input
                type="text"
                placeholder="Enter email"
                className="ml-2 outline-none w-full bg-transparent text-main"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="w-full text-sm mb-6 inter-small bg-panel flex items-center border border-muted rounded-lg py-2 px-4 focus-within:border-primary transition-colors">
            <MdLockOutline className="text-muted" />
            <input
                type="password"
                placeholder="Enter password"
                className="ml-2 outline-none w-full bg-transparent text-main"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <button
              disabled={isSigningUp}
              type="submit"
              className="w-full inter-large btn rounded-lg bg-primary border-none text-white hover:brightness-110 transition-all"
          >
            {isSigningUp ? (
                <>
                  <span className="loading loading-spinner loading-md"></span>
                  Loading...
                </>
            ) : (
                "Sign Up"
            )}
          </button>
        </form>
      </div>
  );
};

export default SignUpPage;
