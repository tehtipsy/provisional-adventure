import { fetchAttackObject } from "@/utils/game/attacksConfig";

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
  console.log(sender, receiver, action, damageType, bodyPart, tier);

  // Construct the update object based on the action, damageType, and tier
  const update: UpdateInterface = {
    receiverUpdate: {},
    senderUpdate: {},
  };
  
  const chosenAttack = await fetchAttackObject(damageType, bodyPart);
  console.log("chosenAttack: ", chosenAttack);

  if (action === "attack") {
    update.senderUpdate["actionPoints"] = -1;
    console.log(chosenAttack);

    if (chosenAttack) {
      if (tier === 1) {
        const receiverUpdate = JSON.parse(
          chosenAttack.attackConfig.tierOneEffects
        );
        console.log("receiverUpdate: ", receiverUpdate);

        update.receiverUpdate = receiverUpdate;
      }
      if (tier === 2) {
        const receiverUpdate = JSON.parse(
          chosenAttack.attackConfig.tierTwoEffects
        );
        console.log("receiverUpdate: ", receiverUpdate);

        update.receiverUpdate = receiverUpdate;
      }
      if (tier === 3) {
        const receiverUpdate = JSON.parse(
          chosenAttack.attackConfig.tierThreeEffects
        );
        console.log("receiverUpdate: ", receiverUpdate);
        update.receiverUpdate = receiverUpdate;
      }
      if (tier === 4) {
        const receiverUpdate = JSON.parse(
          chosenAttack.attackConfig.tierFourEffects
        );
        console.log("receiverUpdate: ", receiverUpdate);

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
