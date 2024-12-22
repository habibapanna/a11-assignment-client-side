import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const RecentBlogs = () => {
    const [blogs, setBlogs] = useState([]);

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
    };

    const handleAddToWishlist = (blog) => {
        console.log("Added to wishlist:", blog.title);
        // Add wishlist functionality here
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-lime-500"> <Typewriter
            words={['Recent Blogs']}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
          /></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog._id} className="p-4 bg-lime-100 shadow-lg rounded-lg transform transition duration-300 hover:shadow-xl hover:scale-105 hover:translate-z-10">
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
                                    className="bg-orange-600 hover:bg-orange-400 text-white py-2 px-4 rounded transition duration-200"
                                >
                                    Details
                                </button>
                                <button
                                    onClick={() => handleAddToWishlist(blog)}
                                    className="bg-lime-600 hover:bg-lime-400 text-white py-2 px-4 rounded transition duration-200"
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
