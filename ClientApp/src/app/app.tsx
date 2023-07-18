import { BrowserRouter } from 'react-router-dom';
import AppContext, { UserPayload } from './components/Context/Context';
import { useEffect, useState } from 'react';
import { AnyObject } from 'antd/es/table/Table';
import LayoutComponent from './components/Layout/LayoutComponent';
import Login from './components/Login/Login';
import axiosInstance from './services/AxiosInstance';
import useAuthCheck from './Hooks/useAuthCheck';
type User = {
  Name: string;
  Password: string;
  Permission: string;
};

type Token = {
  token: string;
  refreshToken: string;
  userId: string;
  permission: string;
};

export function App() {
  const { template, data, updateData } = useAuthCheck();
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ data, updateData }}>
        {template}
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
