import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import AuthContext from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();  // Initialize navigate

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((result) => {
        console.log("User logged in:", result.user);
        form.reset();
        toast.success("Login successful!");  // Success message after login
        navigate("/");  // Navigate to the home page
      })
      .catch((err) => {
        toast.error("Invalid email or password."); // Show error in toast
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      console.log("User logged in with Google:", result.user);
      toast.success("Login successful with Google!");  // Success message after Google login
      navigate("/");  // Navigate to the home page
    } catch (error) {
      toast.error("Google login failed."); // Show error in toast
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <div className="text-center mb-5">
              <button
                onClick={handleGoogleLogin}
                className="btn btn-outline btn-success"
              >
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
