import { getItems } from '../../helpers.js';
import { CharacterTraits, LabeledBoundedValue } from '../types.js';
import SS2ActorSheet from '../sheetBase';
import {
  getActorSheetBase,
  getActorSheetDetails,
  prepareSelectedLanguages,
  skillsToSheetData,
  traitsToSheetData,
} from '../actorHelpers';
import { SS2PlayerCharacterActor } from './SS2PlayerCharacterActor';
import { registerLanguageSelector } from '../sheetHelpers';

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @ext'../../dice.js't}
 */
export class SS2PlayerCharacterActorSheet extends SS2ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['svnsea2e', 'sheet', 'actor', 'pc'],
      template: 'systems/svnsea2e/templates/actors/playercharacter.html',
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

    return {
      ...super.getData(),

      ...getActorSheetBase(this.actor),
      ...getActorSheetDetails(this.actor),

      // Player specific things
      wealth: actorData.wealth,
      heropts: actorData.heropts,
      corruptionpts: actorData.corruptionpts,
      redemption: actorData.redemption,
      equipment: actorData.equipment,

      // Player sheets have skills and languages.
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
  }

  override activateListeners(html: JQuery) {
    super.activateListeners(html);

    // Handle rollable abilities.
    html.find('.rollable').on('click', this._onHeroRoll.bind(this));
    registerLanguageSelector(this.actor, html);
  }
}

export interface SS2PlayerCharacterActorSheet {
  get actor(): SS2PlayerCharacterActor;
}
