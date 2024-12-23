import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RecentBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        fetch('http://localhost:5000/blogs')
            .then(res => res.json())
            .then(data => {
                // Ensure we only display the first six blogs
                setBlogs(data.slice(0, 6));
            })
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);

    const handleViewDetails = (blog) => {
        console.log("Viewing details for:", blog.title);
        // Add routing or modal logic here
        // You can use navigate here if you have a blog details page
        navigate(`/blog-details/${blog._id}`);
    };

    const handleAddToWishlist = async (blog) => {
        console.log("Added to wishlist:", blog.title);
        try {
            // Send the blog data to the backend (assuming userId is required)
            const response = await fetch('http://localhost:5000/wishList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...blog,
                    userId: "123", // Example user ID; replace with dynamic ID if needed
                }),
            });
            const data = await response.json();
            if (data.insertedId) {
                console.log("Blog added to wishlist!");
                navigate('/wishlist'); // Navigate to wishlist page
            } else {
                console.error("Failed to add to wishlist");
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-lime-500">
                <Typewriter
                    words={['Recent Blogs']}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog._id} className="p-4 bg-white shadow-lg rounded-lg transform transition duration-300 hover:shadow-xl hover:scale-105 hover:translate-z-10">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="rounded-t-lg w-full h-48"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                            <p className="text-gray-600 mb-4">{blog.shortDescription}</p>
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Category:</strong> {blog.category}
                            </p>
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => handleViewDetails(blog)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition duration-200"
                                >
                                    Details
                                </button>
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
