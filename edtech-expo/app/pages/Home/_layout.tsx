import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="Home" options={{ title: "Home Screen" }} />
      <Stack.Screen name="Profile" options={{ title: "Profile" }} />
      <Stack.Screen name="Settings" options={{ title: "Settings" }} />
    </Stack>
  );
}
