import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAuthUser } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: IAuthUser | null;
  token: string | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('portfolio_admin_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  useEffect(() => {
    async function verify() {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const authUser = await api.checkAuth();
        setUser(authUser);
      } catch (err) {
        console.warn('Session expired or invalid token');
        localStorage.removeItem('portfolio_admin_token');
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    verify();
  }, [token]);

  const login = async (email: string, pass: string) => {
    const res = await api.login(email, pass);
    localStorage.setItem('portfolio_admin_token', res.token);
    setToken(res.token);
    setUser(res.user);
    setShowLoginModal(false);
  };

  const logout = () => {
    localStorage.removeItem('portfolio_admin_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin: !!user && user.role === 'admin',
        isLoading,
        login,
        logout,
        showLoginModal,
        setShowLoginModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
