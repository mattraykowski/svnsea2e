import { SS2ActorDataSourceBase } from '../actorDataSource';
import { SS2MonsterDataSourceFeatures } from './dataSource';
import { LabeledBoundedValue } from '../types';

export interface SS2MonsterSheetDataFeatures {
  traits: LabeledBoundedValue[];
  monsterqualities: [];
}

export type SS2MonsterSheetData = SS2ActorDataSourceBase &
  SS2MonsterSheetDataFeatures &
  SS2MonsterDataSourceFeatures;
