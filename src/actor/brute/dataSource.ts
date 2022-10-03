import {} from '../actorDataSource';
import { ActorType, BoundedValue } from '../types';

export interface SS2BruteDataSourceData {
  traits: {
    strength: BoundedValue;
  };
  wounds: BoundedValue;
  ability: {
    name: string;
    label: string;
  };
}

export interface SS2BruteDataSource {
  type: ActorType.Brute;
  data: SS2BruteDataSourceData;
}
