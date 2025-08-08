import { useState, useEffect } from 'react';
import { initializeLiff, isLoggedIn, getProfile, login, logout } from '@/lib/liff';

interface LineUser {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export const useLineAuth = () => {
  const [user, setUser] = useState<LineUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const success = await initializeLiff();
        if (success) {
          setInitialized(true);
          
          const loggedIn = await isLoggedIn();
          if (loggedIn) {
            const profile = await getProfile();
            if (profile) {
              setUser({
                userId: profile.userId,
                displayName: profile.displayName,
                pictureUrl: profile.pictureUrl,
                statusMessage: profile.statusMessage,
              });
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = async () => {
    await login();
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return {
    user,
    loading,
    initialized,
    login: handleLogin,
    logout: handleLogout,
  };
}; 