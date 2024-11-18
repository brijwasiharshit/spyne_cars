import { useState } from "react";
import toast from "react-hot-toast";
import login from "../images/login_car.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid Email Format");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      // API call for login
      const res = await axios.post(
        "http://localhost:5000/api/v1/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, 
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        const userId = res?.data?.user?._id || "default"; // Use 'default' if user ID is not provided
        navigate(`/userlisting`); 
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Login Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={login}
          className="w-72 md:w-96 h-72 md:h-96 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
          alt="Login Car"
        />
      </div>

      {/* Login Form Section */}
      <div className="p-6 md:p-12 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl w-full md:w-1/3 text-white">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Header Text */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-wide text-indigo-400">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-300 mt-2">Enter credentials to login!</p>
          </div>

          {/* Input Fields */}
          <div className="flex flex-col gap-6">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-3 rounded-lg shadow-lg transition-all transform hover:-translate-y-1"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/")} // Correct navigation for signup
            className="text-white font-bold p-3 transition-all transform hover:underline"
          >
            New here? SignUp first
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
