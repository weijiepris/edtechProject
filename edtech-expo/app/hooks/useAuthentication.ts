/**
 * @deprecated utitlise useAuth() instead
 */
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error?: string;
}

const useAuthentication = () => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    loading: true,
    error: undefined
  });

  const validateToken = async (skipRequest: boolean = false) => {
    setState(prev => ({ ...prev, loading: true }));

    try {
      if (skipRequest) {
        setState({
          isAuthenticated: true,
          loading: false,
          error: undefined
        });
        return;
      }

      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get(`${BASE_URL}/auth/`);
      setState({
        isAuthenticated: true,
        loading: false,
        error: undefined
      });
    } catch (error: any) {
      await AsyncStorage.removeItem('token');
      setState({
        isAuthenticated: false,
        loading: false,
        error: error?.response?.data?.message || 'Failed to validate token'
      });
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return {
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    validateToken
  };
};

export default useAuthentication;
