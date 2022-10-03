import SS2ActorSheet from '../sheetBase';
import { SS2BruteActor } from './SS2BruteActor';
import { traitsToSheetData } from '../actorHelpers';
import { BoundedValue, VillainTraits } from '../types';
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @ext'../../dice.js't}
 */
export class SS2BruteActorSheet extends SS2ActorSheet {
  static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['svnsea2e', 'sheet', 'actor', 'brute'],
      template: 'systems/svnsea2e/templates/actors/brute.html',
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentS: 'ability',
        },
      ],
    });
  }

  override getData(): any {
    const actorData = this.actor.system;
    return {
      ...super.getData(),
      wounds: actorData.wounds,
      ability: actorData.ability,
      // Brutes only have strength, not the trait features.
      traits: traitsToSheetData<BruteTraits>(actorData.traits),
    };
  }
}

interface BruteTraits {
  strength: BoundedValue;
}

export interface SS2BruteActorSheet {
  get actor(): SS2BruteActor;
}
