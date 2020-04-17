import { IRoute } from 'umi-types';

const routes: IRoute[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: './Login',
  },
  {
    path: '/dashboard',
    component: '../layouts',
    routes: [
      { path: '/dashboard', redirect: '/dashboard/home' },
      { path: '/dashboard/home', component: './Dashboard/Home' },
    ],
  },
];

export default routes;
