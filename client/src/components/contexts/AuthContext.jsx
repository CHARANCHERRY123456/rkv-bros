import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

const getInitialUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedUser = jwtDecode(token);
      if (decodedUser.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return null;
      }
      return decodedUser;
    } catch (error) {
      localStorage.removeItem('token');
      toast.error("Invalid token");
      return null;
    }
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);

  const login = (token) => {
    try {
      localStorage.setItem('token', token);
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    } catch (error) {
      toast.error("Error decoding token:");
      console.error('Error decoding token:', error);
    }
  };

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
