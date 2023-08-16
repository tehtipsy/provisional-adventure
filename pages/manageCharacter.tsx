import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import BasePage from "@/components/base/basePage";
import { GlobalContext } from "@/contexts/globalContext";
import { fetchMyCharacterSheet } from "@/utils/game/characterSheets";
import { CharacterSheet } from "@/components/characterSheet";

interface CharacterSheetInterface {
  characterSheet: any;
}

const ManageCharacter: React.FC = () => {
  const router = useRouter();

  const { user } = useContext(GlobalContext);

  const [character, setCharacter] = useState<CharacterSheetInterface | null>(
    null
  );
  
  const fetchCharacterData = async () => {
    const characterData = await fetchMyCharacterSheet(user);
    setCharacter(characterData);
    console.log(characterData);
  };
  
  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    fetchCharacterData();
  },[])

  return (
    <BasePage>
      <CharacterSheet character={character} />
    </BasePage>
  );
};

export default ManageCharacter;
