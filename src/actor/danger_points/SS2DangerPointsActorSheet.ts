import SS2ActorSheet from '../sheetBase';
import { SS2DangerPointsActor } from './SS2DangerPointsActor';

export class SS2DangerPointsActorSheet extends SS2ActorSheet {
  static override get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['svnsea2e', 'sheet', 'actor'],
      template: 'systems/svnsea2e/templates/actors/dangerpts.html',
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
        },
      ],
      width: 450,
      height: 250,
    });
  }

  override getData(): any {
    const actorData = this.actor.system;
    return {
      ...super.getData(),
      points: actorData.points,
    };
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

export interface SS2DangerPointsActorSheet {
  get actor(): SS2DangerPointsActor;
}
