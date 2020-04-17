import api from '@/services/index';
import config, { RouteList } from '@/utils/config';
import mdlExtend from '@/utils/model';
import { DvaModel } from '../types/dva';

const { queryRouteList } = api;

export interface AppState {
  routeList: RouteList[];
}

const AppModel: DvaModel<AppState> = {
  namespace: 'app',

  state: {
    routeList: config.routeList,
  },

  effects: {
    *query({ payload }, { call, put }) {
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
  },

  reducers: {
    setUserInfo(state: AppState, { payload }) {
      return { ...state, userInfo: payload };
    },
  },

  subscriptions: {
    setup({ dispatch }): void {
      // dispatch({ type: 'query' });
    },
  },
};

export default mdlExtend(AppModel);
