import { SS2ActorDataSourceBase } from '../actorDataSource';
import { ActorType, BoundedValue } from '../types';
import { SS2ActorSheetDataBase } from '../actorDataProperties';

export interface SS2ShipDataSourceFeatures {
  background: string;
  class: string;
  cargo: string;
  origin: string;
  crewstatus: string;
  wealth: number;
}

export type SS2ShipDataSourceData = SS2ActorDataSourceBase &
  SS2ShipDataSourceFeatures;

export interface SS2ShipDataSource {
  type: ActorType.Ship;
  data: SS2ShipDataSourceData;
}
