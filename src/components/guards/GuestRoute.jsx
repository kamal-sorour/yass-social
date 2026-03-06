import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      toast.success("You are already logged in.", {
        id: 'auth-success-toast',
      });
      navigate('/app', { replace: true });
    }
  }, [token, navigate]);

  if (token) {
    return null;
  }

  return children;
};

export default GuestRoute;