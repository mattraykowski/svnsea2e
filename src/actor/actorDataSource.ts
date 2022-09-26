import {
  ActorSkills,
  ActorTraits,
  ArcanaDetails,
  BoundedValue,
  CharacterTraits,
  LabeledBoundedValue,
  VillainTraits,
} from './types';
import { SS2PlayerCharacterDataSource } from './player_character/dataSource';
import { SS2HeroDataSource } from './hero/dataSource';
import { SS2BruteDataSource } from './brute/dataSource';
import { SS2MonsterDataSource } from './monster/dataSource';
import { SS2VillainDataSource } from './villain/dataSource';
import { SS2ShipDataSource } from './ship/dataSource';
import { SS2DangerPointsDataSource } from './danger_points/dataSource';

// Parallel's template.json "base"
export interface SS2ActorDataSourceBase {
  initiative: number;
  wounds: BoundedValue;
  dwounds: BoundedValue;
}
// Parallel's template.json "details"
export interface SS2ActorDataSourceDetails {
  nation: string;
  religion: string;
  age: number;
  reputation: string;
  languages: string[];
  arcana: {
    virtue: ArcanaDetails;
    hubris: ArcanaDetails;
  };
  concept: string;
}

// Parallel's template.json "details"
export interface SS2ActorDataSourceFeatures {
  traits: ActorTraits | CharacterTraits;
  skills: ActorSkills;
}

export interface SS2ActorSheetDataFeatures {
  traits: LabeledBoundedValue[];
  skills: LabeledBoundedValue[];
}

// Parallel's template.json "details"
export interface SS2ActorDataSourceVTraits {
  traits: ActorTraits | VillainTraits;
  villainy: number;
}

export type SS2ActorDataSource =
  | SS2PlayerCharacterDataSource
  | SS2HeroDataSource
  | SS2BruteDataSource
  | SS2MonsterDataSource
  | SS2VillainDataSource
  | SS2ShipDataSource
  | SS2DangerPointsDataSource;
