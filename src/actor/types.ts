import {SvnSea2EActor} from "./actor";


interface BoundedValue {
    min: number;
    max: number;
    value: number;
}

export enum ActorType {
    PlayerCharacter = "playercharacter",
    Hero = "hero",
    Brute = "brute",
    Monster = "monster",
    Villain = "villain",
    Ship = "ship",
    DangerPoints = "dangerpts"
}

interface Traits {
    strength: BoundedValue;
    influence: BoundedValue;
}

interface Skills {
    aim: BoundedValue;
    athletics: BoundedValue;
    brawl: BoundedValue;
    convince: BoundedValue;
    empathy: BoundedValue;
    hide: BoundedValue;
    intimidate: BoundedValue;
    notice: BoundedValue;
    perform: BoundedValue;
    ride: BoundedValue;
    sailing: BoundedValue;
    scholarship: BoundedValue;
    tempt: BoundedValue;
    theft: BoundedValue;
    warfare: BoundedValue;
    weaponry: BoundedValue;
}

// type
//
// interface Arcana {
//
// }

export interface SvnseaActorDataSourceData {
    base: { initiative: number, wounds: BoundedValue, dwounds: BoundedValue };
    details: { nation: string, religion: string, age: number, languages: string[], arcana: object, concept: string }
}

export interface SvnseaActorDataPropertiesData {
    villainy: any;
    traits: Traits;
    wounds: BoundedValue;
    skills: Skills;
}

export interface SvnseaActorDataProperties<T extends ActorType> {
    type: T;
    data: SvnseaActorDataPropertiesData;
}

// This should match template.json
interface SvnseaActorDataSource<T extends ActorType> {
    type: T;
    data: SvnseaActorDataSourceData,
}

type SvnseaActorSource =
    | SvnseaActorDataSource<ActorType.PlayerCharacter>
    | SvnseaActorDataSource<ActorType.Hero>
    | SvnseaActorDataSource<ActorType.Brute>
    | SvnseaActorDataSource<ActorType.Monster>
    | SvnseaActorDataSource<ActorType.Villain>
    | SvnseaActorDataSource<ActorType.Ship>
    | SvnseaActorDataSource<ActorType.DangerPoints>

type SvnseaActorProperties =
    | SvnseaActorDataProperties<ActorType.PlayerCharacter>
    | SvnseaActorDataProperties<ActorType.Hero>
    | SvnseaActorDataProperties<ActorType.Brute>
    | SvnseaActorDataProperties<ActorType.Monster>
    | SvnseaActorDataProperties<ActorType.Villain>
    | SvnseaActorDataProperties<ActorType.Ship>
    | SvnseaActorDataProperties<ActorType.DangerPoints>



declare global {
    interface SourceConfig {
        Actor: SvnseaActorSource;
    }
    interface DataConfig {
        Actor: SvnseaActorProperties
    }
    interface DocumentClassConfig {
        Actor: typeof SvnSea2EActor;
    }
}