import React from "react";
import App from "./App";
import { AuthProvider } from "./hooks/useAuth";

const Index = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default Index;
