interface UpdateInterface {
  receiverUpdate: any;
  senderUpdate: any;
}
type Effect = {
  [key: string]: number;
};

type attackObjectProps = {
  _id: string;
  damageType: string;
  bodyPart: string;
  tierOneEffects: Effect[];
  tierTwoEffects: Effect[];
  tierThreeEffects: Effect[];
  tierFourEffects: Effect[];
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
  console.log(sender, receiver, action, damageType, bodyPart, tier);

  // Construct the update object based on the action, damageType, and tier
  const update: UpdateInterface = {
    receiverUpdate: {},
    senderUpdate: {},
  };

  const fetchAttackObject = async (damageType: string, bodyPart: string) => {
    const params = new URLSearchParams({
      damageType: damageType,
      bodyPart: bodyPart,
    });
    console.log(params);
    const response = await fetch(`http://0.0.0.0:3000/api/db/wounds?${params}`);
    const attackConfig = await response.json();
    console.log("fetchAttackObject: ", attackConfig);
    return attackConfig;
  };

  const chosenAttack: attackObjectProps  = await fetchAttackObject(damageType, bodyPart);
  console.log("chosenAttack: ", chosenAttack);

  if (action === "attack") {
    //    check melee or ranged ???
    update.senderUpdate["actionPoints"] = -1;
    console.log(chosenAttack);

    if (chosenAttack) {
      // Set the update object based the attack's tier
      if (tier === 1) {
        const receiverUpdate = Object.assign(
          {},
          ...chosenAttack.tierOneEffects.map((effect) =>
            JSON.parse(effect)
          )
        );
        console.log(receiverUpdate);

        update.receiverUpdate = receiverUpdate;
      }
      if (tier === 2) {
        const receiverUpdate = Object.assign(
          {},
          ...chosenAttack.tierTwoEffects.map((key) => JSON.parse(key))
        );
        console.log(receiverUpdate);

        update.receiverUpdate = receiverUpdate;
      }
      if (tier === 3) {
        const receiverUpdate = Object.assign(
          {},
          ...chosenAttack.tierThreeEffects.map((effect: string) =>
            JSON.parse(effect)
          )
        );
        console.log(receiverUpdate);
        update.receiverUpdate = receiverUpdate;
      }
      if (tier === 4) {
        const receiverUpdate = Object.assign(
          {},
          ...chosenAttack.tierFourEffects.map((effect: string) =>
            JSON.parse(effect)
          )
        );
        console.log([JSON.stringify(receiverUpdate)]);
        console.log(receiverUpdate);

        update.receiverUpdate = receiverUpdate;
      }
    }
  }

  // switch (action) {
  //   case "reaction":
  //     //    check Dodge, Block or Resist
  //     break;

  //   case "take":
  //     break;
  //   case "hide":
  //     break;
  //   case "move":
  //     break;
  //   case "mount":
  //     break;
  //   case "grapple":
  //     break;
  //   case "bolster":
  //     break;
  //   case "intimidate":
  //     break;

  console.log("update", update);
  return update;
}
