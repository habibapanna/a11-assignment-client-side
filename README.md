# Blog Website

Welcome to the **Blog Website Development Project**! This is a fully responsive and feature-rich blogging platform designed to provide a seamless and engaging user experience. Built with **React**, **Firebase**, and **MongoDB**, the project showcases modern front-end development practices while integrating powerful back-end capabilities.

## Purpose

This project is aimed at creating a next-generation blog website where users can explore, write, and manage blogs effortlessly. The platform is designed to be user-friendly, visually appealing, and optimized for all devices. It's an excellent demonstration of front-end and back-end integration, authentication, and dynamic content management.

## Live Site
Live Site URL(#)(https://blog-website-7c3f1.web.app)

## Features

### General Features
- Fully responsive design for mobile, tablet, and desktop.
- Eye-pleasing color contrast and proper alignment.
- Secure Firebase and MongoDB credentials using environment variables.
- JWT authentication for private routes.

### Core Functionalities

#### Home Page
- **Navbar** with navigation links for Home, Add Blog (Private), All Blogs, Featured Blogs, and Wishlist (Private).
  - Shows Login/Register buttons for unauthenticated users.
  - Displays the user’s profile picture and logout button when logged in.
- **Banner Section**: Beautiful hero section with a welcoming design.
- **Recent Blogs Section**: Displays six recent blogs with title, short description, and actionable buttons (Details, Wishlist).
- **Newsletter Section**: Allows users to subscribe with email and displays a toast message.
- Two additional custom sections to enhance the website’s uniqueness.

#### Authentication System
- Email/password-based authentication.
- Social login option (e.g., Google, Facebook, or GitHub).
- Validation for registration passwords:
  - Minimum 6 characters.
  - Includes uppercase, special characters, and numeric characters.
- Error display for failed authentication attempts.
- 404 page for unmatched routes.

#### Blog Management
- **Add Blog Page**: Private route with a form to submit blog details.
- **Blog Details Page**: Displays all blog details, comments section, and conditional functionalities:
  - Only blog owners can update their blogs.
  - Blog owners cannot comment on their own blogs.
  - Comments include the commenter’s name and profile picture.
- **Update Blog Page**: Pre-filled form for editing blogs, accessible only to the blog owner.

#### All Blogs Page
- Displays all blogs with title, image, short description, and actionable buttons (Details, Wishlist).
- Filter blogs by category.
- Search blogs by title using MongoDB text search.

#### Featured Blogs Page
- Displays the top 10 blogs based on the word count of the long description.
- Interactive table with sortable columns (using libraries like Tanstack Table, React-data-table, etc.).

#### Wishlist Page
- Shows all blogs wishlisted by the logged-in user.
- Remove blogs from the wishlist with a single click.

### Additional Enhancements
- Skeleton loading for smoother data fetching.
- Full-screen photo view on blog image click.
- Intersection animations for sections using **react-intersection-observer** and **Framer Motion**.
- Uses a modern component library like Chakra UI, Ant Design, or Material UI.

## Deployment Guidelines
- Ensure the server is error-free (CORS/404/504 errors).
- Configure Firebase authorization domains correctly.
- Private routes persist login state on reload.
- Provide error-free navigation across all routes.

## Technologies Used
- **React**: For building the front-end.
- **Firebase**: For authentication and hosting.
- **MongoDB**: For database management.
- **JWT**: For secure route authentication.
- **Framer Motion**: For animations.
- **React-Photo-View**: For image previews.
- **React-Loading-Skeleton**: For skeleton loading states.
- **React-Intersection-Observer**: For section animations.
- Component Library: (e.g., Chakra UI, Material UI, etc.)

## Installation & Usage

1. Clone the repositories:
   ```bash
   git clone <client-repo-url>
   git clone <server-repo-url>
   ```
2. Install dependencies for both client and server:
   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```
3. Configure environment variables:
   - Firebase keys in `.env` for the client.
   - MongoDB credentials in `.env` for the server.
4. Run the development servers:
   ```bash
   cd client
   npm start

   cd ../server
   npm start
   ```
5. Deploy the application:
   - Use Firebase Hosting or Vercel for the client.
   - Use Render or Heroku for the server.

## Commit Guidelines
- **Client:** At least 15 meaningful commits with descriptive messages.
- **Server:** At least 8 meaningful commits with descriptive messages.

Thank you for your interest in this project. We look forward to seeing your creative implementation!
