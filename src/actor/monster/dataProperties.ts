import { SS2MonsterDataSourceData } from './dataSource';
import { ActorType } from '../types';

export interface SS2MonsterDataPropertiesData
  extends SS2MonsterDataSourceData {}

export interface SS2MonsterDataProperties {
  type: ActorType.Monster;
  data: SS2MonsterDataPropertiesData;
}
