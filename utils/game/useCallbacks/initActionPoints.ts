import { useCallback } from "react";
import { updateCharacterSheet } from "@/utils/game/characterSheets";

export const initActionPoints = useCallback(
  async (character: any, characterFocus: number, user: string) => {
    if (character) {
      const initialData = {
        receiver: user,
        sender: user,
        actionPoints: character.current.characterSheet.actionPoints,
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
    }
  },
  []
);
