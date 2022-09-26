import { SS2Actor } from '../actorBase';
import { ActorType } from '../types';

export class SS2BruteActor extends SS2Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.system;
    const { strength } = actorData.traits;
    actorData.traits.strength.value = this._boundBoundedValue(strength);
    actorData.wounds.max = actorData.traits.strength.value;
    if (actorData.wounds.max < actorData.wounds.value) {
      actorData.wounds.value = actorData.wounds.max;
    }
  }
}

export interface SS2BruteActor {
  data: foundry.data.ActorData & {
    type: ActorType.Brute;
    _source: { type: ActorType.Brute };
  };
  system: SS2BruteActor['data']['data'];
}
