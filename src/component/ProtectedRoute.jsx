// ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function ProtectedRoute({ children, setErrorMessage }) {
  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setErrorMessage('Please login first'); // Set the error message when the user is not authenticated
      }
    });

    return () => unsubscribe();
  }, [auth, setErrorMessage]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}
