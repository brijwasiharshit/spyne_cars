import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateCarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreviousDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/car/${id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        const carDetails = res?.data?.car || {};
        setFormData({
          title: carDetails?.title || "",
          description: carDetails?.description || "",
          carType: carDetails?.tags?.car_type || "",
          company: carDetails?.tags?.company || "",
          dealer: carDetails?.tags?.dealer || "",
          rating: carDetails?.tags?.rating || "",
          fuelType: carDetails?.tags?.fuelType || "",
          mileage: carDetails?.tags?.mileage || "",
        });
      } catch (err) {
        setError("Failed to fetch car details.");
      }
    };

    fetchPreviousDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.put(`http://localhost:5000/api/v1/car/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      navigate(`/car-details/${id}`);
    } catch (err) {
      setError("Failed to update car details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-extrabold text-yellow-400 text-center mb-6">
          Update Car Details
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white text-center py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(`/userlisting/${id}`)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 mb-6"
        >
          Back to User Listing
        </button>

        {/* Update Form */}
        {Object.keys(formData).length > 0 ? (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
          >
            {Object.entries(formData).map(([field, value]) => (
              <div key={field}>
                <label className="block text-gray-400 font-semibold mb-2 capitalize">
                  {field}
                </label>
                <input
                  type={field === "description" ? "textarea" : "text"}
                  name={field}
                  value={value}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
                  placeholder={`Enter ${field}`}
                  required
                />
              </div>
            ))}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full p-3 rounded-lg text-white font-semibold bg-yellow-400 hover:bg-yellow-500 transition duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Car Details"}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-gray-400">Loading car details...</p>
        )}
      </div>
    </div>
  );
};

export default UpdateCarDetails;
