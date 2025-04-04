import React, { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';

const App = () => {
  const router = useExpoRouter();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [isAuthenticated, loading]);
};

export default App;
