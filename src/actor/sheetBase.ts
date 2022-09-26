import LanguageSelector from '../apps/language-selector.js';
import { updateInitiative } from '../combat.js';
import { roll } from '../roll/roll.js';
import { isValidGlamorIsles } from '../helpers.js';
import { SheetTrait, SheetTraits } from './types';
import { SS2Actor } from '../actor';
import { AlphaMap, StringMap } from '../global';
import { EventDataSet } from '../config';
import {
  SS2ActorSheetData,
  SS2ActorSheetDataBase,
} from './actorDataProperties';
import { generateSheetDataOptions, generateSheetHelpers } from './actorHelpers';

/**
 * Extend the basic ActorSheet class to do all the 7th Sea things!
 * This sheet is an Abstract layer which is not used.
 * @extends {ActorSheet}
 */
export default class SS2ActorSheet extends ActorSheet<
  ActorSheet.Options,
  SS2ActorSheetData
> {
  static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 850,
      height: 750,
    });
  }

  getSheetDataBase(): SS2ActorSheetDataBase {
    const { isOwner: owner, limited } = this.actor;
    const sheetBase: SS2ActorSheetDataBase = {
      ...generateSheetDataOptions(this.actor, this.options, this.isEditable),
      ...generateSheetHelpers({ isCorrupt: true }),
    };
    return sheetBase;
  }

  /* -------------------------------------------- */

  // /** @override */
  // override getData(): SS2ActorSheetData<T> {
  //   const baseData = super.getData() as ActorSheet.Data;
  //   // console.log(this.actor.items);
  //   const actorData = this.actor.system;
  //   const { isOwner: owner, limited } = this.actor;
  //   //
  //   // console.log('baseData', baseData.data);
  //   //
  //   // const actorSheetData: any = {
  //   //   ...baseData,
  //   // };
  //
  //   const sheetData: SS2ActorSheetData<T> = {
  //     ...baseData,
  //     sheet: this.buildSheetData(),
  //
  //     // cssClass: owner ? 'editable' : 'locked',
  //     // options: this.options,
  //     // editable: this.isEditable,
  //     // actor: baseData.actor,
  //     // items: baseData.items,
  //     sheet: {
  //       owner,
  //       limited,
  //
  //       config: CONFIG.svnsea2e,
  //       dtypes: ['String', 'Number', 'Boolean'],
  //       name: this.actor.name,
  //       img: this.actor.img,
  //
  //       // initiative: actorData.initiative,
  //
  //       // These will be overriden by underlying implementations.
  //       isCorrupt: false,
  //       isPlayerCharacter: false,
  //       isHero: false,
  //       isVillain: false,
  //       isMonster: false,
  //       isNotBrute: true,
  //       hasSkills: false,
  //       hasLanguages: false,
  //       traits: this._prepareTraits(this.actor),
  //     },
  //   };
  //
  //   // console.log('sheet data traits', sheetData.sheet.traits);
  //   return sheetData;
  //
  //   // const sheetData = {
  //   //   ...sheetDataOrigin,
  //
  //   // isCorrupt: actorData.corruptionpts > 0,
  //   // isPlayerCharacter: this.actor.type === ActorType.PlayerCharacter,
  //   // isHero: actor.type === ActorType.Hero,
  //   // isVillain: actor.type === ActorType.Villain,
  //   // isMonster: actor.type === ActorType.Monster,
  //   // isNotBrute: actor.type !== ActorType.Brute,
  //   // hasSkills: typeof actorData.skills !== 'undefined',
  //   // hasLanguages: typeof actorData.languages !== 'undefined',
  //
  //   // Core Actor data:
  //
  //   // age: actorData.age,
  //   // nation: actorData.nation,
  //   // wealth: actorData.wealth,
  //   // heropts: actorData.heropts,
  //   // corruptionpts: actorData.corruptionpts,
  //   // wounds: actorData.wounds,
  //   // dwounds: actorData.dwounds,
  //   // traits: this._prepareTraits(actor),
  //   // selectedlangs: this._prepareLanguages(actor),
  //   //
  //   // // Concept tab.
  //   // religion: actorData.religion,
  //   // reputation: actorData.reputation,
  //   // concept: actorData.concept,
  //   // arcana: actorData.arcana,
  //   //
  //   // // Inventory Tab
  //   // equipment: actorData.equipment,
  //   //
  //   // // Fate Tab
  //   // redemption: actorData.redemption,
  //   // };
  //
  //   // this.prepareSheetData(data, sheetData);
  //   //
  //   // // Prepare items.
  //   // if (actor.type === 'playercharacter') {
  //   //   // this._prepareCharacterItems(data, sheetData);
  //   //   // } else if (actor.type === 'hero') {
  //   //   //   this._prepareHeroItems(data, sheetData);
  //   //   // } else if (actor.type === 'villain') {
  //   //   //   this._prepareVillainItems(data, sheetData);
  //   //   // } else if (actor.type === 'monster') {
  //   //   //   this._prepareMonsterItems(data, sheetData);
  //   //   // } else if (actor.type === 'ship') {
  //   //   //   this._prepareShipItems(data, sheetData);
  //   //   //   this._processFlags(actorData, actor.flags, sheetData);
  //   //   // } else if (actor.type === 'dangerpts') {
  //   //   //   sheetData.points = actorData.points;
  //   // } else if (actor.type === 'brute') {
  //   //   sheetData.ability = actorData.ability;
  //   // }
  //   return sheetData;
  // }

  /* -------------------------------------------- */

  // _prepareButtonTitles(data) {
  //   for (const item of Object.values(data)) {
  //     item.editlabel = game.i18n.format('SVNSEA2E.EditLabel', {
  //       label: data.name,
  //     });
  //     item.deletelabel = game.i18n.format('SVNSEA2E.DeleteLabel', {
  //       label: data.name,
  //     });
  //   }
  // }

  /* -------------------------------------------- */

  /**
   * Returns a sheet-friendly list of traits with the localized label.
   *
   * @param actor
   * @returns {(*&{name: *, label: *})[]|*[]}
   * @private
   */
  _prepareTraits(actor: SS2Actor): SheetTraits {
    return !['ship', 'dangerpts'].includes(actor.type)
      ? Object.entries(actor.system.traits).map(([t, trait]) => {
          const sheetTrait: SheetTrait = {
            ...trait,
            name: t,
            label: CONFIG.svnsea2e.traits[t],
          };

          console.log(CONFIG.svnsea2e.traits);
          return sheetTrait;
        })
      : [];
  }

  /* -------------------------------------------- */
  /** @override */
  activateListeners(html: JQuery) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // language Selector
    html
      .find('.language-selector')
      .on('click', this._onLanguageSelector.bind(this));

    html
      .find('.add-1-initiative')
      .on('click', this._onAddInitiative.bind(this));
    html
      .find('.minus-1-initiative')
      .on('click', this._onMinusInitiative.bind(this));

    //Create Inventory Item
    html.find('.item-create').on('click', this._onItemCreate.bind(this));

    // Update Inventory Item
    html.find('.item-edit').on('click', this._onItemEdit.bind(this));

    // Delete Inventory Item
    html.find('.item-delete').on('click', this._onItemDelete.bind(this));

    //Expand item summary
    html
      .find('.item h4.item-name')
      .on('click', (event) => this._onItemSummary(event));

    // Rollable abilities.
    if (this.actor.type === 'playercharacter' || this.actor.type === 'hero') {
      html.find('.rollable').on('click', this._onHeroRoll.bind(this));
    } else if (this.actor.type === 'villain' || this.actor.type === 'monster') {
      html.find('.rollable').on('click', this._onVillainRoll.bind(this));
    }

    html
      .find('.fillable.fa-circle')
      .on('click', (event) => this._processCircle(event));
    if (this.actor.type === 'brute') {
      html
        .find('.fillable.fa-heart')
        .on('click', (event) => this._processBruteWounds(event));
    } else {
      html
        .find('.fillable.fa-heart')
        .on('click', (event) => this._processWounds(event));
    }

    // Drag events for macros.
    if (this.actor.isOwner) {
      // TODO it appears this handler has been missing a long time?
      // const handler = (ev: DragEvent) => this._onDragItemStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains('inventory-header')) return;
        li.setAttribute('draggable', 'true');
        // TODO it appears this handler has been missing a long time?
        // li.addEventListener('dragstart', handler, false);
      });
    }
  }

  _onAddInitiative(event: JQuery.ClickEvent) {
    event.preventDefault();
    const initiative = (this.actor.system.initiative || 0) + 1;
    console.log('new initiative', initiative);
    updateInitiative(this.actor.id, initiative);
  }

  _onMinusInitiative(event: JQuery.ClickEvent) {
    event.preventDefault();
    const initiative = (this.actor.system.initiative || 0) - 1;
    updateInitiative(this.actor.id, initiative);
  }

  /* -------------------------------------------- */

  /**
   * Prepare the Languages that the Actor has selected for use with the LanguageSelector application
   * @param {Object} actor       The actor
   * @private
   */
  _prepareLanguages(actor: SS2Actor) {
    // Languages only apply to PCs, heroes, or villains.
    if (!['playercharacter', 'hero', 'villain'].includes(actor.type))
      return undefined;

    return actor.system.languages.reduce(
      (languages, language) => ({
        ...languages,
        [language]: CONFIG.svnsea2e.languages[language],
      }),
      {},
    );
  }

  /* -------------------------------------------- */

  /**
   * Process the effects of clicking on a circle
   * @param {Object} event      event sent
   * @private
   */
  async _processCircle(event: JQuery.ClickEvent) {
    const actor = this.document;
    const actorData = actor.system;
    const dataSet: EventDataSet = event.target.dataset;

    let updateObj: AlphaMap = {};
    let dataSetValue = parseInt(dataSet.value);

    let tval = 0;
    if (dataSetValue === 1) {
      switch (dataSet.type) {
        case 'skill':
          tval = actorData.skills[dataSet.key].value;
          break;
        case 'trait':
          if (dataSet.key === 'influence') {
            tval = actorData.traits.influence.value;
          } else if (dataSet.key === 'strength') {
            tval = actorData.traits.strength.value;
          } else {
            dataSetValue = 2;
          }
          break;
        case 'corrupt':
          //  dataSet.key for 'corrupt' should always be 'corruptionpts'.
          if (dataSet.key !== 'corruptionpts') {
            console.log(
              'Invalid corruption key when processing circles: ' + dataSet.key,
            );
            return;
          }
          tval = actorData.corruptionpts;
          break;
        case 'fear':
          //  dataSet.key for 'corrupt' should always be 'corruptionpts'.
          if (dataSet.key !== 'fear') {
            console.log(
              'Invalid fear key when processing circles: ' + dataSet.key,
            );
            return;
          }
          tval = actorData.fear.value;
          break;
      }

      if (tval === 1) {
        dataSetValue = 0;
      }
    }

    updateObj[dataSet.name] = dataSetValue;
    return actor.update(updateObj);
  }

  /* -------------------------------------------- */

  /**
   * When a wound heart is click properly set the values
   * @param {Object} event      event sent
   * @private
   */
  async _processBruteWounds(event: JQuery.ClickEvent) {
    const actor = this.document;
    const actorData = actor.system;
    let updateObj: AlphaMap = {};
    updateObj['data.wounds.value'] = event.target.dataset.value;
    if (actorData.wounds.value == 1 && event.target.dataset.value == 1)
      updateObj['data.wounds.value'] = 0;

    await actor.update(updateObj);
  }

  /* -------------------------------------------- */

  /**
   * When a wound heart is click properly set the values
   * @param {Object} event      event sent
   * @private
   */
  async _processWounds(event: JQuery.ClickEvent) {
    const actor = this.document;
    const actorData = actor.system;
    const edata = event.target.dataset;
    let updateObj: AlphaMap = {};
    let wounds = actorData.wounds.value;
    let dwounds = actorData.dwounds.value;

    const eValue = +edata.value;

    if (edata.type === 'wounds') {
      wounds = eValue;
      dwounds = actorData.dwounds.value;
      const dwestimate = Math.trunc(wounds / 5);

      if (dwestimate > actorData.dwounds.value) dwounds = dwestimate;

      if (edata.value == 1 && actorData.wounds.value == 1) wounds = 0;
    } else {
      // If the event dramatic wound is larger than the current dramatic wound
      // increase the dramatic wound and the regular wounds
      if (eValue > actorData.dwounds.value) dwounds = eValue;
      else if (eValue == actorData.dwounds.value)
        dwounds = actorData.dwounds.value - 1;
      else dwounds = eValue;

      if (actorData.wounds.value > eValue * 5) wounds = eValue * 5;
    }

    updateObj['system.wounds.value'] = wounds;
    updateObj['system.dwounds.value'] = dwounds;

    await actor.update(updateObj);
  }

  /* -------------------------------------------- */

  /**
   * Handle spawning the languageSelector application which allows a checkbox of multiple language options
   * @param {Event} event   The click event which originated the selection
   * @private
   */
  _onLanguageSelector(event: JQuery.ClickEvent) {
    event.preventDefault();
    const a = event.currentTarget;
    const options = {
      title: game.i18n.localize('SVNSEA2E.Languages'),
      choices: CONFIG.svnsea2e[a.dataset.options],
    };
    new LanguageSelector(this.actor, options).render(true);
  }

  /* -------------------------------------------- */

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset.
   * @param {Event} event          The originating click event.
   * @returns {Promise<Item5e[]>}  The newly created item.
   * @private
   */
  _onItemCreate(event: JQuery.ClickEvent) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Prepare the item object.
    const itemData = {
      name: game.i18n.localize(`SVNSEA2E.New${type}`),
      img: `systems/svnsea2e/icons/${type}.jpg`,
      type: type,
      data: foundry.utils.deepClone(header.dataset),
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data.type;

    // Finally, create the item!
    return this.actor.createEmbeddedDocuments('Item', [itemData]);
  }

  /* -------------------------------------------- */

  /**
   * Handle editing an existing Owned Item for the Actor.
   * @param {Event} event    The originating click event.
   * @private
   */
  _onItemEdit(event: JQuery.ClickEvent): void {
    event.preventDefault();
    const li = event.currentTarget.closest('.item');
    const item = this.actor.items.get(li.dataset.itemId);
    if (item) {
      item.sheet?.render(true);
    }
    return;
  }

  /* -------------------------------------------- */

  /**
   * Handle deleting a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemDelete(event: JQuery.ClickEvent) {
    event.preventDefault();
    const li = event.currentTarget.closest('.item');
    const item = this.actor.items.get(li.dataset.itemId);

    if (item) {
      if (item.data.type === 'background')
        await this._processBackgroundDelete(item.data.data);

      return item.delete();
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle rolling of an item from the Actor sheet, obtaining the Item instance and dispatching to it's roll method
   * @private
   */
  async _onItemSummary(event: JQuery.ClickEvent) {
    event.preventDefault();
    const li = $(event.currentTarget).closest('.item');
    const itemId = li.data('itemId');
    const item = this.actor.items.get(li.data('itemId'));

    if (!item) {
      console.error(`Unable to find item ${itemId} to fold/expand.`);
      return;
    }
    // TODO update when v10 types are out
    // @ts-ignore
    const chatData = await item.getChatData({ secrets: this.actor.owner });

    // Toggle summary
    if (li.hasClass('expanded')) {
      const summary = li.children('.item-summary');
      summary.slideUp(200, () => summary.remove());
    } else {
      const div = $(`<div class="item-summary">${chatData.description}</div>`);
      const metadata = $(
        `<div class="item-metdata">${chatData.metadatahtml}</div>`,
      );
      div.append(metadata);
      li.append(div.hide());
      div.slideDown(200);
    }
    li.toggleClass('expanded');
  }

  /* -------------------------------------------- */

  /** @override */
  async _onDrop(event: DragEvent) {
    event.preventDefault();

    // Get dropped data
    let data;
    try {
      // If, for some reason, there's no data in the drop then return false.
      // We will do if there is a problem parsing the drop's JSON or
      // the drop data is empty.
      if (!event.dataTransfer) {
        return false;
      }
      data = JSON.parse(event.dataTransfer.getData('text/plain'));
    } catch (err) {
      return false;
    }
    if (!data) return false;

    // Case 1 - Dropped Item
    if (data.type === 'Item') {
      return this._onDropItem(event, data);
    }

    // Case 2 - Dropped Actor
    if (data.type === 'Actor') {
      return this._onDropActor(event, data);
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle dropping an Actor on the sheet to trigger a Polymorph workflow
   * @param {DragEvent} event   The drop event
   * @param {Object} data       The data transfer
   * @return {Object}           OwnedItem data _getIndexeso create
   * @private
   */
  async _onDropActor(event: DragEvent, data: any) {}

  /* -------------------------------------------- */

  /**
   * Handle dropping of an item reference or item data onto an Actor Sheet
   * @param {DragEvent} event     The concluding DragEvent which contains drop data
   * @param {Object} data         The data transfer extracted from the event
   * @return {Object}             OwnedItem data to create
   * @private
   */
  async _onDropItem(event: DragEvent, data: any) {
    if (!this.actor.isOwner) return false;
    // TODO update this when v10 types are out
    // @ts-ignore
    const item = await Item.implementation.fromDropData(data);

    // Handle item sorting within the same Actor
    const actor = this.actor;
    const sameActor =
      data.actorId === actor.id ||
      (actor.isToken && data.tokenId === actor.token?.id);
    if (sameActor) return this._onSortItem(event, item);

    // Non-sorcery items cannot have duplicate entries on the actor.
    const actorHasDrop = await this._doesActorHaveItem(item.type, item.name);
    if (item.type !== 'sorcery' && actorHasDrop) {
      return ui.notifications?.error(
        game.i18n.format('SVNSEA2E.ItemExists', {
          type: item.type,
          name: item.name,
        }),
      );
    }

    if (item.type === 'background') {
      if (
        // If the background is nation specific the actor must be of the same nation.
        (item.system.nation !== 'none' &&
          item.system.nation !== this.actor.system.nation) ||
        // Glamour Isles backgrounds applies to Highland, Avalon, and Inismore.
        (item.system.nation === 'gisles' && !isValidGlamorIsles(this.actor))
      ) {
        return ui.notifications?.error(
          game.i18n.format('SVNSEA2E.WrongNation', {
            bgnation: game.i18n.localize(
              CONFIG.svnsea2e.nations[item.system.nation],
            ),
            anation: game.i18n.localize(
              CONFIG.svnsea2e.nations[this.actor.system.nation],
            ),
            name: item.name,
          }),
        );
      }

      // Process background drops.
      await this._processBackgroundDrop(item);
    }
    // Create the owned item
    return await this.actor.createEmbeddedDocuments('Item', [item]);
  }

  async _updateBackgroundSkills(item, adj) {
    const actorData = this.actor.system;
    const updateData = item.system.skills.reduce(
      (updateData: AlphaMap, skill: string) => {
        const skillAdjustment = actorData.skills[skill].value + adj;
        const skillValue = Math.max(Math.min(skillAdjustment, 5), 0);
        return { ...updateData, [`system.skills.${skill}.value`]: skillValue };
      },
      {},
    );

    await this.actor.update(updateData);
  }

  /* -------------------------------------------- */

  /**
   * Process for modifying the character sheet when a background is dropped on it.
   * Backgrounds increase skills and add advantages
   * @param item for the item that has been dropped on the character sheet
   */
  async _processBackgroundDrop(item) {
    const backgroundData = item.system;

    // Go through all the advantages on the background and find the matching
    // Advantage Item and add it to the actor.
    for (const bAdvantage of backgroundData.advantages) {
      const gameAdvantage = game.items?.find(
        (gItem) => gItem.name === bAdvantage,
      );
      const packAdvantages = game.svnsea2e.packAdv;
      const packAdvantage = packAdvantages.find(
        (pa) => pa.name.toLowerCase() === bAdvantage.toLowerCase(),
      );
      const assignedAdvantage = gameAdvantage || packAdvantage || null;

      // If no source advantage was found, send the user an alert.
      if (!assignedAdvantage) {
        ui.notifications?.error(
          game.i18n.format('SVNSEA2E.ItemDoesntExist', {
            name: bAdvantage,
          }),
        );
        continue;
      }
      const actorHas = await this._doesActorHaveItem(
        'advantage',
        assignedAdvantage.name,
      );

      // Only Sorcery items can be duplicated, if it is invalid, send the user an alert.
      if (assignedAdvantage.type !== 'sorcery' && actorHas) {
        ui.notifications?.error(
          game.i18n.format('SVNSEA2E.ItemExists', {
            type: assignedAdvantage.type,
            name: assignedAdvantage.name,
          }),
        );
        continue;
      }

      // Add the background's advantage to the actor.
      await this.actor.createEmbeddedDocuments('Item', [
        duplicate(assignedAdvantage),
      ]);
    }
    // Apply the skills.
    await this._updateBackgroundSkills(item, 1);
  }

  /* -------------------------------------------- */

  /**
   * Process for modifying the character sheet when a background is dropped on it.
   * Backgrounds increase skills and add advantages
   * @param itemData data for the item that is being deleted
   */
  async _processBackgroundDelete(bkgData) {
    const actorData = this.actor.data.data;
    const updateData = {};
    for (let i = 0; i < bkgData.skills.length; i++) {
      const skill = bkgData.skills[i];
      updateData['skills.' + skill + '.value'] =
        actorData.skills[skill].value - 1;
    }
    await this.actor.update(updateData);

    const charAdvs = await this._getAdvantages();
    for (let i = 0; i < bkgData.advantages.length; i++) {
      for (let j = 0; j < charAdvs.length; j++) {
        if (charAdvs[j].data.name === bkgData.advantages[i]) {
          await this.actor.deleteEmbeddedDocuments('Item', [charAdvs[j].id]);
        }
      }
    }
  }

  /* -------------------------------------------- */

  /**
   * Determine if the actor as any item records associated with it.
   * @private
   */
  async _doesActorHaveItem(type, name) {
    const found = this.actor.items.find(
      (item) => item.name === name && item.type === type,
    );
    return !!found;
  }

  /* -------------------------------------------- */

  /**
   * Retrive the names of advantages
   * @private
   */
  async _getAdvantageNames() {
    return this.actor.items
      .filter((item) => item.type === 'advantage')
      .map((item) => item.name);
  }

  /* -------------------------------------------- */

  /**
   * Retrieve all advantages the character has assigned
   * @private
   */
  async _getAdvantages() {
    return this.actor.items.filter((item) => item.type === 'advantage');
  }

  /* -------------------------------------------- */

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async _onHeroRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const actor = this.actor;
    const data = this.actor.system;

    let skillValue = data.skills[dataset.label]['value'];
    let rolldata = {
      threshold: 10,
      explode: false,
      reroll: false,
      skilldice: skillValue,
    };

    if (skillValue > 2) rolldata['reroll'] = true;

    // if the character's skill is 4 or more then they can get 2 raises when matching to a 15
    if (skillValue >= 4) rolldata['threshold'] = 15;

    if (skillValue === 5 || data.dwounds.value === 3)
      rolldata['explode'] = true;

    const traits = {};
    for (const trait of Object.keys(data.traits)) {
      traits[CONFIG.svnsea2e.traits[trait]] = data.traits[trait].value;
    }

    const initialBonusDice = data.dwounds.value >= 1 ? 1 : 0;

    // Render modal dialog
    const template = 'systems/svnsea2e/templates/chats/skill-roll-dialog.html';
    const dialogData = { data, traits, initialBonusDice };

    const html = await renderTemplate(template, dialogData);

    // Create the Dialog window
    const title = game.i18n.format('SVNSEA2E.ApproachPromptTitle', {
      skill: CONFIG.svnsea2e.skills[dataset.label],
    });
    return new Promise((resolve) => {
      new Dialog(
        {
          title: title,
          content: html,
          buttons: {
            roll: {
              icon: '<img src="systems/svnsea2e/icons/d10.svg" class="d10">',
              label: game.i18n.localize('SVNSEA2E.Roll'),
              callback: (html) =>
                roll({
                  rolldata,
                  actor,
                  data,
                  form: html[0].querySelector('form'),
                  template: 'systems/svnsea2e/templates/chats/roll-card.html',
                  title: game.i18n.format('SVNSEA2E.ApproachRollChatTitle', {
                    trait:
                      html[0].querySelector('form').trait[
                        html[0].querySelector('form').trait.selectedIndex
                      ].text,
                    skill: CONFIG.svnsea2e.skills[dataset.label],
                  }),
                }),
            },
          },
        },
        {},
      ).render(true);
    });
  }

  /* -------------------------------------------- */

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async _onVillainRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const actor = this.actor;
    const data = this.actor.system;

    let rolldata = {
      threshold: 10,
      explode: false,
      reroll: false,
      skilldice: 0,
    };

    // Render modal dialog
    const template = 'systems/svnsea2e/templates/chats/trait-roll-dialog.html';

    const initialBonusDice = data.dwounds.value >= 1 ? 1 : 0;

    const dialogData = {
      data: data,
      traitmax: data.traits[dataset.label]['value'],
      initialBonusDice,
    };

    const html = await renderTemplate(template, dialogData);

    // Create the Dialog window
    const title = game.i18n.format('SVNSEA2E.TraitRollTitle', {
      trait: CONFIG.svnsea2e.traits[dataset.label],
    });
    return new Promise(() => {
      new Dialog(
        {
          title: title,
          content: html,
          buttons: {
            roll: {
              icon: '<img src="systems/svnsea2e/icons/d10.svg" class="d10">',
              label: game.i18n.localize('SVNSEA2E.Roll'),
              callback: (html) =>
                roll({
                  rolldata: rolldata,
                  actor: actor,
                  data: data,
                  form: html[0].querySelector('form'),
                  template: 'systems/svnsea2e/templates/chats/roll-card.html',
                  title: title,
                }),
            },
          },
        },
        {},
      ).render(true);
    });
  }

  /* -------------------------------------------- */
}
