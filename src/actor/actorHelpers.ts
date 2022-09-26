import { ActorSkills, ActorTraits, LabeledBoundedValue } from './types';
import { SVNSEA_CONFIG } from '../config';
import { SS2Actor } from './actorBase';
import { SheetDataOptions, SheetHelpers } from './actorDataSheet';

export const skillsToSheetData = (skills: ActorSkills): LabeledBoundedValue[] =>
  Object.entries(skills)
    .map(([s, skill]) => ({
      ...skill,
      name: s,
      label: CONFIG.svnsea2e.skills[s],
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

export const traitsToSheetData = (traits: ActorTraits): LabeledBoundedValue[] =>
  Object.entries(traits)
    .map(([s, trait]) => ({
      ...trait,
      name: s,
      label: CONFIG.svnsea2e.traits[s],
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

const DEFAULT_SHEET_OPTIONS = {
  isCorrupt: false,
  isPlayerCharacter: false,
  isHero: false,
  isVillain: false,
  isMonster: false,
  isNotBrute: true,
  hasSkills: false,
  hasLanguages: false,
};
export const generateSheetHelpers = (
  options: Partial<SheetHelpers> = {},
): SheetHelpers => {
  return { ...DEFAULT_SHEET_OPTIONS, ...options };
};

export const generateSheetDataOptions = (
  actor: SS2Actor,
  sheetOptions: ActorSheet.Options,
  editable: boolean,
  options: Partial<SheetDataOptions> = {},
): SheetDataOptions => {
  const { isOwner: owner, limited } = actor;
  const sheetDataOptions: SheetDataOptions = {
    owner,
    limited,
    cssClass: owner ? 'editable' : 'locked',
    config: CONFIG.svnsea2e,
    dtypes: ['String', 'Number', 'Boolean'],
    name: actor.name,
    img: actor.img,
    editable,
    options: sheetOptions,
  };

  return { ...sheetDataOptions, ...options };
};
