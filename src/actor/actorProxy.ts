import { SS2Actor } from './actorBase';
import { ActorType } from './types';
import { SS2PlayerCharacterActor } from './player_character/SS2PlayerCharacterActor';
import { SS2HeroActor } from './hero/SS2HeroActor';
import { SS2VillainActor } from './villain/SS2VillainActor';
import { SS2BruteActor } from './brute/SS2BruteActor';
import { SS2MonsterActor } from './monster/SS2MonsterActor';
import { SS2ShipActor } from './ship/SS2ShipActor';
import { SS2DangerPointsActor } from './danger_points/SS2DangerPointsActor';

const handler = {
  construct(_: typeof SS2Actor, args: ConstructorParameters<typeof SS2Actor>) {
    switch (args[0]?.type) {
      case ActorType.PlayerCharacter:
        return new SS2PlayerCharacterActor(...args);
      case ActorType.Hero:
        return new SS2HeroActor(...args);
      case ActorType.Brute:
        return new SS2BruteActor(...args);
      case ActorType.Monster:
        return new SS2MonsterActor(...args);
      case ActorType.Villain:
        return new SS2VillainActor(...args);
      case ActorType.Ship:
        return new SS2ShipActor(...args);
      case ActorType.DangerPoints:
        return new SS2DangerPointsActor(...args);
      default:
        throw new Error(
          game.i18n.format('SVNSEA2E.ErrorInvalidActorType', {
            type: args[0]?.type,
          }),
        );
    }
  },
};

export const SS2ActorProxy: typeof SS2Actor = new Proxy(SS2Actor, handler);
