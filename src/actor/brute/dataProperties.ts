import { SS2BruteDataSourceData } from './dataSource';
import { ActorType } from '../types';

export interface SS2BruteDataPropertiesData extends SS2BruteDataSourceData {}

export interface SS2BruteDataProperties {
  type: ActorType.Brute;
  data: SS2BruteDataPropertiesData;
}
