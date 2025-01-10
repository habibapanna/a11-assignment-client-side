import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Using react-icons for social media

const Footer = () => {
  return (
    <div className="bg-black text-gray-700 mt-12">
      <footer className="footer p-10">
        <div className="footer-section">
          <h3 className="text-xl font-bold text-lime-500">Blog</h3>
          <ul className="list-none">
            <li><Link to="/" className="hover:text-lime-500">Home</Link></li>
            <li><Link to="/add-blog" className="hover:text-lime-500">Add Blog</Link></li>
            <li><Link to="/all-blogs" className="hover:text-lime-500">All Blogs</Link></li>
            <li><Link to="/featured-blogs" className="hover:text-lime-500">Featured Blogs</Link></li>
            <li><Link to="/wishlist" className="hover:text-lime-500">Wishlist</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="text-xl font-bold text-lime-500">Follow Us</h3>
          <div className="flex space-x-4">
            <Link to="#" className="text-2xl hover:text-lime-500">
              <FaFacebook />
            </Link>
            <Link to="#" className="text-2xl hover:text-lime-500">
              <FaTwitter />
            </Link>
            <Link to="#" className="text-2xl hover:text-lime-500">
              <FaInstagram />
            </Link>
            <Link to="#" className="text-2xl hover:text-lime-500">
              <FaLinkedin />
            </Link>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="text-xl font-bold text-lime-500">Contact</h3>
          <p>Email: support@blog.com</p>
          <p>Phone: +8801813626884</p>
        </div>

        <div className="footer-bottom w-full border-t pt-6 mt-6">
          <div className="flex justify-between">
            <p className="text-sm">© 2024 Blog. All rights reserved.</p>
            <Link to="/my-profile" className="text-sm hover:text-lime-500">Your Profile</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
