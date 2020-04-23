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
      // 系统管理
      {
        path: '/dashboard/systemMgmt',
        routes: [
          {
            path: '/dashboard/systemMgmt/user',
            component: './Dashboard/SystemMgmt/User',
          },
        ],
      },
    ],
  },
];

export default routes;
