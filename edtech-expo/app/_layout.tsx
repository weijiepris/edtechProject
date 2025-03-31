import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { AuthProvider } from './hooks/useAuth';

export default function Layout() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="chat" />
        <Stack.Screen name="message" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="grades" />
        <Stack.Screen name="assignment" />
        <Stack.Screen name="leaderboard" />
        <Stack.Screen name="notification" />
      </Stack>
    </AuthProvider>
  );
}
