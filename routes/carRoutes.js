const express = require("express");
const {
  createCar,
  getCarByName,
  updateCar,
  deleteCar,
  getSingleCar,
  getAllCars,
} = require("../controllers/carControllers");
const { authentication } = require("../middleware/authentication");

const router = express.Router();
router.route("/getAllCars").get(authentication, getAllCars);
router.route("/cars/search").get(authentication, getCarByName);
router.route("/car/new").post(authentication, createCar);
router.route("/car/:id").put(authentication, updateCar);
router.route("/car/:id").delete(authentication, deleteCar);
router.route("/car/:id").get(authentication, getSingleCar);
module.exports = router;
