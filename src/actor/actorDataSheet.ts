import { SS2HeroActorSheetData } from './hero/dataSheet';
import { SVNSEA_CONFIG } from '../config';

export interface SheetDataOptions {
  owner: boolean;
  limited: boolean;
  options: ActorSheet.Options;
  editable: boolean;
  cssClass: 'editable' | 'locked';
  config: typeof SVNSEA_CONFIG;
  dtypes: string[];
  name: string | null;
  img: string | null;
}

export interface SheetHelpers {
  isCorrupt: boolean;
  isPlayerCharacter: boolean;
  isHero: boolean;
  isVillain: boolean;
  isMonster: boolean;
  isNotBrute: boolean;
  hasSkills: boolean;
  hasLanguages: boolean;
}

export type SS2ActorSheetData = SheetDataOptions & SheetHelpers; //SS2HeroActorSheetData;
