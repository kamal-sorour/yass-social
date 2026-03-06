import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("You must be logged in to access this page", {
        id: 'auth-error-toast',
      });
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;