import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../Api/Axios'; // Import your axios instance

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

  // Check if user is logged in on initial load
const [loadingAuth, setLoadingAuth] = useState(true);

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      localStorage.removeItem('user');
    }
  }
  setLoadingAuth(false);
}, []);

  // Register function
  const register = async (userData) => {
    try {
      // First check if user exists in JSON Server
      const response = await api.get(`/users?email=${userData.email}`);
      
      if (response.data.length > 0) {
        return { 
          success: false, 
          error: 'Email already registered' 
        };
      }

      // Create new user with ID
      const newUser = {
        ...userData,
        id: Date.now().toString()
      };

      // Save to JSON Server
      await api.post('/users', newUser);
      
      return { success: true };
    } catch (error) {
      // If JSON Server is not running, use localStorage as fallback
      if (error.code === 'ERR_NETWORK') {
        return registerWithLocalStorage(userData);
      }
      return { 
        success: false, 
        error: 'Registration failed' 
      };
    }
  };

  // Fallback registration with localStorage
  const registerWithLocalStorage = (userData) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      if (existingUsers.some(u => u.email === userData.email)) {
        return { 
          success: false, 
          error: 'Email already registered' 
        };
      }

      const newUser = {
        ...userData,
        id: Date.now().toString()
      };

      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: 'Registration failed' 
      };
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      // Try JSON Server first
      const response = await api.get(`/users?email=${email}&password=${password}`);
      
      if (response.data.length > 0) {
        const user = response.data[0];
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return { success: true, user };
      }

      // Fallback to localStorage
      return loginWithLocalStorage(email, password);
    } catch (error) {
      // If JSON Server is not running, use localStorage
      if (error.code === 'ERR_NETWORK') {
        return loginWithLocalStorage(email, password);
      }
      return { 
        success: false, 
        error: 'Login failed' 
      };
    }
  };

  // Fallback login with localStorage
  const loginWithLocalStorage = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        return { 
          success: false, 
          error: 'Invalid email or password' 
        };
      }

      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
      return { success: true, user: foundUser };
    } catch (error) {
      return { 
        success: false, 
        error: 'Login failed' 
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Check if JSON Server is running
  const checkServerStatus = async () => {
    try {
      await api.get('/users');
      return true;
    } catch (error) {
      return false;
    }
  };

  const value = {
    user,
    register,
    login,
    logout,
    checkServerStatus,
    isAuthenticated: !!user,
    loadingAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};