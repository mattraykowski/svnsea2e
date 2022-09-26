import { SS2Actor } from '../actorBase';
import { ActorType } from '../types';

export class SS2ShipActor extends SS2Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();
  }
}

export interface SS2ShipActor {
  data: foundry.data.ActorData & {
    type: ActorType.Ship;
    _source: { type: ActorType.Ship };
  };
  system: SS2ShipActor['data']['data'];
}
