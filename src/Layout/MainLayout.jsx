import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners"; // Importing a spinner component

const MainLayout = () => {
  const [loading, setLoading] = useState(true); // Track the loading state

  // Simulate loading when the page is first loaded or reloaded
  useEffect(() => {
    // Simulate a delay, e.g., fetching data or waiting for resources
    const timer = setTimeout(() => {
      setLoading(false); // Hide spinner after 2 seconds or based on actual loading state
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer when component unmounts
  }, []);

  return (
    <div className="min-h-screen max-w-6xl mx-auto flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="#ff4500" size={50} />
          </div>
        ) : (
          <Outlet /> // Display the Outlet (content) when loading is false
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
