import { BrowserRouter } from 'react-router-dom';
import LayoutComponent from './components/Layout/LayoutComponent';
import {
  Context,
  ContextProvider,
  UserPayload,
} from './components/Context/Context';
import Login from './components/Login/Login';
import { useEffect, useState } from 'react';
import axiosInstance from './services/AxiosInstance';
import React from 'react';
import { AnyObject } from 'src/Models/AnyObject';
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
  const { updateData } = React.useContext(Context);
  const [login, setLogin] = useState(false);
  const Auth = (values: AnyObject) => {
    const PostBody: User = {
      Name: values['Name'],
      Password: values['Password'],
      Permission: 'User',
    };
    axiosInstance
      .post('Auth', PostBody)
      .then((x) => {
        setLogin(true);
        console.log(login);
        if (updateData) {
          updateData(dataBind(x.data));
        }
      })
      .catch((err) => console.log(err));
  };

  const dataBind = (data: unknown): UserPayload => {
    const token: Token = JSON.parse(JSON.stringify(data));
    sessionStorage.setItem('token', token.token);
    sessionStorage.setItem('refreshToken', token.refreshToken);
    const payload: UserPayload = {
      role: token.permission,
      userId: token.userId,
      isSignedIn: true,
    };
    return payload;
  };

  const [template, setTemplate] = useState(<Login Auth={Auth}></Login>);
  useEffect(() => {
    console.log(login);
    if (login) {
      setTemplate(<LayoutComponent></LayoutComponent>);
    }
  }, [login]);
  return (
    <BrowserRouter>
      <ContextProvider>{template}</ContextProvider>
    </BrowserRouter>
  );
}

export default App;
