import {
  SS2ActorDataSourceBase,
  SS2ActorDataSourceDetails,
  SS2ActorDataSourceVTraits,
} from '../actorDataSource';
import { ActorType } from '../types';

interface SS2VillainDataSourceFeatures {
  servants: string;
  redemption: string;
}

export type SS2VillainDataSourceData = SS2ActorDataSourceBase &
  SS2ActorDataSourceDetails &
  SS2ActorDataSourceVTraits &
  SS2VillainDataSourceFeatures;

export interface SS2VillainDataSource {
  type: ActorType.Villain;
  data: SS2VillainDataSourceData;
}
