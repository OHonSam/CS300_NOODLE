import { decryptToken, getStoredToken, removeStoredToken } from '../services/auth/tokenService';

export const useAuth = () => {
  const token = getStoredToken();
  
  if (!token) {
    return { user: null, isAuthenticated: false };
  }

  const decodedToken = decryptToken(token);
  
  if (!decodedToken) {
    removeStoredToken();
    return { user: null, isAuthenticated: false };
  }

  if (decodedToken.exp * 1000 < Date.now()) {
    removeStoredToken();
    return { user: null, isAuthenticated: false };
  }

  return {
    user: decodedToken,
    isAuthenticated: true
  };
};
