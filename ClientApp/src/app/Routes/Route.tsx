import { Routes, Route } from 'react-router-dom';
import NxWelcome from '../nx-welcome';
import Protected from '../components/PrivateRoute/PrivateRoute';
import { useCustomContext } from '../components/Context/Context';
import UserList from '../pages/User/UserList';
import UserPage from '../pages/User/UserPage';

export const RouteComponent = () => {
  const User = 'User';
  const { data } = useCustomContext();

  return (
    <Routes>
      <Route path="/" element={<NxWelcome title={'Hey'} />} />

      {/* <Route
        path={'/' + Company + '/New'}
        element={
          <Protected isSignedIn={data?.isSignedIn}>
            <CompanyCreate />
          </Protected>
        }
      /> */}

      <Route
        path={'/' + User + '/List'}
        element={
          <Protected isSignedIn={data?.isSignedIn}>
            <UserList />
          </Protected>
        }
      />
      <Route path={'/' + User + '/New'} element={<UserPage />} />
      <Route path={'/' + User + '/Edit/:id'} element={<UserPage />} />
      <Route path={'/' + User + '/Delete/:id'} element={<UserPage />} />
      <Route path={'/' + User + '/Detail/:id'} element={<UserPage />} />
    </Routes>
  );
};
