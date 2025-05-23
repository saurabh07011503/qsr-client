 
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Types
interface User {
  id: string;
  employeeId: string;
  name: string;
  role: 'customer' | 'admin';
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  register: (userData: { employeeId: string; name: string; email: string; password: string; role: 'customer' | 'admin' }) => Promise<boolean>;
  login: (credentials: { employeeId: string; password: string }) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API configuration
const API_URL = 'https://qsr-server-m9aa.onrender.com/api';
axios.defaults.baseURL = API_URL;

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for existing auth token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Get user data if token exists
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  // Register new user
  const register = async (userData): Promise<boolean> => {
    try {
      const response = await axios.post('/auth/register', userData);
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
        // Navigate to login page
        window.location.href = '/login';
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  // Login user
  const login = async (credentials: { employeeId: string; password: string }): Promise<boolean> => {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };
  
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      register,
      login,
      logout,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
