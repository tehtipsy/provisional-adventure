interface UpdateInterface {
  receiverUpdate: {
    [key: string]: number;
  };
  senderUpdate: {
    [key: string]: number;
  };
}

async function actionResolver(
  sender: string,
  receiver: string,
  action: string,
  weapon: string,
  damageType: string,
  tier: number
) {
  // Define the weapons array - fetch once on game start from db
  const weaponsConfig = [
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
  const wounds = [
    {
      damageType: "Bludgeoning",
      tier1: ["-1 Con"],
      tier2: ["-1 Con", "1 Shock"],
      tier3: ["-1 Con", "1 Shock", "Collapsed Lung"],
      tier4: ["-2 Con", "1 Shock", "Shattered Spine"],
    },
  ];

  // Construct the update object based on the action, weapon, damageType, and tier
  const update: UpdateInterface = {
    receiverUpdate: {},
    senderUpdate: {},
  };

  // if (action === "Take") {}
  // if (action === "Hide") {}
  // if (action === "Move") {}
  // if (action === "Mount") {}
  // if (action === "Grapple") {}
  // if (action === "Bolster") {}
  // if (action === "Intimidate") {}
  // if (action === "reaction") {check Dodge, Block or Resist}

  if (action === "attack") {
      // check melee or ranged
    // Find the weapon in the weapons array
    const weaponObj = weaponsConfig.find((w) => w.item === weapon);

    if (weaponObj) {
      // Set the update object based on the weapon's damage rating
      update.receiverUpdate["actionPoints"] = -weaponObj.damageRating;
      update.senderUpdate["actionPoints"] = -1;
    }
  } else if (action === "wound") {
    // Find the wound in the wounds array
    const woundObj = wounds.find((w) => w.damageType === damageType);

    if (woundObj) {
      // Set the update object based on the wound's tier
      switch (tier) {
        case 1:
          update.receiverUpdate["attributes.constitution.t1"] = -1;
          break;
        case 2:
          update.receiverUpdate["attributes.constitution.t2"] = -1;
          update.receiverUpdate["statusEffects.Shock"] = 1;
          break;
        case 3:
          update.receiverUpdate["attributes.constitution.t3"] = -1;
          update.receiverUpdate["statusEffects.Shock"] = 1;
          update.receiverUpdate["statusEffects.Collapsed Lung"] = 1;
          break;
        case 4:
          update.receiverUpdate["attributes.constitution.t4"] = -2;
          update.receiverUpdate["statusEffects.Shock"] = 1;
          update.receiverUpdate["statusEffects.Shattered Spine"] = 1;
          break;
      }
    }
  }

  return update;
}
