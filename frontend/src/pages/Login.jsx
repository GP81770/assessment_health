import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5555/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8]">
      <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-[#2A4D6C] mb-6">
          Login Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#4A6D7C]"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              className="w-full p-3 border border-[#B0D1E0] rounded-md bg-[#F4F9F9] text-[#2A4D6C] focus:outline-none focus:ring-2 focus:ring-[#A7C6D7] transition-all"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#4A6D7C]"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
              className="w-full p-3 border border-[#B0D1E0] rounded-md bg-[#F4F9F9] text-[#2A4D6C] focus:outline-none focus:ring-2 focus:ring-[#A7C6D7] transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#4CAF50] text-white rounded-md hover:bg-[#66BB6A] focus:outline-none transition-all"
          >
            Submit
          </button>
          <div className="mt-4 text-center">
            <span className="text-sm text-[#4A6D7C]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#4CAF50] hover:text-[#66BB6A]"
              >
                Signup
              </Link>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
