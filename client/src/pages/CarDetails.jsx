import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const [carData, setCarData] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const getMyCar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/car/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setCarData(res?.data?.car); 
      } catch (err) {
        setError("Failed to fetch car details."); 
      }
    };

    getMyCar();
  }, [id]); 

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>{error}</p>
      </div>
    );
  }

  if (!carData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }


  const data = {
    title: carData?.title || "Unknown Title",
    description: carData?.description || "No description available.",
    carType: carData?.tags?.carType || "Unknown",
    company: carData?.tags?.company || "Unknown",
    dealer: carData?.tags?.dealer || "Unknown",
    rating: carData?.tags?.rating || "Not Rated",
    fuelType: carData?.tags?.fuelType || "Unknown",
    mileage: carData?.tags?.mileage || "Unknown",
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4">
      <div className="container mx-auto">
      <button
          onClick={() => navigate(`/userlisting/${id}`)}
          className="flex items-center text-yellow-400 hover:text-yellow-500 mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </button>

        {/* Hero Section */}
        <button></button>
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-4">
            {data.title}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400">
            A powerful vehicle, just like the Avengers
          </p>
        </div>

        {/* Car Details */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-yellow-400 text-center">
            Car Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Description */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
              <span className="font-semibold text-lg text-gray-300">
                Description:
              </span>
              <span className="text-gray-400">{data.description}</span>
            </div>

            {/* Car Type */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
              <span className="font-semibold text-lg text-gray-300">
                Car Type:
              </span>
              <span className="text-gray-400">{data.carType}</span>
            </div>

            {/* Company */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
              <span className="font-semibold text-lg text-gray-300">
                Company:
              </span>
              <span className="text-gray-400">{data.company}</span>
            </div>

            {/* Dealer */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
              <span className="font-semibold text-lg text-gray-300">
                Dealer:
              </span>
              <span className="text-gray-400">{data.dealer}</span>
            </div>

            {/* Rating */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
              <span className="font-semibold text-lg text-gray-300">
                Rating:
              </span>
              <span className="text-yellow-400">{data.rating} / 5</span>
            </div>

            {/* Fuel Type */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
              <span className="font-semibold text-lg text-gray-300">
                Fuel Type:
              </span>
              <span className="text-gray-400">{data.fuelType}</span>
            </div>

            {/* Mileage */}
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300">
              <span className="font-semibold text-lg text-gray-300">
                Mileage:
              </span>
              <span className="text-gray-400">{data.mileage}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
