import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useSpring, animated } from "@react-spring/web"; // Import for animations

const WishListPage = () => {
  const [wishList, setWishList] = useState([]);
  const { userId, loading } = useContext(AuthContext); // Get userId from AuthContext
  const navigate = useNavigate();

  // Fetch wishlist items for the logged-in user
  useEffect(() => {
    if (!userId) {
      navigate("/login"); // Redirect to login if the user is not logged in
    }
// 
    const fetchWishList = async () => {
      try {
        // Fetch wishlist items for the logged-in user
        const response = await axios.get(`https://blog-website-server-hazel.vercel.app/wishList/${userId}`);
        setWishList(response.data); // Set fetched wishlist items
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Error fetching wishlist.");
      }
    };

    if (userId) {
      fetchWishList();
    }
  }, [userId, navigate]);
// 
  // Remove item from wishlist
  const handleRemoveFromWishlist = (id) => {
    fetch(`https://blog-website-server-hazel.vercel.app/wishList/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("delete is done", data);
        toast.success("Item removed from your wishlist!"); // Show success toast
        // Remove the item from the state (wishlist)
        const remainingWishList = wishList.filter((blog) => blog._id !== id);
        setWishList(remainingWishList);
      })
      .catch((error) => {
        console.error("Error removing from wishlist:", error);
        toast.error("Error removing item from wishlist."); // Show error toast if there's an issue
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while user data is being fetched
  }

  // Animation for each card
  const springProps = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="container min-h-screen mx-auto p-6">
      <h2 className="text-3xl text-orange-500 font-bold text-center mb-6">Your Wishlist</h2>

      {/* Display wishlist */}
      {wishList.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishList.map((blog) => (
            <animated.div
              key={blog._id}
              style={springProps}
              className="border rounded-md p-4 shadow-md flex flex-col justify-between"
            >
              <img
                src={blog.image || "https://i.ibb.co/xq08rZT/access-connection-internet-technology-concept.jpg"} // Fallback image if blog image is missing
                alt={blog.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-600">{blog.shortDescription}</p>
              <p className="text-xs text-blue-600 mt-2">{blog.category}</p>
              <div className="mt-4 flex gap-2">
                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(blog._id)} // Pass blog._id here
                  className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
                >
                  Remove from Wishlist
                </button>
                {/* View Details Button */}
                <button
                  onClick={() => navigate(`/blog-details/${blog._id}`)}
                  className="flex-1 bg-lime-500 text-white py-2 px-4 rounded-md hover:bg-lime-600"
                >
                  View Details
                </button>
              </div>
            </animated.div>
          ))}
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default WishListPage;
