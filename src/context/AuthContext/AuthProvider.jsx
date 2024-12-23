import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the full user object
  const [userId, setUserId] = useState(null); // Store the userId (uid) separately
  const [userName, setUserName] = useState(""); // Store the user's name
  const [userProfilePicture, setUserProfilePicture] = useState(""); // Store the user's profile picture
  const [loading, setLoading] = useState(true);

  // Create a new user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user with email and password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout user
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // Reset the user state after logout
        setUserId(null); // Reset userId
        setUserName(""); // Reset userName
        setUserProfilePicture(""); // Reset profile picture
      })
      .catch((error) => {
        console.error("Error during logout: ", error);
      });
  };

  // Observe auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserId(currentUser?.uid || null); // Extract and set the userId
      if (currentUser) {
        setUserName(currentUser.displayName || "Guest"); // Get the user's name (or set to "Guest")
        setUserProfilePicture(currentUser.photoURL || ""); // Get the user's profile picture URL
      }
      console.log("Auth state changed:", currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,            // The full user object
    userId,          // The user's unique ID (uid)
    userName,        // The user's name
    userProfilePicture, // The user's profile picture URL
    loading,
    createUser,
    loginUser,
    googleLogin,
    logoutUser,      // Add logoutUser function to context
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
