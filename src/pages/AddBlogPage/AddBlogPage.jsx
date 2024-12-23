import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typewriter } from "react-simple-typewriter";

const AddBlogPage = () => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');

  // Toast error handling
  const showError = (message) => toast.error(message);
  const showSuccess = (message) => toast.success(message);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled out
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
      const response = await fetch('http://localhost:5000/newBlogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess('Blog submitted successfully!');
        // Optionally reset form fields
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
    <div className="container mx-auto p-6 bg-orange-500">
      <h2 className='text-center font-bold text-3xl text-lime-300'>
        <Typewriter
          words={['Add a New Blog']}
          loop={false}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
        />
      </h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-2xl mt-5">
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Title</label>
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
          <label htmlFor="imageUrl" className="block text-lg font-semibold text-gray-700">Image URL</label>
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
          <label htmlFor="category" className="block text-lg font-semibold text-gray-700">Category</label>
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
          <label htmlFor="shortDescription" className="block text-lg font-semibold text-gray-700">Short Description</label>
          <textarea
            id="shortDescription"
            placeholder="Enter short description"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="longDescription" className="block text-lg font-semibold text-gray-700">Long Description</label>
          <textarea
            id="longDescription"
            placeholder="Enter long description"
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-lime-500 text-white text-lg font-semibold rounded-lg hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>

      {/* Toast Container for notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AddBlogPage;
