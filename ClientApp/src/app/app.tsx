import { BrowserRouter } from 'react-router-dom';
import LayoutComponent from './components/Layout/LayoutComponent';
import {
  ContextProvider,
  useCustomContext,
} from './components/Context/Context';
import Login from './components/Login/Login';

export function App() {
  const { data } = useCustomContext();

  let template = <Login></Login>;
  if (data?.isSignedIn === true) {
    template = <LayoutComponent></LayoutComponent>;
  }
  return (
    <BrowserRouter>
      <ContextProvider>{template}</ContextProvider>
    </BrowserRouter>
  );
}

export default App;
