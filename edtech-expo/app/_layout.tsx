import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { AuthProvider } from './hooks/useAuth';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="dashboard/index" />
          <Stack.Screen name="chat/index" />
          <Stack.Screen name="message/index" />
          <Stack.Screen name="login/index" />
          <Stack.Screen name="register/index" />
          <Stack.Screen name="profile/index" />
          <Stack.Screen name="grades/index" />
          <Stack.Screen name="assignment/index" />
          <Stack.Screen name="leaderboard/index" />
          <Stack.Screen name="notification/index" />
        </Stack>
        <Toast />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
