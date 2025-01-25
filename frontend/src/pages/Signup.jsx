import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const { name, email, password, username } = inputValue;

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
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5555/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
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
      name: "",
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8]">
      <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-[#2A4D6C] mb-6">
          Signup Account
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
              htmlFor="name"
              className="block text-sm font-medium text-[#4A6D7C]"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={handleOnChange}
              className="w-full p-3 border border-[#B0D1E0] rounded-md bg-[#F4F9F9] text-[#2A4D6C] focus:outline-none focus:ring-2 focus:ring-[#A7C6D7] transition-all"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[#4A6D7C]"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={handleOnChange}
              className="w-full p-3 border border-[#B0D1E0] rounded-md bg-[#F4F9F9] text-[#2A4D6C] focus:outline-none focus:ring-2 focus:ring-[#A7C6D7] transition-all"
            />
          </div>
          <div className="mb-6">
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
              Already have an account?{" "}
              <Link to="/login" className="text-[#4CAF50] hover:text-[#66BB6A]">
                Login
              </Link>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
