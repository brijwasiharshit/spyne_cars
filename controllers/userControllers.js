const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

// Register User
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Create user in the database
  const user = await User.create({ name, email, password });

  // Send token for authentication
  sendToken(user, 201, res);
});

// Login User
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // Find user by email and explicitly select password
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Check if the password matches
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Send token if login is successful
  sendToken(user, 200, res);
});

// Get Single User
const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;

  // Find user by ID
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler(`User not found with ID: ${userId}`, 404));
  }

  // Return user data
  res.status(200).json({
    success: true,
    user,
  });
});

// Logout User
const logOut = catchAsyncErrors(async (req, res, next) => {
  // Clear the token cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  // Send response
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Export the handlers
module.exports = { registerUser, loginUser, logOut, getSingleUser };
