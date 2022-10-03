import { getItems } from '../../helpers.js';
import SS2ActorSheet from '../sheetBase';
import { CharacterTraits, LabeledBoundedValue } from '../types';
import { SS2ActorSheetDataBase } from '../actorDataProperties.js';
import { SS2HeroActor } from './SS2HeroActor';
import {
  getActorSheetBase,
  getActorSheetDetails,
  prepareSelectedLanguages,
  skillsToSheetData,
  traitsToSheetData,
} from '../actorHelpers.js';
import { SS2ActorSheetData } from '../actorDataSheet.js';
import { registerLanguageSelector } from '../sheetHelpers';

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @ext'../../dice.js't}
 */
export class SS2HeroActorSheet extends SS2ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['svnsea2e', 'sheet', 'actor', 'hero'],
      template: 'systems/svnsea2e/templates/actors/hero.html',
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'traits',
        },
      ],
    });
  }

  override getData(): any {
    const actorData = this.actor.system;

    const skills: LabeledBoundedValue[] = skillsToSheetData(actorData.skills);
    const traits = traitsToSheetData<CharacterTraits>(actorData.traits);

    const sheetData: SS2ActorSheetData = {
      ...super.getData(),

      ...getActorSheetBase(this.actor),
      ...getActorSheetDetails(this.actor),

      // Hero sheets have skills and languages.
      hasSkills: true,
      hasLanguages: true,
      selectedlangs: prepareSelectedLanguages(actorData.languages),

      skills,
      traits,

      advantages: getItems(this.actor, 'advantage'),
      backgrounds: getItems(this.actor, 'background'),
      sorcery: getItems(this.actor, 'sorcery'),
      secretsocieties: getItems(this.actor, 'secretsociety'),
      stories: getItems(this.actor, 'story'),
      duelstyles: getItems(this.actor, 'duelstyle'),
      artifacts: getItems(this.actor, 'artifact'),
      virtues: getItems(this.actor, 'virtue'),
      hubriss: getItems(this.actor, 'hubris'),
    };

    return sheetData;
  }

  override activateListeners(html: JQuery) {
    super.activateListeners(html);

    // Handle rollable abilities.
    html.find('.rollable').on('click', this._onHeroRoll.bind(this));
    registerLanguageSelector(this.actor, html);
  }
}

export interface SS2HeroActorSheet {
  get actor(): SS2HeroActor;
}
