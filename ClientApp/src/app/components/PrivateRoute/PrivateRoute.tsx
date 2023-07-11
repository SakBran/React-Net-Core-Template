import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
type props = {
  isSignedIn: boolean | undefined;
  children: ReactNode;
};
const Protected: React.FC<props> = ({ isSignedIn, children }) => {
  if (!isSignedIn) {
    return <Navigate to="/Login" replace />;
  }
  //else if(Roles)
  // {
  //   return <Navigate to="/NoPermission" replace />;
  // }
  return children;
};
export default Protected;
