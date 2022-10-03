import { getItems } from '../../helpers.js';
import { ActorType, SvnseaActorSheetData, VillainTraits } from '../types';
import SS2ActorSheet from '../sheetBase';
import { SS2MonsterActor } from './SS2MonsterActor';
import { registerVillainRollables } from '../sheetHelpers';
import {
  getActorSheetBase,
  getActorSheetDetails,
  traitsToSheetData,
} from '../actorHelpers';
import { SS2MonsterSheetData } from './dataSheet';
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @ext'../../dice.js't}
 */
export class SS2MonsterActorSheet extends SS2ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['svnsea2e', 'sheet', 'actor', 'monster'],
      template: 'systems/svnsea2e/templates/actors/monster.html',
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'features',
        },
      ],
    });
  }

  override getData(): any {
    const actorData = this.actor.system;
    const traits = traitsToSheetData<VillainTraits>(actorData.traits);

    const sheetData: SS2MonsterSheetData = {
      ...super.getData(),
      ...getActorSheetBase(this.actor),
      // TODO: Sheet doesn't seem to match the template?
      // So the sheet has fates (virtues/hubriss) and concept.
      // ...getActorSheetDetails(this.actor),
      traits,
      fear: actorData.fear,
      monsterqualities: getItems(this.actor, 'monsterquality'),
    };
    return sheetData;
  }

  override activateListeners(html: JQuery) {
    super.activateListeners(html);

    // Handle rollable abilities.
    registerVillainRollables(this.actor, html);
  }
}

export interface SS2MonsterActorSheet {
  get actor(): SS2MonsterActor;
}
