import {
  SS2ActorDataSourceBase,
  SS2ActorDataSourceDetails,
  SS2ActorDataSourceFeatures,
  SS2ActorSheetDataFeatures,
} from '../actorDataSource';
import { ActorType, LabeledBoundedValue } from '../types';
import { SS2ActorSheetDataBase } from '../actorDataProperties';

export type SS2HeroDataSourceData = SS2ActorDataSourceBase &
  SS2ActorDataSourceDetails &
  SS2ActorDataSourceFeatures;

// Source Data, translating the template.json types
export interface SS2HeroDataSource {
  type: ActorType.Hero;
  data: SS2HeroDataSourceData;
}
