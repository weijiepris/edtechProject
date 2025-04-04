import React, { useEffect } from 'react';
import App from './App';
import { setupAxios } from './config/axios';

const Index = () => {
  useEffect(() => {
    setupAxios();
  }, []);

  return <App />;
};

export default Index;
