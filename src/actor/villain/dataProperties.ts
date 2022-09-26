import { SS2VillainDataSourceData } from './dataSource';
import { ActorType } from '../types';

export interface SS2VillainDataPropertiesData
  extends SS2VillainDataSourceData {}

export interface SS2VillainDataProperties {
  type: ActorType.Villain;
  data: SS2VillainDataPropertiesData;
}
