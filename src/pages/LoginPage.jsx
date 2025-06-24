import { React, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
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
    const isValid = validateForm();
    if (isValid) login(formData);
  };

  return (
      <div className='bg-panel text-main h-screen flex justify-center items-center'>
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
            className='bg-surface border border-muted shadow-md pt-13 pb-13 px-6 sm:px-10 flex flex-col items-center rounded-md w-90 lg:w-1/3 transition-all hover:bg-hover'
        >
          <h1 className='m-1 text-3xl text-center inter-large'>Welcome back</h1>
          <h3 className='m-3 inter-small text-center text-sm'>
            Don't have an account already?{" "}
            <span className='underline inter-very-large text-primary'>
            <Link to="/signup">Signup</Link>
          </span>
          </h3>

          <div className="w-full text-sm m-3 inter-small bg-panel flex items-center border border-muted rounded-lg py-2 px-4 focus-within:border-primary transition-colors">
            <MdOutlineEmail className="text-muted" />
            <input
                type="text"
                placeholder="Enter email"
                className="ml-2 outline-none w-full bg-transparent text-main"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="w-full text-sm m-3 inter-small bg-panel flex items-center border border-muted rounded-lg py-2 px-4 focus-within:border-primary transition-colors">
            <MdLockOutline className="text-muted" />
            <input
                type="password"
                placeholder="Enter password"
                className="ml-2 outline-none w-full bg-transparent text-main"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
              disabled={isLoggingIn}
              type='submit'
              className="w-full inter-large m-3 btn rounded-lg bg-primary text-white hover:brightness-110 transition-all border-none"
          >
            {isLoggingIn ? (
                <>
                  <span className="loading loading-spinner loading-md"></span>
                  Loading...
                </>
            ) : "Log In"}
          </button>
        </form>
      </div>
  );
};

export default LoginPage;
