import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const AddCar = () => {
 
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [carType, setCarType] = useState("");
  const [company, setCompany] = useState("");
  const [dealer, setDealer] = useState("");
  const [rating, setRating] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [mileage, setMileage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!title || !description || !carType || !company || !dealer || !fuelType || !mileage) {
      toast.error("All fields are required!");
      return;
    }

    // Validate rating
    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      toast.error("Rating should be a number between 1 and 5.");
      return;
    }

    const payload = {
      title,
      description,
      images: [], // Add image support if needed
      tags: {
        car_type: carType,
        company,
        dealer,
        rating: numericRating,
        mileage,
        fuelType,
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/car/new",
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Car added successfully!");
        navigate(`/userlisting`);
      } else {
        toast.error(res.data.message || "Failed to add the car.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl text-yellow-400 font-extrabold">
            Add Your Car to the Collection
          </h1>
          <button
            onClick={() => navigate(`/userlisting`)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            ← View My Cars
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto"
        >
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Car Title"
              className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Car Description"
              className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            />
            <input
              type="text"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              placeholder="Car Type (e.g., SUV, Sedan)"
              className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            />
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company Name"
              className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            />
            <input
              type="text"
              value={dealer}
              onChange={(e) => setDealer(e.target.value)}
              placeholder="Dealer"
              className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            />
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Rating (1-5)"
              className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            />
            <input
              type="text"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              placeholder="Fuel Type (e.g., Petrol, Diesel)"
              className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            />
            <input
              type="text"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              placeholder="Mileage (km/l)"
              className="w-full bg-gray-700 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
            />
          </div>
          {/* <div>
          <label
            style={{ textAlign: "start", display: "block", fontSize: "20px" }}
          >
            Select Image
          </label>
          <input
            type="file"
            accept=".pdf, .jpg, .png"
            // onChange={handleFileChange}
            style={{ width: "100%" }}
          />
        </div> */}

          <button
            type="submit"
            className="mt-6 w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Add Car
          </button>
        </form>
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default AddCar;
