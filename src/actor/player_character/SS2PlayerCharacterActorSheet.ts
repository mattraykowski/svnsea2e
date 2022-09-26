import { getItems, skillsToSheetData } from '../../helpers.js';
import { ActorType, SvnseaActorSheetData } from '../types.js';
import SS2ActorSheet from '../sheetBase';

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @ext'../../dice.js't}
 */
export class SS2PlayerCharacterActorSheet extends SS2ActorSheet<ActorType.PlayerCharacter> {
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
    sheetData.skills = skillsToSheetData(data.document.system, CONFIG);
    sheetData.advantages = getItems(data, 'advantage');
    sheetData.backgrounds = getItems(data, 'background');
    sheetData.sorcery = getItems(data, 'sorcery');
    sheetData.secretsocieties = getItems(data, 'secretsociety');
    sheetData.stories = getItems(data, 'story');
    sheetData.duelstyles = getItems(data, 'duelstyle');
    sheetData.artifacts = getItems(data, 'artifact');
    sheetData.virtues = getItems(data, 'virtue');
    sheetData.hubriss = getItems(data, 'hubris');
  }

  // _prepareCharacterItems(data, sheetData) {
  //   // Assign and return
  //   sheetData.skills = skillsToSheetData(data.document.system, CONFIG);
  //   sheetData.advantages = getItems(data, 'advantage');
  //   sheetData.backgrounds = getItems(data, 'background');
  //   sheetData.sorcery = getItems(data, 'sorcery');
  //   sheetData.secretsocieties = getItems(data, 'secretsociety');
  //   sheetData.stories = getItems(data, 'story');
  //   sheetData.duelstyles = getItems(data, 'duelstyle');
  //   sheetData.artifacts = getItems(data, 'artifact');
  //   sheetData.virtues = getItems(data, 'virtue');
  //   sheetData.hubriss = getItems(data, 'hubris');
  // }
}
