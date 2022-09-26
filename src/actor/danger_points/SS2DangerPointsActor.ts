import { SS2Actor } from '../actorBase';
import { ActorType } from '../types';

export class SS2DangerPointsActor extends SS2Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();
  }
}

export interface SS2DangerPointsActor {
  data: foundry.data.ActorData & {
    type: ActorType.DangerPoints;
    _source: { type: ActorType.DangerPoints };
  };
  system: SS2DangerPointsActor['data']['data'];
}
