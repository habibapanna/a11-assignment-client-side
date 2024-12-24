import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import AuthContext from "../../context/AuthContext/AuthContext"; // Import AuthContext

const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const { userId, userEmail, userName, userProfilePicture } = useContext(AuthContext); // Get user details from AuthContext
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  // Fetch blog details and comments
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogResponse = await axios.get(`http://localhost:5000/blog-details/${blogId}`);
        setBlog(blogResponse.data);

        // Check if the current user is the blog owner
        if (blogResponse.data.userEmail === userEmail) {
          setIsOwner(true);
        }

        const commentsResponse = await axios.get(`http://localhost:5000/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching blog details or comments:", error);
      }
    };

    fetchBlogDetails();
  }, [blogId, userEmail]);

  // Handle adding a comment
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error("Please enter a comment!");
      return;
    }

    if (!userId) {
      toast.error("Please log in to comment.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/comments", {
        blogId,
        userId,
        userName: userName, // Using the user's name from AuthContext
        userProfilePicture: userProfilePicture, // Using the user's profile picture from AuthContext
        comment: newComment,
      });
      setComments([response.data, ...comments]);
      setNewComment("");
      toast.success("Comment added!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Error adding comment.");
    }
  };

  // Handle updating the blog (conditional update button)
  const handleUpdateBlog = () => {
    navigate(`/update-blog/${blogId}`);
  };

  if (!blog) {
    return <div>Loading...</div>; // Show loading state until the blog is fetched
  }

  return (
    <div className="container mx-auto p-6">
      {/* Blog details */}
      <div className="mb-6 w-full mx-auto  text-center">
        <h2 className="text-3xl mt- font-bold text-orange-500">{blog.title}</h2>
        <p className="mt-2 font-bold text-xl text-gray-600">{blog.category}</p>
        <img src={blog.imageUrl} alt={blog.title} className="w-full h-auto object-contain rounded-md mt-4" />
        <p className="mt-4">{blog.description}</p>

        {/* Conditional Update Button for blog owner */}
        {isOwner && (
          <button
            onClick={handleUpdateBlog}
            className="bg-lime-500 text-white py-2 px-4 rounded-md mt-6"
          >
            Update Blog
          </button>
        )}
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-800">Comments</h3>

        {/* Conditionally Render Comment Section */}
        
          <p className="text-red-500 mt-2">You cannot comment on your own blog.</p>
        
          <div className="flex items-center space-x-4">
            <img
              src={userProfilePicture || "default-profile-picture.jpg"}
              alt={userName}
              className="w-10 h-10 object-cover rounded-full"
            />
            <div className="w-full">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border rounded-md mt-2"
              ></textarea>
              <button
                onClick={handleAddComment}
                className="bg-orange-500 text-white py-2 px-4 rounded-md mt-2 w-full"
              >
                Add Comment
              </button>
            </div>
          </div>
        

        {/* Display all comments */}
        <div className="mt-4">
          {comments.map((comment) => (
            <div key={comment._id} className="border-b py-4">
              <div className="flex items-center">
                <img
                  src={comment.userProfilePicture || "default-profile-picture.jpg"}
                  alt={comment.userName}
                  className="w-10 h-10 object-cover rounded-full mr-4"
                />
                <p className="font-semibold">{comment.userName}</p>
              </div>
              <p className="text-gray-600 mt-2">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default BlogDetailsPage;
