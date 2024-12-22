import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
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
    console.log(newBlog);
    fetch('http://localhost:5000/newBlogs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data);
    })
    
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className='text-center font-bold text-3xl text-lime-500'>
      <Typewriter
            words={['Add a New Blog']}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
          />
      </h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
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
            {/* Add more categories as needed */}
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
          className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
