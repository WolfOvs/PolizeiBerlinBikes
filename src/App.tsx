
import './App.css';

import { InitResponse, getInitInfo } from '@services/InitService';
import PagesMap from '@utils/routes';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from './MainLayout';

export interface MenuLink {
  id?: string;
  to?: string;
  label?: string;
  icon?: string;
}

const Home: MenuLink[] = [
  { id: 'home', label: 'Home', icon: 'pi pi-home', to: '/' },
];

const App = () => {
  const [userInfo, setUserInfo] = useState<InitResponse | null>(null);
  const appMenu: MenuLink[] = Home;

  return (
    <MainLayout
      appMenu={appMenu}
      pages={PagesMap}
      userData={{ name: userInfo?.preferred_username ?? '' }}
    />
  );
};

export default App;
