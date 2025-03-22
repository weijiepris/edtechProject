import React from "react";
import Login from "./pages/Login/Login";
import useAuthentication from "./hooks/useAuthentication";
import { Text, View } from "react-native";

const App = () => {
  const { isAuthenticated, error, loading, validateToken } =
    useAuthentication();

  if (loading) return <View></View>;

  if (isAuthenticated)
    return (
      <View>
        <Text>You're logged in</Text>
      </View>
    );

  return <Login validateToken={validateToken} />;
};

export default App;
