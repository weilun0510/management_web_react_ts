import modelExtend from 'dva-model-extend';
import CommonModel from '@/common/model';
import { DvaModel } from '../types/dva';

export default <T>(model: DvaModel<T>) => modelExtend(CommonModel, model);
