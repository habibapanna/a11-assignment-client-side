import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import AllBlogsPage from "../pages/AllBlogs/AllBlogs";
import AddBlogPage from "../pages/AddBlogPage/AddBlogPage";
import PrivateRoute from "./PrivateRoute";
import FeaturedBlogsPage from "../pages/FeaturedBlogsPage/FeaturedBlogsPage";
import WishListPage from "../pages/WishListPage/WishListPage";
import BlogDetailsPage from "../pages/BlogDetailsPage/BlogDetailsPage";
import UpdateBlog from "../pages/UpdateBlog/UpdateBlog";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <h2>Page not found</h2>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "/register",
            element: <Register></Register>,
        },
        {
            path: "/login",
            element: <Login></Login>,
        },
        {
            path: "/all-blogs",
            element: <AllBlogsPage></AllBlogsPage>,
        },
        {
            path: "/add-blog",
            element: <PrivateRoute><AddBlogPage></AddBlogPage></PrivateRoute>,
        },
        {
            path: "/featured-blogs",
            element: <FeaturedBlogsPage></FeaturedBlogsPage>,
        },
        {
            path: "/wishlist",
            element: <PrivateRoute><WishListPage></WishListPage></PrivateRoute>,
            loader: () => fetch('http://localhost:5000/wishList')
        },
        {
            path: "/blog-details/:blogId",
            element: <BlogDetailsPage></BlogDetailsPage>,
        },
        {
            path: "/update-blog/:blogId",
            element: <PrivateRoute><UpdateBlog></UpdateBlog></PrivateRoute>,
        },
      ]
    },
  ]);

  export default router;