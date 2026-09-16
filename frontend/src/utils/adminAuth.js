// Admin credentials storage — client-side only (no backend auth server).
const STORAGE_KEY = 'adminCredentials';
const DEFAULT_CREDENTIALS = { username: 'admin', password: 'admin123' };

export const getStoredCredentials = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed && parsed.username && parsed.password) return parsed;
    }
  } catch (e) {
    console.error('Failed to load admin credentials:', e);
  }
  return DEFAULT_CREDENTIALS;
};

export const saveCredentials = (creds) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
  } catch (e) {
    console.error('Failed to save admin credentials:', e);
  }
};

export const validateLogin = (username, password) => {
  const creds = getStoredCredentials();
  const trimmedUser = (username || '').trim();
  return trimmedUser === creds.username && password === creds.password;
};
