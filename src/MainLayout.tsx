import AppFooter from '@components/ui/AppFooter';
import AppTopbar from '@components/ui/AppTopbar';
import Home from '@pages/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { MenuLink } from './App';
import Login from '@pages/Login';

interface Props {
  appMenu: MenuLink[];
  pages: {
    id: string;
    path: string;
    element: JSX.Element;
  }[];
  userData?: { name: string };
}

const MainLayout = ({ appMenu, pages, userData }: Props) => {
  const navigate = useNavigate();
  if (userData === undefined) {
    navigate('/');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full flex-grow px-4">
        <div className="mx-auto w-full max-w-screen-xl pt-28">
          <Routes>
            <Route path="/" element={<Login />} />
            {pages.map((page) => (
              <Route key={page.id} path={page.path} element={page.element} />
            ))}
          </Routes>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default MainLayout;
