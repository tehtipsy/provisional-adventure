interface UpdateInterface {
  receiverUpdate: any;
  senderUpdate: any;
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
  console.log(sender, receiver, action); // tempConfig
  weapon = "Short swords"; // tempConfig // weapons only in client side to choose damage type?
  // tier = 4; // tempConfig // = weapon.damageRating + prowess, set on attacker client side
  bodyPart = "Torso"; // tempConfig
  damageType = "slashing"; // tempConfig

  // Define the weapons array - fetch once on game start from db
  const weaponsConfig = [
    { item: "Fist", damageRating: 1, damageType: "Bludgeoning" },
    { item: "Daggers", damageRating: 2, damageType: "piercing" },
    {
      item: "Short swords",
      damageRating: 2,
      damageType: "slashing",
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
      tierOneEffects: [{ "attributes.constitution.unmodifiedValue": -1 }],
      tierTwoEffects: [
        { "statusEffects.constitution.unmodifiedValue": -1 },
        { "statusEffects.shock": 1 },
      ],
      tierThreeEffects: [
        { "attributes.constitution.unmodifiedValue": -1 },
        { "statusEffects.shock": 1 },
        { "statusEffects.collapsedLung": 1 },
      ],
      tierFourEffects: [
        { "attributes.constitution.unmodifiedValue": -2 },
        { "statusEffects.shock": 1 },
        { "statusEffects.collapsedLung": 1 },
      ],
    },
    {
      bodyPart: "Torso",
      damageType: "slashing",
      tierOneEffects: [{ "statusEffects.bleed": 1 }],
      tierTwoEffects: [
        { "attributes.constitution.unmodifiedValue": -1 },
        { "statusEffects.bleed": 1 },
      ],
      tierThreeEffects: [
        { "attributes.constitution.unmodifiedValue": -2 },
        { "statusEffects.gutspill": 1 },
      ],
      tierFourEffects: [
        { "attributes.constitution.unmodifiedValue": -3 },
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
      const weaponObj = weaponsConfig.find(
        (weaponConfig) => weaponConfig.item === weapon
      );
      console.log(weaponObj);

      if (weaponObj) {
        console.log(weaponObj);
        //    check melee or ranged
        // Set the update object based on the weapon's damage rating
        update.senderUpdate["actionPoints"] = -1; // set action cost somewhere
      }
      // Find the attack in the attackConfig array
      const attackObj = attacksConfig.find(
        (attackConfig) => attackConfig.damageType === damageType
      );
      console.log(attackObj);

      if (attackObj) {
        console.log("attackObj", attackObj);
        // const receiverUpdate = Object.assign({}, ...attackObj.tierFourEffects);
        // console.log("receiverUpdate", receiverUpdate);
        // update.receiverUpdate = receiverUpdate;
        // Set the update object based on the weapon's damageRating
        let receiverUpdate;

        switch (weaponObj?.damageType) {
          case "slashing":
            // set tier by dice roll
            switch (tier) {
              case 1:
                // tierOneEffects
                receiverUpdate = Object.assign(
                  {},
                  ...attackObj.tierOneEffects
                );
                console.log("receiverUpdate", receiverUpdate);
                update.receiverUpdate = receiverUpdate;
                break;
              case 2:
                // tierTwoEffects
                receiverUpdate = Object.assign(
                  {},
                  ...attackObj.tierTwoEffects
                );
                console.log("receiverUpdate", receiverUpdate);
                update.receiverUpdate = receiverUpdate;
                break;
              case 3:
                // tierThreeEffects
                receiverUpdate = Object.assign(
                  {},
                  ...attackObj.tierThreeEffects
                );
                console.log("receiverUpdate", receiverUpdate);
                update.receiverUpdate = receiverUpdate;
                break;
              case 4:
                // tierFourEffects
                receiverUpdate = Object.assign(
                  {},
                  ...attackObj.tierFourEffects
                );
                console.log("receiverUpdate", receiverUpdate);
                update.receiverUpdate = receiverUpdate;
                break;
            }
            break;
          case "Bludgeoning":
            break;
          case "Piercing":
            break;
          case "Elemental":
            break;
        }
      }
      break;
  }

  console.log("update", update);
  return update;
}
