import {
  SS2ActorDataSourceBase,
  SS2ActorDataSourceVTraits,
} from '../actorDataSource';
import { ActorTraits, ActorType, BoundedValue, VillainTraits } from '../types';

interface SS2MonsterDataSourceFeatures {
  fear: BoundedValue;
}

export type SS2MonsterDataSourceData = SS2ActorDataSourceBase &
  SS2ActorDataSourceVTraits &
  SS2MonsterDataSourceFeatures;

export interface SS2MonsterDataSource {
  type: ActorType.Monster;
  data: SS2MonsterDataSourceData;
}
