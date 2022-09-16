import './allowJavaScriptModules';
import './scss/svnsea2e.scss';

// Import Modules
import { SVNSEA_CONFIG } from './config.ts';
import { preloadHandlebarsTemplates } from './templates.js';
import { registerSystemSettings } from './settings.js';

// Import Applications
import { SvnSea2EActor } from './actor/actor.ts';
import { ActorSheetSS2ePlayerCharacter } from './actor/sheets/playercharacter.js';
import { ActorSheetSS2eHero } from './actor/sheets/hero.js';
import { ActorSheetSS2eBrute } from './actor/sheets/brute.js';
import { ActorSheetSS2eMonster } from './actor/sheets/monster.js';
import { ActorSheetSS2eVillain } from './actor/sheets/villain.js';
import { ActorSheetSS2eShip } from './actor/sheets/ship.js';
import { ActorSheetSS2eDangerPts } from './actor/sheets/dangerpts.js';
import { SvnSea2EItem } from './item/item.js';
import { ItemSheetSS2eAdvantage } from './item/sheets/advantage.js';
import { ItemSheetSS2eArtifact } from './item/sheets/artifact.js';
import { ItemSheetSS2eBackground } from './item/sheets/background.js';
import { ItemSheetSS2eDuelStyle } from './item/sheets/duelstyle.js';
import { ItemSheetSS2eMonsterQuality } from './item/sheets/monsterquality.js';
import { ItemSheetSS2eSecretSociety } from './item/sheets/secretsociety.js';
import { ItemSheetSS2eScheme } from './item/sheets/scheme.js';
import { ItemSheetSS2eShipAdventure } from './item/sheets/shipadventure.js';
import { ItemSheetSS2eShipBackground } from './item/sheets/shipbackground.js';
import { ItemSheetSS2eSorcery } from './item/sheets/sorcery.js';
import { ItemSheetSS2eStory } from './item/sheets/story.js';

import * as migrations from './migration.js';
import { ItemSheetSS2eVirtue } from './item/sheets/virtue.js';
import { ItemSheetSS2eHubris } from './item/sheets/hubris.js';
import { chatEventHandler } from './eventhandler.js';

import {getAllPackAdvantages, localizeConfig} from './helpers.js';
import {registerHandlebarsHelpers} from "./handlebars";
import {ActorType} from "./actor/types";

Hooks.once('init', async function () {
    console.log(`7th Sea 2E | Initializing 7th Sea Second Edition System
    ${SVNSEA_CONFIG.ASCII}`);

    game.svnsea2e = {
        applications: {
            SvnSea2EActor,
            SvnSea2EItem,
        },
        config: SVNSEA_CONFIG,
        migrations: migrations,
    };

    /**
     * Set an initiative formula for the system
     * @type {String}
     */
    CONFIG.Combat.initiative = {
        formula: '1d20',
        decimals: 2,
    };

    CONFIG.svnsea2e = SVNSEA_CONFIG;
    CONFIG.svnsea2e.natTypes = duplicate(SVNSEA_CONFIG.nations);
    CONFIG.svnsea2e.natTypes.gisles = 'SVNSEA2E.RegionGlamourIsles';

    // Define custom Entity classes
    CONFIG.Actor.documentClass = SvnSea2EActor;
    CONFIG.Item.documentClass = SvnSea2EItem;

    // Register System Settings
    registerSystemSettings();

    // Register sheet application classes
    Actors.unregisterSheet('core', ActorSheet);
    Actors.registerSheet('svnsea2e', ActorSheetSS2ePlayerCharacter, {
        types: [ActorType.PlayerCharacter],
        makeDefault: true,
    });
    Actors.registerSheet('svnsea2e', ActorSheetSS2eHero, {
        types: [ActorType.Hero],
        makeDefault: true,
    });
    Actors.registerSheet('svnsea2e', ActorSheetSS2eBrute, {
        types: [ActorType.Brute],
        makeDefault: true,
    });
    Actors.registerSheet('svnsea2e', ActorSheetSS2eMonster, {
        types: [ActorType.Monster],
        makeDefault: true,
    });
    Actors.registerSheet('svnsea2e', ActorSheetSS2eVillain, {
        types: [ActorType.Villain],
        makeDefault: true,
    });
    Actors.registerSheet('svnsea2e', ActorSheetSS2eShip, {
        types: [ActorType.Ship],
        makeDefault: true,
    });
    Actors.registerSheet('svnsea2e', ActorSheetSS2eDangerPts, {
        types: [ActorType.DangerPoints],
        makeDefault: true,
    });

    Items.unregisterSheet('core', ItemSheet);
    Items.registerSheet('svnsea2e', ItemSheetSS2eAdvantage, {
        types: ['advantage'],
        makeDefault: true,
    });
    Items.registerSheet('svnsea2e', ItemSheetSS2eArtifact, {
        types: ['artifact'],
        makeDefault: true,
    });
    Items.registerSheet('svnsea2e', ItemSheetSS2eBackground, {
        types: ['background'],
        makeDefault: true,
    });
    Items.registerSheet('svnsea2e', ItemSheetSS2eDuelStyle, {
        types: ['duelstyle'],
        makeDefault: true,
    });
    Items.registerSheet('svnsea2e', ItemSheetSS2eMonsterQuality, {
        types: ['monsterquality'],
        makeDefault: true,
    });
    Items.registerSheet('svnsea2e', ItemSheetSS2eScheme, {
        types: ['scheme'],
        makeDefault: true,
    });
    Items.registerSheet('svnsea2e', ItemSheetSS2eSecretSociety, {
        types: ['secretsociety'],
        makeDefault: true,
    });
    Items.registerSheet('svnsea2e', ItemSheetSS2eShipAdventure, {
        types: ['shipadventure'],
        makeDefault: true,
    });
    Items.registerSheet('svnsea2e', ItemSheetSS2eShipBackground, {
        types: ['shipbackground'],
        makeDefault: true,
    });
    Items.registerSheet('svnsea2e', ItemSheetSS2eSorcery, {
        types: ['sorcery'],
        makeDefault: true,
    });
    Items.registerSheet('svnsea2e', ItemSheetSS2eStory, {
        types: ['story'],
        makeDefault: true,
    });
    Items.registerSheet('svnsea2e', ItemSheetSS2eVirtue, {
        types: ['virtue'],
        makeDefault: true,
    });
    Items.registerSheet('svnsea2e', ItemSheetSS2eHubris, {
        types: ['hubris'],
        makeDefault: true,
    });

    registerHandlebarsHelpers();

    // Preload Handlebars Templates
    await preloadHandlebarsTemplates();
});

/* -------------------------------------------- */

Hooks.once('ready', async function () {
    game.svnsea2e.packAdvs = await getAllPackAdvantages();
    console.log('7th Sea 2E | Loaded Compendium Advantages');
    // Wait to register hotbar drop hook on ready so that
    // modules could register earlier if they want to
    // Hooks.on('hotbarDrop', (bar, data, slot) => createSvnSea2EMacro(data, slot))
    let currentVersion = game.settings.get('svnsea2e', 'systemMigrationVersion');
    if (!currentVersion) {
        currentVersion = '0.6';
    }

    // const needMigration = semver.lt(currentVersion, game.system.version);
    const needMigration = true;
    // Perform the migration
    if (needMigration && game.user?.isGM) {
        await migrations.migrateWorld();
    }

    chatEventHandler();
});

/* -------------------------------------------- */

/**
 * This function runs after game data has been requested
 * and loaded from the servers, so entities exist
 */
Hooks.once('setup', function () {
    // Go through all the config items that represent translatable text and cache the translations.
    CONFIG.svnsea2e = { ...CONFIG.svnsea2e, ...localizeConfig(CONFIG.svnsea2e) };
});

/* -------------------------------------------- */

/**
 * Set the default image for an item type instead of the mystery man
 **/
Hooks.on('preCreateItem', (document: any) => {
    document.updateSource({
        img: 'systems/svnsea2e/icons/' + document.type + '.jpg',
    });
});

/* -------------------------------------------- */

/**
 * Set the default image for an actor type instead of the mystery man
 **/
Hooks.on('preCreateActor', function (document: any) {
    document.updateSource({
        img: 'systems/svnsea2e/icons/' + document.type + '.jpg',
    });
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */
