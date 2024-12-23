import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth"; // Import updateProfile
import AuthContext from "../../context/AuthContext/AuthContext";
import lottieRegister from '../../assets/lottie/register.json';
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const photoURL = form.photoURL.value.trim();

    // Validate inputs
    if (!name) {
      toast.error("Name is required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address.");
      return;
    }

    const passwordErrors = [];
    if (password.length < 6) passwordErrors.push("at least 6 characters");
    if (!/[A-Z]/.test(password)) passwordErrors.push("a capital letter");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) passwordErrors.push("a special character");
    if (!/\d/.test(password)) passwordErrors.push("a numeric character");

    if (passwordErrors.length > 0) {
      toast.error(`Password must include ${passwordErrors.join(", ")}.`);
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      // Update the user's profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || "", // Set the photo URL if provided
      });

      toast.success("Registration successful!");
      form.reset(); // Reset the form after successful registration
      navigate("/");
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };

  // Configure Lottie animation options
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieRegister,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <div className="hero bg-lime-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            {/* Lottie animation */}
            <Lottie options={lottieOptions} height={300} width={300} />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <h1 className="text-center font-bold text-3xl text-orange-500">Register Now!</h1>
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Photo URL Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  placeholder="Enter your photo URL"
                  name="photoURL"
                  className="input input-bordered"
                />
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Register Button */}
              <div className="form-control mt-6">
                <button type="submit" className="btn bg-orange-500">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;