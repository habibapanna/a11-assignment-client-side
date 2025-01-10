import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component"; // Import the data table component
import Skeleton from "react-loading-skeleton"; // Import Skeleton component

const FeaturedBlogsPage = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch top 10 featured blogs
  // https://blog-website-server-hazel.vercel.app/featured-blogs
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

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true, // Allow sorting
      width: "60px", // Set column width
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true, // Allow sorting
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true, // Allow sorting
    },
    {
      name: "Word Count",
      selector: (row) => row.wordCount,
      sortable: true, // Allow sorting
      right: true, // Align to the right
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
          Featured Blogs
        </h2>
        {/* Display Skeleton loaders for the data table */}
        <div className="mb-4">
          <Skeleton height={40} width="60%" className="mb-2" />
          <Skeleton height={40} width="90%" className="mb-2" />
          <Skeleton height={40} width="80%" className="mb-2" />
          <Skeleton height={40} width="70%" className="mb-2" />
        </div>
        <Skeleton count={5} height={50} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
        Featured Blogs
      </h2>

      <DataTable
        columns={columns}
        data={featuredBlogs}
        pagination // Enable pagination
        highlightOnHover // Highlight rows on hover
        dense // Make rows more compact
        noHeader // Optional, to remove the header row
        defaultSortField="title" // Default sort field
        defaultSortAsc={true} // Default sort order
      />
    </div>
  );
};

export default FeaturedBlogsPage;
