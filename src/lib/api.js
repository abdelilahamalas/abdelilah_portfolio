import axios from 'axios';
import initialProjects from './initialProjects.json';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;

  const cleanPath = path.replace(/^\//, '').replace(/^storage\//, '');
  return `/${cleanPath}`;
};

api.defaults.adapter = async (config) => {
  const url = config.url || '';
  const method = (config.method || 'get').toLowerCase();

  // Public projects
  if (url.includes('/projects') && method === 'get') {
    return {
      data: { status: 'success', data: initialProjects },
      status: 200,
      statusText: 'OK',
      headers: {},
      config
    };
  }

  // Public contact form
  if (url.includes('/contact') && method === 'post') {
    const body = typeof config.data === 'string' ? JSON.parse(config.data) : (config.data || {});
    try {
      const stored = localStorage.getItem('portfolio_messages');
      const messages = stored ? JSON.parse(stored) : [];
      messages.unshift({ ...body, id: Date.now(), created_at: new Date().toISOString() });
      localStorage.setItem('portfolio_messages', JSON.stringify(messages));
    } catch {
      // Ignore storage errors in private browsing
    }
    return {
      data: { status: 'success', message: 'Message envoyé avec succès' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config
    };
  }

  return {
    data: { status: 'success', data: [] },
    status: 200,
    statusText: 'OK',
    headers: {},
    config
  };
};

export default api;
