import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { loginUser, signupUser } from '../services/authService';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const useLogin = () => {
  const { saveAuthData } = useAuthContext();
  
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      if (response.success) {
        saveAuthData(response.data.token, response.data.user);
      }
    },
  });
};

export const useSignup = () => {
  const { saveAuthData } = useAuthContext();
  
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (response) => {
      if (response.success) {
        saveAuthData(response.data.token, response.data.user);
      }
    },
  });
};