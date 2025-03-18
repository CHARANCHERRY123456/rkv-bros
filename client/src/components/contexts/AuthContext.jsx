import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage for token and decode user info
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);

        // Check if token is expired
        if (decodedUser.exp * 1000 < Date.now()) {
          logout(); // Remove expired token
        } else {
          setUser(decodedUser);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        logout(); // Remove invalid token
      }
    }
  }, []);

  // Login function
  const login = (token) => {
    try {
      localStorage.setItem('token', token);
      console.log(localStorage.getItem('token'));
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
