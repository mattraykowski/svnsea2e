import { SvnSea2EItem } from './item';

export enum ItemType {
  Advantage = 'advantage',
  Artifact = 'artifact',
  Background = 'background',
  DuelStyle = 'duelstyle',
  MonsterQuality = 'monsterquality',
  Scheme = 'scheme',
  SecretSociety = 'secretsociety',
  ShipAdventure = 'shipadventure',
  ShipBackground = 'shipbackground',
  Sorcery = 'sorcery',
  Story = 'story',
  Virtue = 'virtue',
  Hubris = 'hubris',
}

export interface SvnseaItemDataSourceData {}

export interface SvnseaItemDataPropertiesData {}

export interface SvnseaItemDataSource<T extends ItemType> {
  type: T;
  data: SvnseaItemDataSourceData;
}

export interface SvnseaItemDataProperties<T extends ItemType> {
  type: T;
  data: SvnseaItemDataPropertiesData;
}

type SvnseaItemSource =
  | SvnseaItemDataSource<ItemType.Advantage>
  | SvnseaItemDataSource<ItemType.Artifact>
  | SvnseaItemDataSource<ItemType.Background>
  | SvnseaItemDataSource<ItemType.DuelStyle>
  | SvnseaItemDataSource<ItemType.MonsterQuality>
  | SvnseaItemDataSource<ItemType.Scheme>
  | SvnseaItemDataSource<ItemType.SecretSociety>
  | SvnseaItemDataSource<ItemType.ShipAdventure>
  | SvnseaItemDataSource<ItemType.ShipBackground>
  | SvnseaItemDataSource<ItemType.Sorcery>
  | SvnseaItemDataSource<ItemType.Story>
  | SvnseaItemDataSource<ItemType.Virtue>
  | SvnseaItemDataSource<ItemType.Hubris>;

type SvnseaItemProperties =
  | SvnseaItemDataProperties<ItemType.Advantage>
  | SvnseaItemDataProperties<ItemType.Artifact>
  | SvnseaItemDataProperties<ItemType.Background>
  | SvnseaItemDataProperties<ItemType.DuelStyle>
  | SvnseaItemDataProperties<ItemType.MonsterQuality>
  | SvnseaItemDataProperties<ItemType.Scheme>
  | SvnseaItemDataProperties<ItemType.SecretSociety>
  | SvnseaItemDataProperties<ItemType.ShipAdventure>
  | SvnseaItemDataProperties<ItemType.ShipBackground>
  | SvnseaItemDataProperties<ItemType.Sorcery>
  | SvnseaItemDataProperties<ItemType.Story>
  | SvnseaItemDataProperties<ItemType.Virtue>
  | SvnseaItemDataProperties<ItemType.Hubris>;

declare global {
  interface SourceConfig {
    Item: SvnseaItemSource;
  }

  interface DataConfig {
    Item: SvnseaItemProperties;
  }

  interface DocumentClassConfig {
    Item: typeof SvnSea2EItem;
  }
}
