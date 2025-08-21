import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/client';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Check if user is logged in on mount
  useEffect(() => {
    if (token) {
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, [token]);

  const checkAuthStatus = async () => {
    try {
      const response = await apiClient.get('/auth/me');
      const data = response.data;

      if (response.status === 200) {
        setUser(data.data);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const data = response.data;

      if (response.status === 200) {
        const { user: userData, token: authToken } = data.data;
        
        // Store token
        localStorage.setItem('token', authToken);
        setToken(authToken);
        
        // Set user data
        setUser(userData);
        
        return { success: true, user: userData };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.response?.data?.message || 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      const data = response.data;

      if (response.status === 201) {
        // Don't store token or set user since email verification is required
        // Return success with redirect info
        return { 
          success: true, 
          message: data.message,
          redirectTo: `/verify-email?email=${encodeURIComponent(userData.email)}`
        };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: error.response?.data?.message || 'Network error. Please try again.' };
    }
  };

  const setupOwner = async (userData) => {
    try {
      const response = await apiClient.post('/auth/setup-owner', userData);
      const data = response.data;

      if (response.status === 201) {
        const { user: newUser, token: authToken } = data.data;
        
        // Store token for owner setup
        localStorage.setItem('token', authToken);
        setToken(authToken);
        
        // Set user data
        setUser(newUser);
        
        return { success: true, user: newUser };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Owner setup error:', error);
      return { success: false, message: error.response?.data?.message || 'Network error. Please try again.' };
    }
  };

  const checkOwnerExists = async () => {
    try {
      const response = await apiClient.get('/auth/check-owner');
      const data = response.data;
      
      if (response.status === 200) {
        return data.data.ownerExists;
      }
      return false;
    } catch (error) {
      console.error('Check owner error:', error);
      return false;
    }
  };

  const updateUser = (userData) => {
    console.log('AuthContext updateUser called with:', userData);
    console.log('Previous user state:', user);
    setUser(userData);
    console.log('User state updated to:', userData);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    setupOwner,
    checkOwnerExists,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isOwner: user?.role === 'owner',
    isAdminOrOwner: user?.role === 'admin' || user?.role === 'owner'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};