import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import BasePage from "@/components/base/basePage";
import Loading from "@/components/ui/loading";
import { GlobalContext } from "@/contexts/globalContext";
import { CharacterSheet } from "@/components/characterSheet";
import { fetchCharacterSheet } from "@/utils/game/characterSheets";
import { CreateCharacterForm } from "@/components/createCharacterForm";

interface CharacterSheetInterface {
  characterSheet: any;
}

const ManageCharacter: React.FC = () => {
  const router = useRouter();

  const { user } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState<CharacterSheetInterface | null>(
    null
  );

  const handleFormSubmit = () => {
    setIsLoading((prevState) => !prevState);
  };

  const fetchCharacterData = useCallback(async () => {
    setIsLoading(true);
    const characterData = await fetchCharacterSheet(user);
    setCharacter(characterData);
    console.log(characterData);
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    fetchCharacterData();
  }, [router, user, fetchCharacterData]);

  return isLoading ? (
    <>
      <BasePage>
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
      </BasePage>
    </>
  ) : character ? (
    <BasePage>
      <CharacterSheet character={character} />
    </BasePage>
  ) : (
    <BasePage>
      <CreateCharacterForm
        onFormSubmit={handleFormSubmit}
        fetchCharacterData={fetchCharacterData}
      />
    </BasePage>
  );
};

export default ManageCharacter;
