import SS2ActorSheet from '../sheetBase';
import { SS2VillainActor } from './SS2VillainActor';
import { getItems } from '../../helpers';
import {
  registerLanguageSelector,
  registerVillainRollables,
} from '../sheetHelpers';
import {
  getActorSheetBase,
  getActorSheetDetails,
  prepareSelectedLanguages,
  traitsToSheetData,
} from '../actorHelpers';
import { CharacterTraits, VillainTraits } from '../types';
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @ext'../../dice.js't}
 */
export class SS2VillainActorSheet extends SS2ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['svnsea2e', 'sheet', 'actor', 'villain'],
      template: 'systems/svnsea2e/templates/actors/villain.html',
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
    const traits = traitsToSheetData<VillainTraits>(actorData.traits);
    return {
      ...super.getData(),

      ...getActorSheetBase(this.actor),
      ...getActorSheetDetails(this.actor),

      hasLanguages: true,
      selectedlangs: prepareSelectedLanguages(actorData.languages),

      traits,
      villainy: actorData.villainy,
      advantages: getItems(this.actor, 'advantage'),
      artifacts: getItems(this.actor, 'artifact'),
      sorcery: getItems(this.actor, 'sorcery'),
      schemes: getItems(this.actor, 'scheme'),
      virtues: getItems(this.actor, 'virtue'),
      hubriss: getItems(this.actor, 'hubris'),
      monsterqualities: getItems(this.actor, 'monsterquality'),
    };
  }

  override activateListeners(html: JQuery) {
    super.activateListeners(html);

    // Handle rollable abilities.
    // html.find('.rollable').on('click', this._onVillainRoll.bind(this));
    registerVillainRollables(this.actor, html);
    registerLanguageSelector(this.actor, html);
  }
}

export interface SS2VillainActorSheet {
  get actor(): SS2VillainActor;
}
