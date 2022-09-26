import { ActorType } from '../types';
import { SS2ShipDataSourceData } from '../ship/dataSource';
import { SS2PlayerCharacterDataSourceData } from './dataSource';

export interface SS2PlayerCharacterDataPropertiesData
  extends SS2PlayerCharacterDataSourceData {}

export interface SS2PlayerCharacterDataProperties {
  type: ActorType.PlayerCharacter;
  data: SS2PlayerCharacterDataPropertiesData;
}
