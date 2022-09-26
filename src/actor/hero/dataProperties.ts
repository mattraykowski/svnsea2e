import { SS2HeroDataSource, SS2HeroDataSourceData } from './dataSource';

export interface SS2HeroDataPropertiesData extends SS2HeroDataSourceData {}

export interface SS2HeroDataProperties extends SS2HeroDataSource {
  data: SS2HeroDataPropertiesData;
}
