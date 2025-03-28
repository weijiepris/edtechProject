import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { AuthProvider } from "./hooks/useAuth";

export default function Layout() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Stack
        screenOptions={{
          headerShown: false, // default: hide headers for all
        }}
      >
        <Stack.Screen
          name="chat"
          options={{ title: "Chat", headerShown: true }}
        />
        <Stack.Screen
          name="dashboard"
          options={{ title: "Dashboard", headerShown: false }}
        />
        <Stack.Screen
          name="login"
          options={{ title: "Login", headerShown: false }}
        />
      </Stack>
    </AuthProvider>
  );
}
