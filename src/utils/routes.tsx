
import { Suspense, lazy } from 'react';

const LoginPage = lazy(() => import('@pages/Login'));
const HomePage = lazy(() => import('@pages/Home'));

type Page = {
  id: string;
  path: string;
  element: JSX.Element;
};

const PagesMap: Page[] = [
   {
     id: 'domain',
     path: '/',
     element: (
       <Suspense fallback="Loading dom...">
         <LoginPage />
       </Suspense>
     ),
   },
   {
    id: 'domain',
    path: '/home',
    element: (
      <Suspense fallback="Loading dom...">
        <HomePage />
      </Suspense>
    ),
  }

];

export default PagesMap;
