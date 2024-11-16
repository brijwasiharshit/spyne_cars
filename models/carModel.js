const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  tags: {
    car_type: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    dealer: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    mileage: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
