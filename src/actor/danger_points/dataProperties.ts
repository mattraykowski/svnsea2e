import { SS2DangerPointsDataSourceData } from './dataSource';
import { ActorType } from '../types';

export interface SS2DangerPointsPropertiesData
  extends SS2DangerPointsDataSourceData {}

export interface SS2DangerPointsProperties {
  type: ActorType.DangerPoints;
  data: SS2DangerPointsPropertiesData;
}
