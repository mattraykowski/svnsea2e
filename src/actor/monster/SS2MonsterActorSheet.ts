import { getItems } from '../../helpers.js';
import { ActorType, SvnseaActorSheetData } from '../types';
import SS2ActorSheet from '../sheetBase';
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @ext'../../dice.js't}
 */
export class SS2MonsterActorSheet extends SS2ActorSheet<ActorType.Monster> {
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

  /**
   * Organize and classify Items for Character sheets. Mutate the `sheetData`
   * to get used by the templates.
   *
   * @param data Original sheet data.
   * @param sheetData Mutated sheet data.
   *
   * @return {undefined}
   */
  prepareSheetData(
    data: SvnseaActorSheetData<ActorType.PlayerCharacter>,
    sheetData: SvnseaActorSheetData<ActorType.PlayerCharacter>,
  ): void {
    sheetData.fear = data.document.system.fear;
    sheetData.monsterqualities = getItems(data, 'monsterquality');
  }
}
