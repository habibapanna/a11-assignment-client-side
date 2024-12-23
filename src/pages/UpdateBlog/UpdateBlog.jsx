import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    longDescription: '',
  });

  // Fetch the blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/edit-blog/${id}`);
        setBlogData(response.data);
        setFormData({
          title: response.data.title || '',
          category: response.data.category || '',
          longDescription: response.data.longDescription || '',
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
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
    try {
      const response = await axios.put(`/edit-blog/${id}`, formData);
      if (response.status === 200) {
        alert('Blog updated successfully');
        navigate('/blogs'); // Redirect to the blogs page
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog');
    }
  };

  if (!blogData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Long Description:</label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default UpdateBlog;
