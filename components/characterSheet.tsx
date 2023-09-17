import { useContext } from "react";
import { CharacterContext } from "@/contexts/characterContext";
import SheetAttributes from "@/components/sheetAttributes";
import SheetInventory from "@/components/sheetInventory";
import SheetEffects from "@/components/sheetEffects";

export const CharacterSheet: React.FC = (): JSX.Element => {
  const {
    character,
    characterName,
    characterEncumbrance,
    actionPoints, // move to action something
  } = useContext(CharacterContext);

  if (character) {
    return (
      <div className="flex justify-center flex-row space-x-8 mt-0">
        <div className="text-center w-autobg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded">
          <div className="text-center text-xl leading-8 text-gray-300">
            <h1>{`Character Sheet`}</h1>
          </div>
          <div>
            <h1>{`Action Points ${actionPoints}`}</h1>
            <p>{`Character Name: ${characterName}`}</p>
            <p>{`Character Encumbrance: ${characterEncumbrance}`}</p>
            <SheetAttributes />
            <SheetInventory />
            <SheetEffects />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>{"No Character Loaded in CharacterContext"}</div>;
  }
};
