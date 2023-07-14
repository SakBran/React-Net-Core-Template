import { Routes, Route } from 'react-router-dom';
import NxWelcome from '../nx-welcome';
import CompanyList from '../pages/Company/CompanyList';
import CompanyCreate from '../pages/Company/CompanyCreate';
import Protected from '../components/PrivateRoute/PrivateRoute';
import { useCustomContext } from '../components/Context/Context';
import NoPermission from '../components/NoPermission/NoPermission';
import UserList from '../pages/User/UserList';
import UserPage from '../pages/User/UserPage';

export const RouteComponent = () => {
  const Company = 'Company';
  const User = 'User';
  const { data } = useCustomContext();

  return (
    <Routes>
      <Route path="/" element={<NxWelcome title={'Hey'} />} />
      <Route path="/NoPermission" element={<NoPermission />} />
      <Route path={'/' + Company + '/List'} element={<CompanyList />} />
      <Route
        path={'/' + Company + '/New'}
        element={
          <Protected isSignedIn={data?.isSignedIn}>
            <CompanyCreate />
          </Protected>
        }
      />
      <Route path={'/' + Company + '/Edit/:id'} element={<CompanyList />} />
      <Route path={'/' + Company + '/Delete/:id'} element={<CompanyList />} />
      <Route path={'/' + Company + '/Detail/:id'} element={<CompanyList />} />

      <Route path={'/' + User + '/List'} element={<UserList />} />
      <Route path={'/' + User + '/New'} element={<UserPage />} />
      <Route path={'/' + User + '/Edit/:id'} element={<UserPage />} />
      <Route path={'/' + User + '/Delete/:id'} element={<UserPage />} />
      <Route path={'/' + User + '/Detail/:id'} element={<UserPage />} />
    </Routes>
  );
};
