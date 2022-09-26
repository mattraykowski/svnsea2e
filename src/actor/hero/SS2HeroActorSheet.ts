import { getItems } from '../../helpers.js';
import SS2ActorSheet from '../sheetBase';
import { ActorType, LabeledBoundedValue } from '../types';
import { SS2ActorSheetDataBase } from '../actorDataProperties.js';
import { SS2HeroActor } from './SS2HeroActor';
import { skillsToSheetData, traitsToSheetData } from '../actorHelpers.js';
import { SS2ActorSheetData } from '../actorDataSheet.js';

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

  getSheetDataBase(): SS2ActorSheetDataBase {
    return {
      ...super.getSheetDataBase(),
      isHero: true,
      hasLanguages: this.actor.system.languages.length > 0,
    };
  }

  override getData(): any {
    const data = this.actor as SS2HeroActor;
    const actorData = data.system;

    // this.actor.system.

    const skills: LabeledBoundedValue[] = skillsToSheetData(
      this.actor.system.skills,
    );

    const traits = traitsToSheetData(this.actor.system.traits, CONFIG.svnsea2e);

    const sheetData: SS2ActorSheetData = {
      ...this.getSheetDataBase(),

      initiative: actorData.initiative,
      wounds: actorData.wounds,
      dwounds: data.system.dwounds,

      // Details:
      nation: actorData.nation,
      religion: actorData.religion,
      age: actorData.age,
      reputation: actorData.reputation,
      languages: actorData.languages,
      arcana: actorData.arcana,
      concept: actorData.concept,
      skills,
      traits,

      advantages: getItems(data, 'advantage'),
      backgrounds: getItems(data, 'background'),
      sorcery: getItems(data, 'sorcery'),
      secretsocieties: getItems(data, 'secretsociety'),
      stories: getItems(data, 'story'),
      duelstyles: getItems(data, 'duelstyle'),
      artifacts: getItems(data, 'artifact'),
      virtues: getItems(data, 'virtue'),
      hubriss: getItems(data, 'hubris'),
    };

    console.log(sheetData);

    return sheetData;
  }
  // override getData() {
  //   const baseSheetData = super.getData();
  //   const data = this.actor as SS2HeroActor;
  //   const actorData = data.system;
  //
  //   // const sheetData =
  //   //
  //   // const sheetData {
  //
  //   // };
  //
  //   const sheetData2: SS2ActorSheetData<ActorType.Hero> = {
  //     ...baseSheetData,
  //
  //     // Actor Base
  //     initiative: actorData.initiative,
  //     wounds: actorData.wounds,
  //     dwounds: data.system.dwounds,
  //
  //     // Details:
  //     nation: actorData.nation,
  //     religion: actorData.religion,
  //     age: actorData.age,
  //     reputation: actorData.reputation,
  //     languages: actorData.languages,
  //     arcana: actorData.arcana,
  //     concept: actorData.concept,
  //
  //     // features
  //     traits: {},
  //
  //     skills: skillsToSheetData(this.actor.system, CONFIG),
  //     advantages: getItems(data, 'advantage'),
  //     backgrounds: getItems(data, 'background'),
  //     sorcery: getItems(data, 'sorcery'),
  //     secretsocieties: getItems(data, 'secretsociety'),
  //     stories: getItems(data, 'story'),
  //     duelstyles: getItems(data, 'duelstyle'),
  //     artifacts: getItems(data, 'artifact'),
  //     virtues: getItems(data, 'virtue'),
  //     hubriss: getItems(data, 'hubris'),
  //   };
  //
  //   // Assign and return
  //
  //   return sheetData2;
  // }
}
