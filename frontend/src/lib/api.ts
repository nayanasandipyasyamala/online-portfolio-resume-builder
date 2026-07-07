const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('portfolio_token');

const headers = (includeAuth = true): HeadersInit => {
  const h: HeadersInit = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    const token = getToken();
    if (token) h['Authorization'] = `Bearer ${token}`;
  }
  return h;
};

// Check if backend is reachable
let backendAvailable: boolean | null = null;

const checkBackend = async (): Promise<boolean> => {
  if (backendAvailable !== null) return backendAvailable;
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 2000);
    const res = await fetch(API_URL.replace('/api', ''), { signal: controller.signal });
    backendAvailable = res.ok;
  } catch {
    backendAvailable = false;
  }
  return backendAvailable;
};

// ---- LocalStorage fallback (works without backend) ----

interface StoredUser { name: string; email: string; password: string; }

const getUsers = (): StoredUser[] => {
  try { return JSON.parse(localStorage.getItem('portfol_users') || '[]'); } catch { return []; }
};

const localFallback = {
  signup(name: string, email: string, password: string) {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    if (password.length < 6) throw new Error('Password must be at least 6 characters.');
    users.push({ name, email, password });
    localStorage.setItem('portfol_users', JSON.stringify(users));
    const fakeToken = btoa(JSON.stringify({ email, ts: Date.now() }));
    localStorage.setItem('portfolio_token', fakeToken);
    const user = { id: email, name, email };
    localStorage.setItem('portfolio_user', JSON.stringify(user));
    return { token: fakeToken, user };
  },

  login(email: string, password: string) {
    const user = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error('No account found with this email. Please sign up first.');
    if (user.password !== password) throw new Error('Incorrect password.');
    const fakeToken = btoa(JSON.stringify({ email, ts: Date.now() }));
    localStorage.setItem('portfolio_token', fakeToken);
    const userData = { id: email, name: user.name, email: user.email };
    localStorage.setItem('portfolio_user', JSON.stringify(userData));
    return { token: fakeToken, user: userData };
  },

  getPortfolio() {
    try { return JSON.parse(localStorage.getItem('portfolio_data') || 'null'); } catch { return null; }
  },

  updatePortfolio(updates: Record<string, any>) {
    const current = this.getPortfolio() || {};
    const merged = { ...current, ...updates };
    localStorage.setItem('portfolio_data', JSON.stringify(merged));
    return merged;
  },
};

// ---- Main API (tries backend, falls back to localStorage) ----

export const api = {
  async signup(name: string, email: string, password: string) {
    if (await checkBackend()) {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST', headers: headers(false),
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');
      localStorage.setItem('portfolio_token', data.token);
      localStorage.setItem('portfolio_user', JSON.stringify(data.user));
      return data;
    }
    return localFallback.signup(name, email, password);
  },

  async login(email: string, password: string) {
    if (await checkBackend()) {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST', headers: headers(false),
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('portfolio_token', data.token);
      localStorage.setItem('portfolio_user', JSON.stringify(data.user));
      return data;
    }
    return localFallback.login(email, password);
  },

  logout() {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
  },

  isAuthenticated() {
    return !!getToken();
  },

  getUser() {
    try { return JSON.parse(localStorage.getItem('portfolio_user') || 'null'); } catch { return null; }
  },

  async getPortfolio() {
    if (await checkBackend()) {
      const res = await fetch(`${API_URL}/portfolio`, { headers: headers() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch portfolio');
      return data;
    }
    return localFallback.getPortfolio();
  },

  async updatePortfolio(updates: Record<string, any>) {
    if (await checkBackend()) {
      const res = await fetch(`${API_URL}/portfolio`, {
        method: 'PUT', headers: headers(),
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update portfolio');
      return data;
    }
    return localFallback.updatePortfolio(updates);
  },

  async getPublicPortfolio(username: string) {
    if (await checkBackend()) {
      const res = await fetch(`${API_URL}/portfolio/public/${username}`, { headers: headers(false) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Portfolio not found');
      return data;
    }
    return localFallback.getPortfolio();
  },
};
