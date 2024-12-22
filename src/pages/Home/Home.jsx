import React, { useState } from "react";
import Lottie from "react-lottie";
import welcomeLottieData from "../../assets/lottie/welcome.json";
import { toast } from "react-toastify";
import RecentBlogs from "./RecentBlogs";
import banner from '../../assets/banner/banner.jpg'
import { Typewriter } from "react-simple-typewriter";
import Marquee from "react-fast-marquee";

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
    <div className="min-h-screen bg-gray-100">
      {/* Animated Welcome Header */}
      <header
  className="bg-cover bg-center text-white p-8 text-center"
  style={{ backgroundImage: `url(${banner})` }}
>

        {/* Lottie animation */}
        <div className="mb-6">
          <Lottie options={lottieOptions}  />
        </div>
        <h1 className="text-4xl font-semibold text-lime-500">Welcome to the Blog</h1>
        <p>Your source for the latest blog posts</p>
      </header>

      {/* Recent Blog Posts Section */}
      <section className="mx-auto">
      <RecentBlogs></RecentBlogs> 
      </section>
      {/* Add your blog post cards here */}

      {/* Newsletter Section */}
      <section className="p-8 bg-white">
      <Marquee>
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">
    Subscribe to Our Newsletter
  </h2>
        </Marquee>
        <form onSubmit={handleNewsletter} className="max-w-md mx-auto text-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-3 border rounded-md w-full mb-4"
          />
          <button
            type="submit"
            className="bg-lime-600 text-white px-6 py-2 rounded-md"
          >
            Subscribe
          </button>
        </form>
      </section>
      {/* Tips Section */}
      <section className="p-8 bg-lime-100">
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
    </div>
  );
};

export default Home;
