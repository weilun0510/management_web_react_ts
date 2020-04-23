import store from 'store';
import api from '@/services/index';
import config, { RouteList } from '@/utils/config';
import mdlExtend from '@/utils/model';
import { pathMatchRegexp } from '@/utils';
import { DvaModel } from '../types/dva';

const { queryRouteList, logout } = api;

export interface AppState {
  routeList: RouteList[];
  collapsed: boolean;
}

const AppModel: DvaModel<AppState> = {
  namespace: 'app',

  state: {
    routeList: config.routeList,
    collapsed: store.get('collapsed') || false,
  },

  effects: {
    *setup(action, { call, all, put }) {
      if (pathMatchRegexp(['#/', '#/(.*)/login', '#/login'], window.location.hash)) {
        return;
      }
      // yield all([put({ type: 'query' })]);
      yield put({ type: 'query' });
    },
    *query({ payload }, { call, put }) {
      console.log('query: ');
      const res = yield call(queryRouteList, payload);
      if (res.data) {
        yield put({
          type: 'updateState',
          payload: {
            routeList: res.data,
          },
        });
      }
    },
    *logout({ payload }, { call }) {
      const res = yield call(logout, payload);
      return res;
    },
  },

  reducers: {
    setUserInfo(state: AppState, { payload }) {
      return { ...state, userInfo: payload };
    },
    handleCollapseChange(state: AppState, { payload }) {
      store.set('collapsed', payload);
      return { ...state, collapsed: payload };
    },
  },

  subscriptions: {
    setup({ dispatch }): void {
      console.log('setup');
      dispatch({ type: 'setup' });
    },
  },
};

export default mdlExtend(AppModel);
