import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import BasePage from "@/components/base/basePage";
import Loading from "@/components/ui/loading";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [character, setCharacter] = useState<CharacterSheetInterface | null>(
    null
  );

  const handleFormSubmit = () => {
    setIsSubmitted((prevState) => !prevState);
  };

  const fetchCharacterData = async () => {
    setIsLoading(true);
    const characterData = await fetchCharacterSheet(user);
    setCharacter(characterData);
    console.log(characterData);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    fetchCharacterData();
  }, [isSubmitted, router]);

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
      <CreateCharacterForm onFormSubmit={handleFormSubmit} />
    </BasePage>
  );
};

export default ManageCharacter;
