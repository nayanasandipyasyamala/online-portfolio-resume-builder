import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from './api';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export type TemplateName = 'minimal' | 'creative' | 'corporate' | 'student' | 'one-page' | 'dark-minimal' | 'dev-blog' | 'elegant-serif' | 'minimalist-grid';

export interface PortfolioData {
  name: string;
  username: string;
  email: string;
  bio: string;
  role: string;
  avatar: string;
  skills: string[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  template: TemplateName;
  isPublished: boolean;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  settings: {
    redirectUrl?: string;
    primaryColor: string;
  };
}

const defaultData: PortfolioData = {
  name: '',
  username: '',
  email: '',
  bio: '',
  role: '',
  avatar: '',
  skills: [],
  projects: [],
  experience: [],
  education: [],
  template: 'minimal',
  isPublished: false,
  socialLinks: {},
  settings: {
    primaryColor: '#000000',
  },
};

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [isAuthenticated, setIsAuthenticated] = useState(api.isAuthenticated());
  const [loading, setLoading] = useState(false);

  // Load portfolio data on auth
  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      api.getPortfolio()
        .then(portfolio => {
          setData(prev => ({ ...prev, ...portfolio }));
        })
        .catch(err => {
          console.error('Failed to load portfolio:', err);
          // If token is invalid, log out
          if (err.message?.includes('token') || err.message?.includes('denied')) {
            api.logout();
            setIsAuthenticated(false);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  const updateData = (updates: Partial<PortfolioData>) => {
    setData(prev => ({ ...prev, ...updates }));
    // Save to backend (fire and forget)
    if (isAuthenticated) {
      api.updatePortfolio(updates).catch(err => console.error('Auto-save failed:', err));
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const result = await api.signup(name, email, password);
    setData(prev => ({
      ...prev,
      name: result.user.name,
      email: result.user.email,
      username: result.user.name.toLowerCase().replace(/\s+/g, ''),
    }));
    setIsAuthenticated(true);
  };

  const login = async (email: string, password: string) => {
    const result = await api.login(email, password);
    setData(prev => ({
      ...prev,
      name: result.user.name,
      email: result.user.email,
      username: result.user.name.toLowerCase().replace(/\s+/g, ''),
    }));
    setIsAuthenticated(true);
  };

  const logout = () => {
    api.logout();
    setIsAuthenticated(false);
    setData(defaultData);
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData, isAuthenticated, login, signup, logout, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};
