import {
  ActorType,
  SvnseaActorDataPropertiesData,
  SvnseaActorSheetData,
} from '../types';
import SS2ActorSheet from '../sheetBase';
import { SS2BruteActor } from './SS2BruteActor';
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @ext'../../dice.js't}
 */
export class SS2BruteActorSheet extends SS2ActorSheet {
  /** @override */
  static get defaultOptions() {
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

  /**
   * Organize and classify Items for Character sheets. Mutate the `sheetData`
   * to get used by the templates.
   *
   * @param data Original sheet data.
   * @param sheetData Mutated sheet data.
   *
   * @return {undefined}
   */
  prepareSheetData(data: any, sheetData: any): void {
    const actorData = this.actor.system;
    sheetData.ability = actorData.ability;
  }
}

export interface SS2BruteActorSheet {
  get actor(): SS2BruteActor;
}
