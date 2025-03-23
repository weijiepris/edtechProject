import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  loading: boolean;
  isAuthenticated: boolean;
  error?: string;
  validateToken: () => void;
  logout: () => void;
}

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    loading: true,
    error: undefined,
  });

  const validateToken = async (skipRequest: boolean = false) => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      if (skipRequest) {
        setState({
          isAuthenticated: true,
          loading: false,
          error: undefined,
        });
        return;
      }

      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get(`${BASE_URL}/auth/`);
      setState({
        isAuthenticated: true,
        loading: false,
        error: undefined,
      });
    } catch (error: any) {
      await AsyncStorage.removeItem("token");
      setState({
        isAuthenticated: false,
        loading: false,
        error: error?.response?.data?.message || "Failed to validate token",
      });
    }
  };

  const logout = async () => {};

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        validateToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
