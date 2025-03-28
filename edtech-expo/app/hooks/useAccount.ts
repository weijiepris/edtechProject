import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, IUser } from '../utils/constants';

interface AccountState {
  user: IUser | null;
  loading: boolean;
  error?: string;
}

const useAccount = () => {
  const [{ user, loading, error }, setState] = useState<AccountState>({
    user: null,
    loading: true,
    error: undefined,
  });

  const fetchAccount = async () => {
    setState(prev => ({ ...prev, loading: true }));

    try {
      const response = await axios.get(`${BASE_URL}/auth/account`);
      setState({
        user: response.data,
        loading: false,
        error: undefined,
      });
    } catch (error: any) {
      setState({
        user: null,
        loading: false,
        error: error?.response?.data?.message || 'Failed to load user data',
      });
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return {
    user,
    loading,
    error,
    refresh: fetchAccount,
  };
};

export default useAccount;
