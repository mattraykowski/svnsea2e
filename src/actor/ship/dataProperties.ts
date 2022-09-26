import { ActorType } from '../types';
import { SS2ShipDataSourceData } from './dataSource';

export interface SS2ShipDataPropertiesData extends SS2ShipDataSourceData {}

export interface SS2ShipDataProperties {
  type: ActorType.Ship;
  data: SS2ShipDataPropertiesData;
}
