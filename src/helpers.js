// export const skillsToSheetData = (actorData, CONFIG) =>
//   Object.entries(actorData.skills)
//     .map(([s, skill]) => ({
//       ...skill,
//       name: s,
//       label: CONFIG.svnsea2e.skills[s],
//     }))
//     .sort((a, b) => a.label.localeCompare(b.label));

export const getItems = (data, type) =>
  data.items.filter((item) => item.type === type);

export async function getAllPackAdvantages() {
  let itemPacks = game.packs.filter((p) => p.metadata.type === 'Item');
  const bar = async (p, i) => {
    return await p.getDocument(i._id);
  };
  const foo = async (p) => {
    const items = await p.getIndex();
    return await Promise.all(
      items.filter((i) => i.type === 'advantage').map((i) => bar(p, i)),
    );
  };
  let a = await Promise.all(itemPacks.map((p) => foo(p)));
  return a.flatMap((a) => a);
}

export const GLAMOR_NATIONS = ['highland', 'avalon', 'insmore'];
export const isValidGlamorIsles = (actor) =>
  GLAMOR_NATIONS.includes(actor.system.nation);

export const tuplesToObject = (obj, [k, v]) => ({ ...obj, [k]: v });

// Localize CONFIG objects once up-front
const LOCALIZABLE_CONFIG_ENTRIES = [
  'actorTypes',
  'natTypes',
  'artifactTypes',
  'crewStatuses',
  'durations',
  'itemTypes',
  'languages',
  'nations',
  'traits',
  'shipRoles',
  'skills',
  'sorceryTypes',
  'sorceryCats',
  'sorcerySubcats',
  'storyStatuses',
];
export const localizeConfig = (
  config,
  localizable = LOCALIZABLE_CONFIG_ENTRIES,
) =>
  Object.entries(config)
    .filter(([k, v]) => localizable.includes(k))
    .map(([k, v]) => [
      k,
      Object.entries(v)
        .map(([k2, v2]) => [k2, game.i18n.localize(v2)])
        .reduce(tuplesToObject, {}),
    ])
    .sort(([k1, _v1], [k2, _v2]) => {
      return k1.toLocaleString().localeCompare(k2.toLocaleString());
    })
    .reduce(tuplesToObject, {});
