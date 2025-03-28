import React from "react";
import { View } from "react-native";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./dashboard";
import Login from "./login";
import Chat from "./chat";

const App = () => {
  const { loading, isAuthenticated, validateToken } = useAuth();

  if (loading) return <View></View>;
  if (isAuthenticated) return <Dashboard />;
  // if (isAuthenticated) return <Chat />;
  return <Login validateToken={validateToken} />;
};

export default App;
