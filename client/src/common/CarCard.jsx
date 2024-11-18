import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const CarCard = ({ id, desc, title }) => {
  


  const navigate = useNavigate();

  const data = {
    title: title || "Untitled Car", // Fallback value for title
    description: desc || "No description available", // Fallback value for description
    images: [
      { public_id: "ahgsahs", url: "https://picsum.photos/200/300" }
    ],
  };

  const handleViewDetails = () => {
    navigate(`/car-details/${id}`); // Use car ID for car-specific details
  };

  const handleUpdateDetails = () => {
    navigate(`/update-details/${id}`); // Use car ID for updates
  };

  const handleDeleteCar = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/car/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        window.location.reload(); // Reloads the page
      } catch (err) {
        console.error("Error deleting car:", err); 
        alert("Error deleting car.");
      }
    }
  };
  

  return (
    <div className="max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
      {/* Image Section */}
      <div className="relative">
        <img
          src={data.images[0]?.url || "https://via.placeholder.com/200x300"} // Fallback URL
          alt="Car"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-transparent"></div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-100 mb-2">
          {data.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-4">{data.description}</p>

        {/* Button Group */}
        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={handleViewDetails}
              className="text-teal-400 hover:text-teal-600 text-sm font-semibold mr-4"
            >
              View Details
            </button>
            <button
              onClick={handleUpdateDetails}
              className="text-teal-400 hover:text-teal-600 text-sm font-semibold"
            >
              Update Details
            </button>
          </div>
          {/* Delete Button */}
          <button
            onClick={handleDeleteCar}
            className="text-red-500 hover:text-red-700 text-sm font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
