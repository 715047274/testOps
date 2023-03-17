import type { FC } from 'react';
import type { RouteObject } from 'react-router';

import { lazy } from 'react';
import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';

import AboutPage from '../../View/pages/about';
import HomePage from '../../View/pages/home';
import LoginPage from '../../View/pages/login';
import WrapperRouteComponent from './config';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '../../View/pages/notfound'));


const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="" />,
    children: [
      {
        path: '',
        element: <Navigate to="HomePage" />,
      },
      {
        path: 'homePage',
        element: <WrapperRouteComponent element={<HomePage />} titleId="title.homePage" />,
      },
      ]
  }
]


const RenderRouter: FC = () => {
    // @ts-ignore
  const element = useRoutes(routeList);
  
    return element;
  };
  
  export default RenderRouter;