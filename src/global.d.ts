import { SVNSEA_CONFIG } from './config';

declare global {
  // Since we never use these before `init` tell league types that they are
  // never undefined
  interface LenientGlobalVariableTypes {
    game: never;
    canvas: never;
  }

  interface Game {
    svnsea2e: SvnseaSettings;
  }

  // Add `system` to Actors until v10 types are updated.
  interface Actor {
    system: Actor['data']['data'];
  }

  // Add `system` to Actors until v10 types are updated.
  interface Item {
    system: Item['data']['data'];
  }

  interface CONFIG {
    svnsea2e: typeof SVNSEA_CONFIG;
  }
}

interface StringMap {
  [key: string]: string;
}

interface AlphaMap {
  [key: string]: string | number;
}

interface DieMatches {
  two: [number, number][];
  three: [number, number, number][];
}

interface SvnseaSettings {
  [x: string]: unknown;
}

type ConfigTraits = {
  brawn: string | null;
  finesse: string | null;
  influence: string | null;
  panache: string | null;
  resolve: string | null;
  strength: string | null;
  wits: string | null;
};

interface SvnseaConfig {
  ASCII: string;
  itemTypes: StringMap;
  actorTypes: StringMap;
  nations: StringMap;
  natTypes?: StringMap;
  languages: StringMap;
  traits: ConfigTraits;
  skills: object;
  storyStatuses: object;
  sorceryTypes: object;
  durations: object;
  sorceryCats: object;
  sorcerySubcats: object;
  crewStatuses: object;
  artifactTypes: object;
  shipRoles: object;
  match10: DieMatches;
  match15: DieMatches;
  match20: DieMatches;
}
