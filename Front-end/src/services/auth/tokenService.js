import CryptoJS from "crypto-js";
const SECRET_KEY = import.meta.env.VITE_JWT_SECRET;

export const decryptToken = (encryptedToken) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const originalToken = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!originalToken) {
      return null;
    }

    const payload = originalToken.split('.')[1];
    const decodedData = decodeURIComponent(escape(atob(payload)));

    return JSON.parse(decodedData);
  } catch (error) {
    console.error('Token decryption failed', error);
    return null;
  }
};

export const getStoredToken = () => localStorage.getItem('token');
export const setStoredToken = (token) => localStorage.setItem('token', token);
export const removeStoredToken = () => localStorage.removeItem('token');

export const getTempToken = () => localStorage.getItem('tempToken');
export const setTempToken = (token) => localStorage.setItem('tempToken', token);
export const removeTempToken = () => localStorage.removeItem('tempToken');
