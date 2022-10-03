import { ActorSkills, ActorTraits, LabeledBoundedValue } from './types';
import { SVNSEA_CONFIG } from '../config';
import { SS2Actor } from './actorBase';
import { SheetDataOptions, SheetHelpers } from './actorDataSheet';
import { SS2HeroActor } from './hero/SS2HeroActor';
import { SS2PlayerCharacterActor } from './player_character/SS2PlayerCharacterActor';
import { SS2VillainActor } from './villain/SS2VillainActor';
import {
  SS2ActorDataSourceBase,
  SS2ActorDataSourceDetails,
} from './actorDataSource';
import { SS2MonsterActor } from './monster/SS2MonsterActor';
import { SS2ShipActor } from './ship/SS2ShipActor';

export const skillsToSheetData = (skills: ActorSkills): LabeledBoundedValue[] =>
  Object.entries(skills)
    .map(([s, skill]) => ({
      ...skill,
      name: s,
      label: CONFIG.svnsea2e.skills[s],
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

export function traitsToSheetData<T>(traits: T): LabeledBoundedValue[] {
  return Object.entries(traits)
    .map(([s, trait]) => ({
      ...trait,
      name: s,
      label: CONFIG.svnsea2e.traits[s],
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export const prepareSelectedLanguages = (
  languages: string[],
): { [index: string]: string } =>
  languages.reduce(
    (languages, language) => ({
      ...languages,
      [language]: CONFIG.svnsea2e.languages[language],
    }),
    {},
  );

export const getActorSheetDetails = (
  actor: SS2HeroActor | SS2PlayerCharacterActor | SS2VillainActor,
): SS2ActorDataSourceDetails => {
  return {
    // Details: (hero, player, villain)
    nation: actor.system.nation,
    religion: actor.system.religion,
    age: actor.system.age,
    reputation: actor.system.reputation,
    languages: actor.system.languages,
    arcana: actor.system.arcana,
    concept: actor.system.concept,
  };
};

export const getActorSheetBase = (
  actor:
    | SS2HeroActor
    | SS2MonsterActor
    | SS2PlayerCharacterActor
    | SS2ShipActor
    | SS2VillainActor,
): SS2ActorDataSourceBase => {
  return {
    initiative: actor.system.initiative,
    wounds: actor.system.wounds,
    dwounds: actor.system.dwounds,
  };
};
