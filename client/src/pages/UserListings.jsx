import React, { useEffect, useState } from 'react';
import CarCard from '../common/CarCard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const UserListings = () => {

  const [allCars, setAllCars] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/getAllCars', {
          withCredentials: true,
        });
       

        if (res.data.success) {
          toast.success(res.data.message);
          setAllCars(res.data.cars || []);
        } else {
          toast.error(res.data.message);
        }

       
      } catch (err) {
        toast.error("Something went wrong. Please try again.");
        console.error(err);
      }
    };

    fetchCars();
  }, []); // Only run this once when `id` changes

  const handleLogout = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/logout', {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="text-center">
        {/* User Greeting and Title */}
        <h1 className="text-3xl sm:text-4xl text-yellow-400 font-bold mb-6 px-6">
          Hey! here is your car collection.
        </h1>

        {/* Buttons for Adding New Car and Logout */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            className="px-6 py-2 bg-teal-500 text-white text-lg font-semibold rounded-md hover:bg-teal-600 transition duration-200"
            onClick={() => navigate(`/add-car`)} 
          >
            Add New Car
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white text-lg font-semibold rounded-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Car Cards Section */}
      <div className="container mx-auto px-4">
        {/* Responsive Grid for Car Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allCars.length > 0 ? (
            allCars.map((car) => (
              <CarCard key={car._id} id={car._id} desc={car.description} title={car.title} />
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">
              No cars available. Add a car to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListings;
