import React from "react";
import Login from "./pages/Login/Login";
// import useAuthentication from "./hooks/useAuthentication";
import { Text, View } from "react-native";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { loading, isAuthenticated, validateToken } = useAuth();

  if (loading) return <View></View>;
  if (isAuthenticated) return <Dashboard />;
  return <Login validateToken={validateToken} />;
};

export default App;
