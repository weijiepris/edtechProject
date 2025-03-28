import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { AuthProvider } from './hooks/useAuth';

export default function Layout() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Stack
        screenOptions={{
          headerShown: false // default: hide headers for all
        }}
      >
        <Stack.Screen name="chat" />
        <Stack.Screen name="message" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="login" />
        <Stack.Screen name="profile" />
      </Stack>
    </AuthProvider>
  );
}
