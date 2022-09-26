import { SS2Actor } from './actorBase';
import { skills, traits, vtraits } from '../config';
import { SS2ActorDataSource } from './actorDataSource';
import { SS2ActorDataProperties } from './actorDataProperties';

export interface LabeledEntry {
  name: string;
  label: string;
}

export interface BoundedValue {
  min: number;
  max: number;
  value: number;
}

export type BoundedTrait = { [key: string]: BoundedValue };

export type LabeledBoundedValue = LabeledEntry & BoundedValue;

export enum ActorType {
  PlayerCharacter = 'playercharacter',
  Hero = 'hero',
  Brute = 'brute',
  Monster = 'monster',
  Villain = 'villain',
  Ship = 'ship',
  DangerPoints = 'dangerpts',
}

const all_traits = { ...traits, ...vtraits };
export type ActorTraits = {
  [P in keyof typeof all_traits]: BoundedValue;
};

export type CharacterTraits = {
  [P in keyof typeof traits]: BoundedValue;
};

export type VillainTraits = {
  [P in keyof typeof vtraits]: BoundedValue;
};

export type ActorSkills = {
  [P in keyof typeof skills]: BoundedValue;
};

export type ArcanaDetails = {
  arcana: string;
  name: string;
  description: string;
};

interface Traits {
  strength: BoundedValue;
  influence: BoundedValue;
}

export interface SheetTrait extends BoundedValue {
  name: string;
  label: string;
}

export type SheetTraits = SheetTrait[];

export interface Skills {
  aim: BoundedValue;
  athletics: BoundedValue;
  brawl: BoundedValue;
  convince: BoundedValue;
  empathy: BoundedValue;
  hide: BoundedValue;
  intimidate: BoundedValue;
  notice: BoundedValue;
  perform: BoundedValue;
  ride: BoundedValue;
  sailing: BoundedValue;
  scholarship: BoundedValue;
  tempt: BoundedValue;
  theft: BoundedValue;
  warfare: BoundedValue;
  weaponry: BoundedValue;
  [index: string]: BoundedValue;
}

// type
//
// interface Arcana {
//
// }

export interface SvnseaActorSheetData<T extends ActorType>
  extends ActorSheet.Data {
  // Because this is how we get to the underlying data.
  document: SS2Actor;

  // Sheet-specific data.
  isCorrupt: boolean;
  isPlayerCharacter: boolean;
  isHero: boolean;
  isVillain: boolean;
  isMonster: boolean;
  isNotBrute: boolean;
  hasSkills: boolean;
  hasLanguages: boolean;
  config: any; // TODO why can't I use SvnseaConfig here?
  dtypes: ['String', 'Number', 'Boolean'];

  // Actor  data
  name: string | null;
  img: string | null;

  // 7th Sea Actor Data
  initiative: number;
  age: number;
  nation: string;
  wealth: number;
  heropts: number;
  corruptionpts: number;
  wounds: BoundedValue;
  dwounds: BoundedValue;
  traits: SheetTraits;
  selectedlangs: string[];
  fear: BoundedValue;
  skills: Skills;
  advantages: string[];
  backgrounds: string[];
  sorcery: string[];
  secretsocieties: string[];
  stories: string[];
  duelstyles: string[];
  artifacts: string[];
  virtues: string[];
  hubriss: string[];
  villainy: BoundedValue;
  schemes: string[];
  monsterqualities: string[];
  ability: string;
  points: number;

  // Ship
  adventures: any[];
  origin: string[];
  // class: string[];
  crewstatus: string[];
  cargo: string;
}

// export interface SvnseaActorDataSourceData {
//   base: { initiative: number; wounds: BoundedValue; dwounds: BoundedValue };
//   details: {
//     nation: string;
//     religion: string;
//     age: number;
//     languages: string[];
//     arcana: object;
//     concept: string;
//   };
// }

// Base Actor Data
export interface SvnseaActorDataPropertiesData {
  villainy: any;
  traits: Traits;
  wounds: BoundedValue;
  dwounds: BoundedValue;
  skills: Skills;
  corruptionpts: number;
  // TODO verify this is correct.
  fear: BoundedValue;
  languages: string[];
  initiative: number;
  age: number;
  nation: string;
  wealth: number;
  heropts: number;
  selectedlangs: string[];
  religion: string;
  reputation: string;
  concept: string;
  arcana: any; // TODO what does this look like again?
  equipment: string; //TODO verify
  redemption: any; // TODO what does this look like?
  ability: any; // TODO what does this look like?
  origin: string[];
}

// type ExtraActorDataProperties = {
//   [ActorType.Ship]: SS2ShipDataDefinition;
//   [ActorType.PlayerCharacter]: {};
//   [ActorType.Hero]: SS2HeroDataDefinition;
//   [ActorType.Brute]: {};
//   [ActorType.Monster]: {};
//   [ActorType.Villain]: {};
//   [ActorType.DangerPoints]: {
//     points: number;
//   };
// };
//
// export interface SvnseaActorDataProperties<T extends ActorType> {
//   type: T;
//   data: ExtraActorDataProperties[T];
// }

//
// export type SvnseaActorProperties =
//   | SvnseaActorDataProperties<ActorType.PlayerCharacter>
//   | SvnseaActorDataProperties<ActorType.Hero>
//   | SvnseaActorDataProperties<ActorType.Brute>
//   | SvnseaActorDataProperties<ActorType.Monster>
//   | SvnseaActorDataProperties<ActorType.Villain>
//   | SvnseaActorDataProperties<ActorType.Ship>
//   | SvnseaActorDataProperties<ActorType.DangerPoints>;

// export type SS2ActorProperties = SS2HeroDataProperties | SS2ShipDataProperties;
export type SS2ActorDataDefinitions = {};
// | SS2HeroDataDefinition
// | SS2ShipDataDefinition;

declare global {
  interface SourceConfig {
    Actor: SS2ActorDataSource;
  }

  interface DataConfig {
    Actor: SS2ActorDataProperties;
  }

  interface DocumentClassConfig {
    Actor: typeof SS2Actor;
  }
}
