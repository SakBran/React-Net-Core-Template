import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../Context/Context';
type props = {
  isSignedIn: boolean | undefined;
  children: ReactNode;
};
const Protected: React.FC<props> = ({ children }) => {
  const { data } = React.useContext(Context);
  if (data?.isSignedIn) {
    return <Navigate to="/Login" replace />;
  }
  //else if(Roles)
  // {
  //   return <Navigate to="/NoPermission" replace />;
  // }
  return children;
};
export default Protected;
