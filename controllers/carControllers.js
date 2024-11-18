const Car = require("../models/carModel");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
exports.createCar = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.postedBy = req.user._id;

  const car = await Car.create(req.body);

  res.status(201).json({
    success: true,
    car,
  });
});
exports.getAllCars = catchAsyncErrors(async (req, res, next) => {
 
  const userId = req.user._id;
  // console.log(userId + "userId");
  // console.log(req.user + "req.user");
  const cars = await Car.find({ postedBy: userId });
  res.status(200).json({
    success: true,
    cars,
  });
});
exports.getCarByName = catchAsyncErrors(async (req, res) => {
  const userId = req.user._id;
  const apiFeatures = new ApiFeatures(
    Car.find({ postedBy: userId }),
    req.query
  ).search();
  const cars = await apiFeatures.query;
  res.status(200).json({ success: true, cars });
});
exports.updateCar = catchAsyncErrors(async (req, res, next) => {
  let car = await Car.findById(req.params.id);
  if (!car) {
    return next(new ErrorHandler("Car Not Found", 404));
  }
  car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, car });
});

exports.deleteCar = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    return next(new ErrorHandler("Car Not Found", 404));
  }
  await car.deleteOne();
  res.status(200).json({ success: true, message: "Car Deleted Successfully" });
});

exports.getSingleCar = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new ErrorHandler("Car Not Found", 404));
  }
  res.status(200).json({ success: true, car });
});
