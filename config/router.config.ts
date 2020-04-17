import { IRoute } from 'umi-types';

const routes: IRoute[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: '../layouts',
    routes: [{ path: '/login', component: './Login' }],
  },
];

export default routes;
