import { History } from 'history';
import { Dispatch, DvaLoading } from './dva';
import { AppState } from '@/models/app';
import { LoginState } from '../pages/Login/model';

export interface UmiComponentProps {
  history: History;
  dispatch: Dispatch;
}

export interface GlobalState {
  app: AppState;
  login: LoginState;
  loading: DvaLoading;
}
