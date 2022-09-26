import { getItems } from '../../helpers.js';
import { ActorType, SvnseaActorSheetData } from '../types';
import SS2ActorSheet from '../sheetBase';
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @ext'../../dice.js't}
 */
export class SS2VillainActorSheet extends SS2ActorSheet<ActorType.Villain> {
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
    // Assign and return
    sheetData.villainy = data.document.system.villainy;
    sheetData.advantages = getItems(data, 'advantage');
    sheetData.artifacts = getItems(data, 'artifact');
    sheetData.sorcery = getItems(data, 'sorcery');
    sheetData.schemes = getItems(data, 'scheme');
    sheetData.virtues = getItems(data, 'virtue');
    sheetData.hubriss = getItems(data, 'hubris');
    sheetData.monsterqualities = getItems(data, 'monsterquality');
  }
}
