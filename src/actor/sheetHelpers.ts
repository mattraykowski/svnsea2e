import LanguageSelector from '../apps/language-selector';
import { SS2HeroActor } from './hero/SS2HeroActor';
import { SS2PlayerCharacterActor } from './player_character/SS2PlayerCharacterActor';
import { SS2VillainActor } from './villain/SS2VillainActor';
import { roll } from '../roll/roll';
import { SS2MonsterActor } from './monster/SS2MonsterActor';
import { BoundedValue } from './types';

/**
 * Handle spawning the languageSelector application which allows a checkbox of multiple language options
 */
export function registerLanguageSelector(
  actor: SS2HeroActor | SS2PlayerCharacterActor | SS2VillainActor,
  html: JQuery,
) {
  const languageSelector = (event: JQuery.ClickEvent) => {
    event.preventDefault();
    const a = event.currentTarget;
    const options = {
      title: game.i18n.localize('SVNSEA2E.Languages'),
      choices: CONFIG.svnsea2e[a.dataset.options],
    };
    new LanguageSelector(actor, options).render(true);
  };

  html.find('.language-selector').on('click', languageSelector);
}

export function registerVillainRollables(
  actor: SS2MonsterActor | SS2VillainActor,
  html: JQuery,
) {
  const onVillainRoll = async (event: JQuery.ClickEvent) => {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    const data = actor.system;
    const traits = data.traits as { [t: string]: BoundedValue };

    const rolldata = {
      threshold: 10,
      explode: false,
      reroll: false,
      skilldice: 0,
    };

    // Render modal dialog
    const template = 'systems/svnsea2e/templates/chats/trait-roll-dialog.html';

    const initialBonusDice = data.dwounds.value >= 1 ? 1 : 0;

    const dialogData = {
      data: data,
      traitmax: traits[dataset.label].value,
      initialBonusDice,
    };

    const htmlTemplate = await renderTemplate(template, dialogData);

    // Create the Dialog window
    const title = game.i18n.format('SVNSEA2E.TraitRollTitle', {
      trait: CONFIG.svnsea2e.traits[dataset.label],
    });
    return new Promise(() => {
      new Dialog(
        {
          title: title,
          content: htmlTemplate,
          buttons: {
            roll: {
              icon: '<img src="systems/svnsea2e/icons/d10.svg" class="d10">',
              label: game.i18n.localize('SVNSEA2E.Roll'),
              callback: (html) => {
                // @ts-ignore
                const form = html[0].querySelector('form');
                return roll({
                  rolldata,
                  actor,
                  data,
                  form,
                  template: 'systems/svnsea2e/templates/chats/roll-card.html',
                  title,
                });
              },
            },
          },
        },
        {},
      ).render(true);
    });
  };
  html.find('.rollable').on('click', onVillainRoll);
}
