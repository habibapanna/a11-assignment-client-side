import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext); // Get user and logoutUser from context

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/add-blog">Add Blog</NavLink></li>
      <li><NavLink to="/all-blogs">All blogs</NavLink></li>
      <li><NavLink to="/featured-blogs">Featured Blogs</NavLink></li>
      <li><NavLink to="/wishlist">Wishlist</NavLink></li>
    </>
  );

  const handleLogout = () => {
    logoutUser();  // Call the logout function
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <a className="text-lime-500  font-bold btn btn-ghost text-2xl">
            <img className="w-12" src="https://i.ibb.co.com/3s1r4pc/download-13.jpg" alt="" />
            Blogger
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold text-gray-700">{user.displayName || "User"}</span>
              </div>
              <button onClick={handleLogout} className="btn bg-orange-500">Logout</button>
            </>
          ) : (
            <>
              <Link className="hover:underline text-orange-500" to="/register">Register</Link>
              <Link className="btn bg-lime-500 ml-5" to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
