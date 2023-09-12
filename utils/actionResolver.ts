import { fetchAttackObject } from "@/utils/game/attacksConfig";
import {
  ActionResolverProps,
  UpdatesProps,
} from "@/utils/props/ActionResolverProps";

export async function actionResolver({
  sender,
  receiver,
  action,
  item,
  damageType,
  tier,
  bodyPart,
  actionPoints,
}: ActionResolverProps): Promise<UpdatesProps> {
  console.log(
    "Payload in actionResolver: ",
    sender,
    receiver,
    action,
    damageType,
    bodyPart,
    tier
  );
  console.log("Action Points in actionResolver: ", actionPoints);
  console.log("Weapon in actionResolver: ", item);

  const update: UpdatesProps = {
    receiverUpdate: {},
    senderUpdate: {},
  };

  if (action === "subtractActionPoints") {
    update.senderUpdate["actionPoints"] = -actionPoints;
  }

  if (action === "addActionPoints") {
    update.senderUpdate["actionPoints"] = actionPoints;
  }

  if (action === "attack") {
    const chosenAttack = await fetchAttackObject(damageType, bodyPart);
    console.log("chosenAttack in actionResolver: ", chosenAttack);
    update.senderUpdate["actionPoints"] = -1; // change to action points parameter
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
