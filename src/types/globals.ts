import { History } from 'history';
import { Dispatch, DvaLoading } from './dva';
import { AppState } from '@/models/app';

export interface UmiComponentProps {
  history: History;
  dispatch: Dispatch;
}

export interface GlobalState {
  app: AppState;
  loading: DvaLoading;
}
