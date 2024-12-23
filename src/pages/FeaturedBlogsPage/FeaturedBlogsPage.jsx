import React, { useEffect, useState } from "react";
import axios from "axios";

const FeaturedBlogsPage = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch top 10 featured blogs
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/featured-blogs");
        setFeaturedBlogs(response.data);
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
        Featured Blogs
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Author</th>
              <th className="border border-gray-300 px-4 py-2">Word Count</th>
            </tr>
          </thead>
          <tbody>
            {featuredBlogs.map((blog, index) => (
              <tr key={blog._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
                <td className="border border-gray-300 px-4 py-2">{blog.category}</td>
                <td className="border border-gray-300 px-4 py-2">{blog.userName}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{blog.wordCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogsPage;
