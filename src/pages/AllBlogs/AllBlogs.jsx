import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import AuthContext from "../../context/AuthContext/AuthContext"; // Import AuthContext

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { userId, loading } = useContext(AuthContext); // Get userId from AuthContext

  // Fetch blogs from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/newBlogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Handle adding to wishlist
  const handleAddToWishlist = async (blog) => {
    if (!userId) {
      toast.error("Please log in to add to wishlist.");
      return; // Prevent adding to wishlist if user is not logged in
    }

    try {
      const response = await axios.post("http://localhost:5000/wishList", {
        ...blog,
        userId, // Use the dynamic userId from AuthContext
      });
      if (response.data.insertedId) {
        toast.success(`${blog.title} added to wishlist!`);
        navigate("/wishlist");
      } else {
        toast.error("Failed to add to wishlist.");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Error adding to wishlist.");
    }
  };

  // Filtered blogs based on search and category
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || blog.category === category)
  );

  if (loading) {
    return <div>Loading...</div>; // Show loading state while user data is being fetched
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl text-orange-500 font-bold text-center mb-6">All Blogs</h2>

      {/* Search and Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Health">Health</option>
          <option value="Business">Business</option>
        </select>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            className="border rounded-md p-4 shadow-md flex flex-col justify-between"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
                onClick={() => handleAddToWishlist(blog)}
                className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
              >
                Add to Wishlist
              </button>
              <button
                onClick={() => navigate(`/blog-details/${blog._id}`)} // Pass the blog ID to the route
                className="flex-1 bg-lime-500 text-white py-2 px-4 rounded-md hover:bg-lime-600"
              >
                Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AllBlogsPage;
