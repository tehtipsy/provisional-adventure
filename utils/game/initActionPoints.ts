import { updateCharacterSheet } from "@/utils/game/characterSheets";

export const initActionPoints = 
  async (actionPoints: number, characterFocus: number, user: string) => {
    // if (actionPoints || actionPoints === 0) {
    const initialData = {
      receiver: user,
      sender: user,
      actionPoints: actionPoints,
      action: "subtractActionPoints",
    };

    await updateCharacterSheet(initialData);

    const data = {
      receiver: user,
      sender: user,
      actionPoints: characterFocus,
      action: "addActionPoints",
    };

    const updatedCharacterData = await updateCharacterSheet(data);
    console.log(updatedCharacterData); // sender and reciver sheets
    return updatedCharacterData;
    // }
  };