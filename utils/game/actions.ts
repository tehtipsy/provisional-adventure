// const sendPoke = (receiver: string) => {
//   // set weapon damageType and damageRating in UI
//   const characterSheet = character?.characterSheet;
//   const handsSlot = characterSheet.equipment.hands;
//   const damageType = handsSlot.damageType[0];
//   const damageRating = handsSlot.damageRating;

//   channel?.publish("poke", {
//     sender: user,
//     receiver,
//     timestamp: new Date().toISOString(),
//     action: "attack",
//     bodyPart: "Torso",
//     damageType: damageType,
//     damageRating: damageRating,
//   });
// };

// const endTurn = async (user: string) => {
//   const data = {
//     name: "endTurn",
//     username: user,
//     timestamp: new Date().toISOString(),
//   };

//   const response = await fetch("/api/db/turn-action", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const result = await response.json();
//   console.log(result);
//   if (result.success) {
//     channel?.publish("currentPlayer", result.currentPlayer);
//   }
// };
