import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const appContext = useAppContext();

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      // Update last login in app context
      if (userData.role === 'customer') {
        appContext.updateUser(userData.id, {
          lastLogin: new Date().toISOString().split('T')[0]
        });
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user in global app state
    const foundUser = appContext.users.find(u => u.email === email);

    // Mock password validation (in real app, this would be handled by backend)
    const mockPasswords: Record<string, string> = {
      'tanzeel@example.com': 'password',
      'admin@example.com': 'admin123',
      'ahmed@example.com': 'password',
      'sara@example.com': 'password'
    };

    if (foundUser && mockPasswords[email] === password) {
      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      // Update last login in app context
      appContext.updateUser(foundUser.id, {
        lastLogin: new Date().toISOString().split('T')[0]
      });

      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = appContext.users.find(u => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }

    // Add user to global app state
    appContext.addUser({
      name,
      email,
      role: 'customer',
      phone: '',
      address: ''
    });

    // Create user session
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      role: 'customer',
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
