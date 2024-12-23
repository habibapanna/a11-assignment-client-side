import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const WishListPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Replace with dynamic user ID or user session
  const userId = "123"; // Example user ID

  // Fetch user's wishlist from the backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/wishList/${userId}`);
        setWishlist(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Error fetching wishlist.");
      }
    };
    fetchWishlist();
  }, [userId]);

  // Handle removing blog from wishlist
  const handleRemoveFromWishlist = async (blogId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/wishList/${userId}/${blogId}`);
      if (response.status === 200) {
        toast.success("Blog removed from wishlist!");
        setWishlist(wishlist.filter((blog) => blog._id !== blogId)); // Update state
      } else {
        toast.error("Failed to remove from wishlist.");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Error removing from wishlist.");
    }
  };

  // Handle navigating to blog details page
  const handleDetails = (blogId) => {
    navigate(`/blog-details/${blogId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl text-orange-500 font-bold text-center mb-6">Your Wishlist</h2>

      {/* Wishlist Blogs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map((blog) => (
          <div
            key={blog._id}
            className="border rounded-md p-4 shadow-md flex flex-col justify-between"
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-sm text-gray-600">{blog.shortDescription}</p>
            <p className="text-xs text-blue-600 mt-2">{blog.category}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleDetails(blog._id)}
                className="flex-1 bg-lime-500 text-white py-2 px-4 rounded-md hover:bg-lime-600"
              >
                Details
              </button>
              <button
                onClick={() => handleRemoveFromWishlist(blog._id)}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Remove from Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default WishListPage;
