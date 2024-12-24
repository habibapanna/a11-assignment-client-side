import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateBlog = () => {
  const { id } = useParams(); // Extract blog ID from URL
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    longDescription: '',
  });

  // Fetch the blog details when the page is loaded
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/edit-blog/${id}`);
        if (response.status === 200) {
          setBlogData(response.data);
          setFormData({
            title: response.data.title || '',
            category: response.data.category || '',
            longDescription: response.data.longDescription || '',
          });
        } else {
          toast.error('Failed to load blog data');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to load blog data');
      }
    };
    fetchBlog();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log form data for debugging
    console.log('Submitting form data:', formData);

    try {
      // Send updated form data to the server
      const response = await axios.put(`/edit-blog/${id}`, formData);
      
      // Check the response status and handle accordingly
      if (response.status === 200) {
        toast.success('Blog updated successfully');
        navigate(`/blog-details/${id}`); // Redirect to the BlogDetailsPage with updated data
      } else {
        toast.error('Failed to update blog');
        console.error('Error response:', response); // Log error response
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog');
      
      // If error response is available, log it
      if (error.response) {
        console.error('Error response:', error.response);
      }
    }
  };

  if (!blogData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div> {/* Optionally, use a spinner */}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium text-gray-600">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        {/* Category Field */}
        <div className="flex flex-col">
          <label htmlFor="category" className="text-lg font-medium text-gray-600">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        {/* Long Description Field */}
        <div className="flex flex-col">
          <label htmlFor="longDescription" className="text-lg font-medium text-gray-600">Long Description</label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            required
            rows="6"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-lime-500 text-white text-lg font-semibold rounded-lg hover:bg-lime-600 focus:outline-none"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
