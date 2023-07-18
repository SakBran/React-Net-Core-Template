import { AnyObject } from 'antd/es/table/Table';
import { useState, useEffect } from 'react';
import { UserPayload } from '../components/Context/Context';
import LayoutComponent from '../components/Layout/LayoutComponent';
import Login from '../components/Login/Login';
import axiosInstance from '../services/AxiosInstance';
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

const getIntial = (): UserPayload => {
  const defaultResponse: UserPayload = {
    role: '',
    userId: '',
    isSignedIn: false,
  };
  const useId = localStorage.getItem('userId');
  const permission = localStorage.getItem('permission');
  if (useId && permission) {
    try {
      const response: UserPayload = {
        role: permission,
        userId: useId,
        isSignedIn: true,
      };
      return response;
    } catch (ex) {
      return defaultResponse;
    }
  } else {
    return defaultResponse;
  }
};

const dataBind = (data: unknown): UserPayload => {
  const token: Token = JSON.parse(JSON.stringify(data));
  localStorage.setItem('token', token.token);
  localStorage.setItem('refreshToken', token.refreshToken);
  localStorage.setItem('userId', token.userId);
  localStorage.setItem('permission', token.permission);
  const payload: UserPayload = {
    role: token.permission,
    userId: token.userId,
    isSignedIn: true,
  };
  return payload;
};

const useAuthCheck = () => {
  const [data, setData] = useState<UserPayload>(getIntial());
  const Auth = (values: AnyObject) => {
    const PostBody: User = {
      Name: values['Name'],
      Password: values['Password'],
      Permission: 'User',
    };
    axiosInstance
      .post('Auth', PostBody)
      .then((x) => {
        if (updateData) {
          const temp = dataBind(x.data);
          updateData(temp);
        }
      })
      .catch((err) => console.log(err));
  };

  const [template, setTemplate] = useState(<Login Auth={Auth}></Login>);
  useEffect(() => {
    if (data.isSignedIn === true) {
      setTemplate(<LayoutComponent></LayoutComponent>);
    }
  }, [data]);

  const updateData = (newData: UserPayload) => {
    setData(newData);
  };
  useEffect(() => {
    console.log(data);
    if (data.isSignedIn === false) {
      setTemplate(<Login Auth={Auth}></Login>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return { template, data, updateData };
};

export default useAuthCheck;
