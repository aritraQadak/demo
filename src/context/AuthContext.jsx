import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('karigar-auth-token') || null;
    } catch (e) {
      console.warn('Error reading karigar-auth-token:', e);
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('karigar-user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.warn('Error reading karigar-user:', e);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Validate session on mount if token exists
  useEffect(() => {
    let isMounted = true;

    async function verifySession() {
      const storedToken = localStorage.getItem('karigar-auth-token');
      if (!storedToken) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.user) {
            setUser(data.user);
            localStorage.setItem('karigar-user', JSON.stringify(data.user));
          }
        } else {
          // Token expired or invalid
          if (isMounted) {
            setToken(null);
            setUser(null);
            localStorage.removeItem('karigar-auth-token');
            localStorage.removeItem('karigar-user');
          }
        }
      } catch (err) {
        console.warn('Session verification network error:', err);
        // Keep cached user if offline, but finish loading
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    verifySession();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Log in with Email/Mobile, Password and Selected Role
   */
  const login = async (identifier, password, selectedRole = 'ARTISAN') => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier, password, selectedRole })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Login failed. Please check your credentials.');
    }

    setToken(data.token);
    setUser(data.user);

    try {
      localStorage.setItem('karigar-auth-token', data.token);
      localStorage.setItem('karigar-user', JSON.stringify(data.user));
    } catch (e) {
      console.warn('Error storing auth token:', e);
    }

    return data.user;
  };

  /**
   * Register a new artisan account
   */
  const signup = async (formData) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Registration failed. Please check your inputs.');
    }

    setToken(data.token);
    setUser(data.user);

    try {
      localStorage.setItem('karigar-auth-token', data.token);
      localStorage.setItem('karigar-user', JSON.stringify(data.user));
    } catch (e) {
      console.warn('Error storing auth token:', e);
    }

    return data.user;
  };

  /**
   * Log in with Google authentication
   */
  const loginWithGoogle = async (googleToken, selectedRole) => {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: googleToken, selectedRole })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Google authentication failed.');
    }

    setToken(data.token);
    setUser(data.user);

    try {
      localStorage.setItem('karigar-auth-token', data.token);
      localStorage.setItem('karigar-user', JSON.stringify(data.user));
    } catch (e) {
      console.warn('Error storing auth token:', e);
    }

    return data.user;
  };

  /**
   * Refresh current user profile data from backend
   */
  const refreshUser = useCallback(async () => {
    const currentToken = localStorage.getItem('karigar-auth-token') || token;
    if (!currentToken) return null;

    try {
      const res = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          localStorage.setItem('karigar-user', JSON.stringify(data.user));
          return data.user;
        }
      }
    } catch (err) {
      console.warn('refreshUser error:', err);
    }
    return null;
  }, [token]);

  /**
   * Update current user profile in backend and local state
   */
  const updateUserProfile = async (updates) => {
    const currentToken = localStorage.getItem('karigar-auth-token') || token;
    if (!currentToken) throw new Error('Not authenticated');

    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentToken}`
      },
      body: JSON.stringify(updates)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to update profile');
    }

    setUser(data.user);
    try {
      localStorage.setItem('karigar-user', JSON.stringify(data.user));
    } catch (e) {
      console.warn('Error persisting updated user:', e);
    }

    return data.user;
  };

  /**
   * Upload and save a new profile picture
   */
  const uploadAvatar = async (file) => {
    const currentToken = localStorage.getItem('karigar-auth-token') || token;
    if (!currentToken) throw new Error('Not authenticated');

    // Validate type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Please select a valid image file (JPEG, PNG, or WEBP).');
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_SIZE) {
      throw new Error('Image size must be less than 5 MB.');
    }

    // Convert to base64 data URL
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });

    const res = await fetch('/api/profile/avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentToken}`
      },
      body: JSON.stringify({
        image: base64Data,
        mimeType: file.type,
        filename: file.name
      })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to upload profile picture');
    }

    setUser(data.user);
    try {
      localStorage.setItem('karigar-user', JSON.stringify(data.user));
    } catch (e) {
      console.warn('Error persisting updated user:', e);
    }

    return data;
  };

  /**
   * Log out: clears auth session while preserving karigar-theme & karigar-language
   */
  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    } catch (e) {
      // Ignore network errors on logout
    }

    setToken(null);
    setUser(null);

    try {
      localStorage.removeItem('karigar-auth-token');
      localStorage.removeItem('karigar-user');
      // karigar-theme and karigar-language are strictly preserved
    } catch (e) {
      console.warn('Error clearing auth storage:', e);
    }
  }, []);

  const isAuthenticated = Boolean(token && user);
  const role = user?.role || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isAuthenticated,
        loading,
        login,
        loginWithGoogle,
        signup,
        logout,
        setUser,
        updateUserProfile,
        uploadAvatar,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
