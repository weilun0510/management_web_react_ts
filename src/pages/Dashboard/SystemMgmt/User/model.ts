import api from '@/services/index';
import mdlExtend from '@/utils/model';
import { DvaModel } from '@/types/dva';

const { getUser } = api;

export interface UserState {
  userData?: { [propName: string]: any };
}

const UserModel: DvaModel<UserState> = {
  namespace: 'user',

  state: {
    userData: {},
  },

  effects: {
    *getUser({ payload }, { call, put }) {
      const res = yield call(getUser, payload);
      if (res.statusCode === 200) {
        yield put({
          type: 'updateState',
          payload: {
            userData: res.data,
          },
        });
      }
    },
  },

  reducers: {},

  subscriptions: {},
};

export default mdlExtend(UserModel);
