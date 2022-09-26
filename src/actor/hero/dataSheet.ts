// Sheet Data, used for the object sent to templates.
import { LabeledBoundedValue } from '../types';
import {
  SS2ActorDataSourceBase,
  SS2ActorDataSourceDetails,
  SS2ActorSheetDataFeatures,
} from '../actorDataSource';
import { SS2ActorSheetDataBase } from '../actorDataProperties';

export interface SS2HeroSheetData {
  // These may be duplicated?
  skills: LabeledBoundedValue[];
  traits: LabeledBoundedValue[];
  advantages: []; // TODO: Need to be typed once Items are converted
  backgrounds: []; // TODO: Need to be typed once Items are converted
  sorcery: []; // TODO: Need to be typed once Items are converted
  secretsocieties: []; // TODO: Need to be typed once Items are converted
  stories: []; // TODO: Need to be typed once Items are converted
  duelstyles: []; // TODO: Need to be typed once Items are converted
  artifacts: []; // TODO: Need to be typed once Items are converted
  virtues: []; // TODO: Need to be typed once Items are converted
  hubriss: []; // TODO: Need to be typed once Items are converted
}

export type SS2HeroActorSheetData = SS2ActorDataSourceBase &
  SS2ActorDataSourceDetails &
  SS2ActorSheetDataFeatures &
  SS2ActorSheetDataBase &
  SS2HeroSheetData;
