import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typewriter } from "react-simple-typewriter";
import { Fade, Slide } from "react-awesome-reveal";

const AddBlogPage = () => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');

  // Toast error
  const showError = (message) => toast.error(message);
  const showSuccess = (message) => toast.success(message);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !imageUrl || !category || !shortDescription || !longDescription) {
      showError('All fields are required!');
      return;
    }

    const newBlog = {
      title,
      imageUrl,
      category,
      shortDescription,
      longDescription,
    };

    try {
      const response = await fetch('https://blog-website-server-hazel.vercel.app/newBlogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess('Blog submitted successfully!');
        setTitle('');
        setImageUrl('');
        setCategory('');
        setShortDescription('');
        setLongDescription('');
      } else {
        showError(data.message || 'Failed to submit the blog.');
      }
    } catch (error) {
      showError('An error occurred while submitting the blog.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Slide direction="down">
        <h2 className="text-center font-bold text-3xl text-orange-500">
         Add a Review
        </h2>
      </Slide>
      <Fade cascade damping={0.1}>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md mt-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-semibold text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-lg font-semibold text-gray-700">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-lg font-semibold text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Health">Health</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="shortDescription" className="block text-lg font-semibold text-gray-700">
              Short Description
            </label>
            <textarea
              id="shortDescription"
              placeholder="Enter short description"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="longDescription" className="block text-lg font-semibold text-gray-700">
              Long Description
            </label>
            <textarea
              id="longDescription"
              placeholder="Enter long description"
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <Fade direction="up">
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </Fade>
        </form>
      </Fade>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AddBlogPage;
