import {
  ActorType,
  SvnseaActorDataPropertiesData,
  SvnseaActorSheetData,
} from '../types';
import SS2ActorSheet from '../sheetBase';

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class SS2DangerPointsActorSheet extends SS2ActorSheet<ActorType.DangerPoints> {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['svnsea2e', 'sheet', 'actor'],
      template: 'systems/svnsea2e/templates/actors/dangerpts.html',
      tabs: [
        {
          contentSelector: '.sheet-body',
        },
      ],
      width: 450,
      height: 250,
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
    data: SvnseaActorSheetData<ActorType.DangerPoints>,
    sheetData: SvnseaActorSheetData<ActorType.DangerPoints>,
  ): void {
    const actorData: SvnseaActorDataPropertiesData = this.actor.system;
    sheetData.points = actorData.points;
  }

  /**
   * Activate event listeners using the prepared sheet HTML
   *
   * @param {JQuery} html The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(html: JQuery) {
    super.activateListeners(html);

    html.find('.dpminus').on('click', () => this._decreaseDP(1));
    html.find('.dpmminus').on('click', () => this._decreaseDP(2));

    html.find('.dpplus').on('click', () => this._increaseDP(1));
    html.find('.dppplus').on('click', () => this._increaseDP(2));
  }

  _decreaseDP(value: number) {
    const dp =
      this.actor.system.points > value ? this.actor.system.points - value : 0;

    this.actor
      .update({
        'system.points': dp,
      })
      .then(() => this.render(false));
  }

  _increaseDP(value: number) {
    const dp = this.actor.system.points + value;

    this.actor
      .update({
        'system.points': dp,
      })
      .then(() => this.render(false));
  }
}
