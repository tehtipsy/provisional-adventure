import { useEffect, useState } from "react";

type CharacterSheetProps = {
  user: string;
  refetch: boolean;
}

interface CharacterSheetInterface {
  characterSheet: any;
}

export const CharacterSheet = ({ user, refetch }: CharacterSheetProps) => {
  const [character, setCharacter] = useState<CharacterSheetInterface | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const characterData = await myCharacterSheet(user);
      setCharacter(characterData);
      console.log(characterData);
    };
    fetchData();
  }, [refetch]);

  const myCharacterSheet = async (user: string) => {
    const response = await fetch(`/api/db/character?name=${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const characterData = await response.json();
    if (characterData.message) {
      console.log(characterData.message);
      return null;
    }
    return characterData;
  };

  return (
    <div className="text-2xl m-6 text-center">
      {character && character.characterSheet.name && (
        <div>
          <h1>Action Points {character.characterSheet.actionPoints}</h1>
          <br />
          <p>Character Name: {character.characterSheet.name}</p>
          <br />
          <p>Attributes:</p>
          <br />
          <ul>
            {Object.keys(character.characterSheet.attributes).map(
              (attribute) => (
                <li key={attribute}>
                  {attribute}{" "}
                  {
                    character.characterSheet.attributes[attribute]
                      .unmodifiedValue
                  }
                </li>
              )
            )}
          </ul>
          <br />
          <p>Equipment:</p>
          <br />
          <ul>
            {Object.keys(character.characterSheet.equipment).map(
              (equipment) => (
                <li key={equipment}>
                  {character.characterSheet.equipment[equipment].quantity}
                  {" * "}
                  {equipment}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};  
