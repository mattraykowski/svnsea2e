import {
  SS2ActorDataSourceBase,
  SS2ActorDataSourceVTraits,
} from '../actorDataSource';
import { ActorType, ArcanaDetails, BoundedValue } from '../types';

export interface SS2MonsterDataSourceFeatures {
  fear: BoundedValue;

  // TODO: These are on the sheet but not in template.json
  arcana: {
    virtue: ArcanaDetails;
    hubris: ArcanaDetails;
  };
  concept: string;
  religion: string;
  reputation: string;
}

export type SS2MonsterDataSourceData = SS2ActorDataSourceBase &
  SS2ActorDataSourceVTraits &
  SS2MonsterDataSourceFeatures;

export interface SS2MonsterDataSource {
  type: ActorType.Monster;
  data: SS2MonsterDataSourceData;
}
