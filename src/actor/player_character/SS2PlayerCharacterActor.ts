import { SS2Actor } from '../actorBase';
import { ActorType } from '../types';

export class SS2PlayerCharacterActor extends SS2Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.system;

    actorData.wounds = this._prepareWounds(actorData.wounds);
    this._prepareTraits(actorData.traits);
    actorData.skills = this._prepareSkills(actorData.skills);
  }
}

export interface SS2PlayerCharacterActor {
  data: foundry.data.ActorData & {
    type: ActorType.PlayerCharacter;
    _source: { type: ActorType.PlayerCharacter };
  };
  system: SS2PlayerCharacterActor['data']['data'];
}
