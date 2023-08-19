import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/contexts/globalContext";
import { CharacterSheet } from "@/components/characterSheet";
import { fetchCharacterSheet } from "@/utils/game/characterSheets";
import { CreateCharacterForm } from "@/components/createCharacterForm";
import BasePage from "@/components/base/basePage";
import Loading from "@/components/ui/loading";

interface CharacterSheetInterface {
  characterSheet: any;
}

const ManageCharacter: React.FC<{ isDisplayedInGame: boolean }> = (
  isDisplayedInGame
): JSX.Element => {
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

  return Object.keys(isDisplayedInGame).length === 1 ? (
    isLoading ? (
      <div className=" text-center w-auto bg-gray-300 dark:bg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded">
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
      </div>
    ) : character ? (
      <CharacterSheet character={character} />
    ) : (
      <CreateCharacterForm
        onFormSubmit={handleFormSubmit}
        fetchCharacterData={fetchCharacterData}
      />
    )
  ) : isLoading ? (
    <BasePage>
      <div className=" text-center w-auto bg-gray-300 dark:bg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded">
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
        <Loading />
      </div>
    </BasePage>
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
