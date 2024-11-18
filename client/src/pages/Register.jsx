import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import register from "../images/register_car.jpg";
import toast, { Toaster } from "react-hot-toast";

// Reusable InputField Component
const InputField = ({ value, onChange, type, placeholder }) => (
  <input
    value={value}
    onChange={onChange}
    type={type}
    placeholder={placeholder}
    className="bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
    aria-label={placeholder}
  />
);

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) return toast.error("Name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!validateEmail(email)) return toast.error("Invalid Email Format");
    if (!password.trim()) return toast.error("Password is required");

    try {
       const response = await axios
        .post(
          "http://localhost:5000/api/v1/register",
          {
            name,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
             
            },
            withCredentials: true,
          }
        )

      console.log(response?.data?.user?._id); // Log the response
        const id = response?.data?.user?._id;
      toast.success("Registration successful! Welcome aboard.");

      // Navigate to login page after success
      setTimeout(() => navigate(`/userlisting`), 1000);
    } catch (err) {
      console.error(err.message);
      toast.error(
        "Server Error: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Register Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={register}
          className="w-72 md:w-96 h-72 md:h-96 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
          alt="Register Car"
        />
      </div>

      {/* Register Form Section */}
      <div className="p-6 md:p-12 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl w-full md:w-1/3 text-white">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Header Text */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-wide text-yellow-400">
              Welcome
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Your car is waiting! Sign up fast and join the journey.
            </p>
          </div>

          {/* Input Fields */}
          <div className="flex flex-col gap-6">
            <InputField
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <InputField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <InputField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold p-3 rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
          >
            Register Now
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-yellow-500 hover:text-yellow-600 font-bold p-3 rounded-lg transition-all transform hover:underline text-center"
          >
            Already Signed Up? Login instead
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
