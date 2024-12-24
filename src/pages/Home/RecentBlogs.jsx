import { useEffect, useState, useContext } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { userId, loading } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the latest blogs from the backend
    fetch("http://localhost:5000/newBlogs")
      .then((res) => res.json())
      .then((data) => {
        // Assuming blogs have an `addedTime` field in ISO format
        const sortedBlogs = data
          .sort((a, b) => new Date(b.addedTime) - new Date(a.addedTime)) // Sort by newest
          .slice(0, 6); // Get only the 6 most recent blogs
        setBlogs(sortedBlogs);
      })
      .catch((error) => console.error("Error fetching recent blogs:", error));
  }, []);

  const handleAddToWishlist = async (blog) => {
    if (!userId) {
      console.error("Please log in to add to wishlist");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/wishList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...blog,
          userId,
        }),
      });
      const data = await response.json();
      if (data.insertedId) {
        console.log("Blog added to wishlist!");
        navigate("/wishlist");
      } else {
        console.error("Failed to add to wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-lime-600">
        <Typewriter
          words={["Recent Blogs"]}
          loop={false}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
        />
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="p-4 bg-white shadow-lg rounded-lg transform transition duration-300 hover:shadow-xl hover:scale-105"
          >
            <img
              src={
                blog.imageUrl ||
                "https://i.ibb.co.com/1Gg5SYS/people-coworking-covid-restrictions.jpg"
              }
              alt={blog.title}
              className="rounded-t-lg w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600 mb-4">{blog.shortDescription}</p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Category:</strong> {blog.category}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                
              </p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/blog-details/${blog._id}`}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition duration-200"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleAddToWishlist(blog)}
                  className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded transition duration-200"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
