import { SS2Actor } from '../actorBase';
import { ActorType } from '../types';

export class SS2MonsterActor extends SS2Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.system;
    const { strength, influence } = actorData.traits;
    this._prepareTraits(actorData.traits);
    actorData.villainy = strength.value + influence.value;
    actorData.wounds.max = strength.value * 5;
    actorData.wounds.value = this._boundBoundedValue(actorData.wounds);
  }
}

export interface SS2MonsterActor {
  data: foundry.data.ActorData & {
    type: ActorType.Monster;
    _source: { type: ActorType.Monster };
  };
  system: SS2MonsterActor['data']['data'];
}
