import React, { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { app } from './Firebase';
import { useNavigate } from 'react-router-dom'; // Add this line to import useNavigate

const auth = getAuth(app);

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle Google login
  const LoginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Login successful
        setIsAuthenticated(true); // Set state to true if login is successful
      })
      .catch((error) => {
        // Handle errors here
        console.error('Login failed', error);
      });
  };

  // Effect to listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is logged in
      } else {
        setIsAuthenticated(false); // User is logged out
      }
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  // Redirect to /Chat if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/Chat'); // Redirect to Chat component
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="home-container">
      <div className="login-div">
        <h1>Welcome to Our Platform</h1>
        <div className="button-group">
          <button className="login-button google-login" onClick={LoginHandler}>
            Login with Google
          </button>
          <button className="login-button email-login">Login with Email</button>
        </div>
      </div>
    </div>
  );
}
