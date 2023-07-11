import { Routes, Route } from 'react-router-dom';
import NxWelcome from '../nx-welcome';
import CompanyList from '../pages/Company/CompanyList';
import CompanyCreate from '../pages/Company/CompanyCreate';
import Protected from '../components/PrivateRoute/PrivateRoute';
import { useCustomContext } from '../components/Context/Context';
import NoPermission from '../components/NoPermission/NoPermission';

export const RouteComponent = () => {
  const Company = 'Company';
  const { data } = useCustomContext();

  console.log(data);
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
      <Route path={'/' + Company + '/Detail/:id'} element={<CompanyList />} />S
    </Routes>
  );
};
