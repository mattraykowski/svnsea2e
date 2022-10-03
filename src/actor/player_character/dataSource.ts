import {
  SS2ActorDataSourceBase,
  SS2ActorDataSourceDetails,
  SS2ActorDataSourceFeatures,
} from '../actorDataSource';
import { ActorType } from '../types';

interface SS2PlayerCharacterDataSourceFeatures {
  wealth: number;
  heropts: number;
  vile: number;
  corruptionpts: number;
  redemption: string;
  equipment: string;
}

export type SS2PlayerCharacterDataSourceData = SS2ActorDataSourceBase &
  SS2ActorDataSourceDetails &
  SS2ActorDataSourceFeatures &
  SS2PlayerCharacterDataSourceFeatures;

export interface SS2PlayerCharacterDataSource {
  type: ActorType.PlayerCharacter;
  data: SS2PlayerCharacterDataSourceData;
}
