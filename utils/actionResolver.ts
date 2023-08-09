interface UpdateInterface {
  receiverUpdate: {
    [key: string]: number;
  };
  senderUpdate: {
    [key: string]: number;
  };
}

export async function actionResolver(
  sender: string,
  receiver: string,
  action: string,
  weapon: string,
  damageType: string,
  tier: number,
  bodyPart: string
) {
  // Define the weapons array - fetch once on game start from db
  const weaponsConfig = [
    { item: "Fist", damageRating: 1, damageType: "Bludgeoning" },
    { item: "Daggers", damageRating: 2, damageType: "piercing" },
    {
      item: "Short swords",
      damageRating: 2,
      damageType: ["slashing", "piercing"],
    },
    {
      item: "Long swords",
      damageRating: 3,
      damageType: ["slashing", "piercing"],
    },
    { item: "Greatswords", damageRating: 4, damageType: "slashing" },
    { item: "Club", damageRating: 2, damageType: "Bludgeoning" },
    { item: "Morningstar", damageRating: 3, damageType: "Bludgeoning" },
    { item: "Mace", damageRating: 4, damageType: "Bludgeoning" },
    { item: "Cleaver", damageRating: 2, damageType: "slashing" },
  ];

  // Define the wounds array - fetch once on game start from db
  const attacksConfig = [
    {
      bodyPart: "Torso",
      damageType: "Bludgeoning",
      tierOneEffects: { "attributes.constitution": -1 },
      tierTwoEffects: [
        { "statusEffects.constitution": -1 },
        { "statusEffects.shock": 1 },
      ],
      tierThreeEffects: [
        { "attributes.constitution": -1 },
        { "statusEffects.shock": 1 },
        { "statusEffects.collapsedLung": 1 },
      ],
      tierFourEffects: [
        { "attributes.constitution": -2 },
        { "statusEffects.shock": 1 },
        { "statusEffects.collapsedLung": 1 },
      ],
    },
    {
      bodyPart: "Torso",
      damageType: "slashing",
      tierOneEffects: { "statusEffects.bleed": 1 },
      tierTwoEffects: [
        { "attributes.constitution": -1 },
        { "statusEffects.bleed": 1 },
      ],
      tierThreeEffects: [
        { "attributes.constitution": -2 },
        { "statusEffects.gutspill": 1 },
      ],
      tierFourEffects: [
        { "attributes.constitution": -3 },
        { "statusEffects.gutspill": 1 },
        { "statusEffects.internalBleeding": 1 },
      ],
    },
  ];

  // Construct the update object based on the action, weapon, damageType, and tier
  const update: UpdateInterface = {
    receiverUpdate: {},
    senderUpdate: {},
  };

  switch (action) {
    case "take":
      break;
    case "hide":
      break;
    case "move":
      break;
    case "mount":
      break;
    case "grapple":
      break;
    case "bolster":
      break;
    case "intimidate":
      break;
    case "reaction":
      //    check Dodge, Block or Resist
      break;
    case "attack":
      // Find the weapon in the weapons array
      const weaponObj = weaponsConfig.find((weaponConfig) => weaponConfig.item === weapon);
      
      if (weaponObj) {
        //    check melee or ranged
        // Set the update object based on the weapon's damage rating
        update.receiverUpdate["actionPoints"] = -weaponObj.damageRating;
        update.senderUpdate["actionPoints"] = -1;
      }
      // Find the attack in the attackConfig array
      const attackObj = attacksConfig.find((attackConfig) => attackConfig.damageType === damageType);

      if (attackObj) {
        // Set the update object based on the weapon's damageRating
        switch (weaponObj?.damageType) {
          case "slashing":
            // update.receiverUpdate = attackObj.tierOneEffects;
            break;
          case "Bludgeoning":
            break;
          case "Piercing":
            update.receiverUpdate["statusEffects.Collapsed Lung"] = 1;
            break;
          case "Elemental":
            break;
        }
      }
      break;
  }

  console.log(update);
  return update;
}
