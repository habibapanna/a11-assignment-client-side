import React, { useState } from "react";
import Lottie from "react-lottie";
import welcomeLottieData from "../../assets/lottie/welcome.json";
import { toast } from "react-toastify";
import RecentBlogs from "./RecentBlogs";
import banner from '../../assets/banner/banner.jpg';
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

// Trending Topics data (dummy data for now)
const trendingTopics = [
  { title: "Tech Trends", icon: "💻" },
  { title: "Health & Wellness", icon: "🏥" },
  { title: "Travel Adventures", icon: "✈️" },
  { title: "Food & Recipes", icon: "🍔" },
  { title: "Lifestyle", icon: "🌿" },
  { title: "Finance", icon: "💸" }
];

// Updated author data with provided images
const authors = [
  { name: "John Doe", photo: "https://i.ibb.co.com/vDMWj8b/business-man-by-skyscraper.jpg", description: "Tech Enthusiast and Blogger" },
  { name: "Jane Smith", photo: "https://i.ibb.co.com/PtMCRj6/young-adult-enjoying-virtual-date.jpg", description: "Health & Wellness Expert" },
  { name: "Alice Johnson", photo: "https://i.ibb.co.com/X7nX7qD/horizontal-portrait-smiling-happy-young-pleasant-looking-female-wears-denim-shirt-stylish-glasses-wi.jpg", description: "Travel Blogger" }
];

const Home = () => {
  const [email, setEmail] = useState("");

  // Handle newsletter subscription
  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email.");
    }
  };

  // Lottie animation options
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: welcomeLottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="min-h-screen bg-orange-300">
      {/* Animated Welcome Header */}
      <header className="bg-cover bg-center text-white p-8 text-center" style={{ backgroundImage: `url(${banner})` }}>
        {/* Lottie animation */}
        <div className="mb-6">
          <Lottie options={lottieOptions} />
        </div>
        <h1 className="text-4xl font-semibold text-lime-300">Welcome to the Blog</h1>
        <p>Your source for the latest blog posts</p>
      </header>

      {/* Recent Blog Posts Section */}
      <section className="mx-auto">
        <RecentBlogs />
      </section>

      {/* Newsletter Section */}
      <section className="p-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">Subscribe to Our Newsletter</h2>
        <form onSubmit={handleNewsletter} className="max-w-md mx-auto text-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-3 border rounded-md w-full mb-4"
          />
          <button type="submit" className="bg-lime-600 text-white px-6 py-2 rounded-md">
            Subscribe
          </button>
        </form>
      </section>

      {/* Tips Section */}
      <section className="p-8 bg-lime-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">
          <Typewriter
            words={['Tips to Enhance Your Experience']}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
          />
        </h2>
        <ul className="list-disc pl-10">
          <li>Engage with the community by commenting on your favorite blogs.</li>
          <li>Bookmark blogs you love and come back to them later.</li>
          <li>Share your favorite blogs with friends on social media.</li>
        </ul>
      </section>

      {/* Trending Topics Section (New) */}
      <section className="p-8 bg-gradient-to-r from-orange-400 to-lime-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Trending Topics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="text-4xl">{topic.icon}</div>
              <h3 className="text-lg font-semibold mt-2">{topic.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Author Spotlight Section (New) */}
      <section className="p-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">Meet Our Authors</h2>
        <div className="relative overflow-hidden">
          {/* Wave-like animation of author images */}
          <motion.div
            className="flex flex-wrap justify-center space-x-6 space-y-6 lg:space-y-0 lg:space-x-6"
            animate={{
              y: [0, 20, 0, -20, 0], // Creates an up-and-down wave movement
            }}
            transition={{
              y: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 3, // Controls speed of the wave (3 seconds for one full cycle)
                ease: "easeInOut",
              },
            }}
          >
            {authors.map((author, index) => (
              <div key={index} className="w-60 text-center py-10">
                <div className="h-60 w-60 bg-gray-300 rounded-full overflow-hidden mx-auto">
                  <motion.img
                    src={author.photo}
                    alt={author.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-3">{author.name}</h3>
                <p>{author.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
