import api from '@/services/index';
import mdlExtend from '@/utils/model';
import { DvaModel } from '@/types/dva';
import { router } from '@/utils';
import { message } from 'antd';

const { login } = api;

export interface LoginState {}

const LoginModel: DvaModel<LoginState> = {
  namespace: 'login',

  state: {},

  effects: {
    *login({ payload }, { call }) {
      const res = yield call(login, payload);
      console.log('res: ', res);
      if (res.statusCode === 200) {
        router.push('/dashboard');
        // localStorage.setItem('userInfo', 'yidenglu');
      } else {
        message.error(res.message);
      }
    },
  },

  reducers: {},

  subscriptions: {},
};

export default mdlExtend(LoginModel);
