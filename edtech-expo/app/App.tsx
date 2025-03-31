import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useAuth } from './hooks/useAuth';
import Dashboard from './dashboard';
import Login from './login';
import Chat from './chat';
import Profile from './profile';
import Grades from './grades';
import Assignment from './assignment';
import Leaderboard from './leaderboard';
import Notification from './notification';
import Messages from './chat/Messages';
import Message from './message';
import Register from './register';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';

const App = () => {
  const router = useExpoRouter();
  const { loading, isAuthenticated } = useAuth();

  console.log({ isAuthenticated });
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
