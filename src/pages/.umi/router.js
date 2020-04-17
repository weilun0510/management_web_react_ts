import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    redirect: '/login',
    exact: true,
    _title: '智能电源控制项目',
    _title_default: '智能电源控制项目',
  },
  {
    path: '/login',
    component: __IS_BROWSER
      ? _dvaDynamic({
          app: require('@tmp/dva').getApp(),
          models: () => [
            import(/* webpackChunkName: 'p__Login__model.ts' */ '/home/chenweilun/Documents/project/ldpiot_server_web/src/pages/Login/model.ts').then(
              m => {
                return { namespace: 'model', ...m.default };
              },
            ),
          ],
          component: () =>
            import(/* webpackChunkName: "p__Login" */ '../Login'),
        })
      : require('../Login').default,
    exact: true,
    _title: '智能电源控制项目',
    _title_default: '智能电源控制项目',
  },
  {
    path: '/dashboard',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts" */ '../../layouts'),
        })
      : require('../../layouts').default,
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/home',
        exact: true,
        _title: '智能电源控制项目',
        _title_default: '智能电源控制项目',
      },
      {
        path: '/dashboard/home',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__Dashboard__Home" */ '../Dashboard/Home'),
            })
          : require('../Dashboard/Home').default,
        exact: true,
        _title: '智能电源控制项目',
        _title_default: '智能电源控制项目',
      },
      {
        component: () =>
          React.createElement(
            require('/home/chenweilun/Documents/project/ldpiot_server_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: '智能电源控制项目',
        _title_default: '智能电源控制项目',
      },
    ],
    _title: '智能电源控制项目',
    _title_default: '智能电源控制项目',
  },
  {
    component: () =>
      React.createElement(
        require('/home/chenweilun/Documents/project/ldpiot_server_web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
    _title: '智能电源控制项目',
    _title_default: '智能电源控制项目',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
