import { ActorType, BoundedValue } from '../types';

export interface SS2DangerPointsDataSourceData {
  points: number;
}

export interface SS2DangerPointsDataSource {
  type: ActorType.DangerPoints;
  data: SS2DangerPointsDataSourceData;
}
