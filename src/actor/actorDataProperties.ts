// Calculated items available on every sheet.
import { SVNSEA_CONFIG } from '../config';
import { ActorType, BoundedValue, LabeledEntry } from './types';
import { SS2HeroActorSheetData } from './hero/dataSheet';
import { SS2HeroDataProperties } from './hero/dataProperties';
import { SS2ShipDataProperties } from './ship/dataProperties';
import { SS2PlayerCharacterDataProperties } from './player_character/dataProperties';
import { SS2DangerPointsProperties } from './danger_points/dataProperties';
import { SS2BruteDataProperties } from './brute/dataProperties';
import { SS2MonsterDataProperties } from './monster/dataProperties';
import { SS2VillainDataProperties } from './villain/dataProperties';

export type SS2ActorSheetDataOptions = {
  [ActorType.Ship]: {};
  [ActorType.PlayerCharacter]: {};
  [ActorType.Hero]: SS2HeroActorSheetData;
  [ActorType.Brute]: {};
  [ActorType.Monster]: {};
  [ActorType.Villain]: {};
  [ActorType.DangerPoints]: {
    points: number;
  };
};

// export interface SS2ActorSheetData<T extends ActorType>
//   extends ActorSheet.Data {
//   sheet: SS2ActorSheetDataOptions[T];
// }

export interface SS2ActorSheetDataBase {
  owner: boolean;
  limited: boolean;
  options: ActorSheet.Options;
  editable: boolean;
  cssClass: 'editable' | 'locked';
  config: typeof SVNSEA_CONFIG;
  dtypes: string[];
  name: string | null;
  img: string | null;

  isCorrupt: boolean;
  isPlayerCharacter: boolean;
  isHero: boolean;
  isVillain: boolean;
  isMonster: boolean;
  isNotBrute: boolean;
  hasSkills: boolean;
  hasLanguages: boolean;
}

export type SS2ActorDataProperties =
  | SS2BruteDataProperties
  | SS2DangerPointsProperties
  | SS2HeroDataProperties
  | SS2MonsterDataProperties
  | SS2PlayerCharacterDataProperties
  | SS2ShipDataProperties
  | SS2VillainDataProperties;
