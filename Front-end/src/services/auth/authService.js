// src/services/auth/authService.js
const PORT = import.meta.env.VITE_BACKEND_PORT;
const BASE_URL = `http://localhost:${PORT}/api/auth`;

export const loginUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data;
};

export const requestPasswordReset = async (username) => {
  const response = await fetch(`${BASE_URL}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username })
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Password reset request failed');
  }
  return data;
};

export const verifyOTP = async (username, otp) => {
    const response = await fetch(`${BASE_URL}/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, otp })
    });
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'OTP verification failed');
    }
    return data;
  };
  
  export const changePassword = async (username, newPassword, tempToken) => {
    const response = await fetch(`${BASE_URL}/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tempToken}`
      },
      body: JSON.stringify({ username, newPassword })
    });
  
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Password change failed');
    }
    return data;
  };

  export const logOut = async () => {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Logout failed');
    }
    return data;
  };