import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "@/contexts/globalContext";
import { CharacterSheet } from "@/components/characterSheet";
import { fetchCharacterSheet } from "@/utils/game/characterSheets";
import { CreateCharacterForm } from "@/components/createCharacterForm";
import BasePage from "@/components/base/basePage";
import Loading from "@/components/ui/loading";
import { CharacterContext } from "@/contexts/characterContext";

const ManageCharacter: React.FC<{
  isDisplayedInGame: boolean;
}> = ({ isDisplayedInGame }): JSX.Element => {
  const router = useRouter();

  const { user } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);

  const { character, setCharacter } = useContext(CharacterContext);

  const handleFormSubmit = (newSheet: any) => {
    console.log("new sheet to be saved in DB: ", newSheet);

    fetch("/api/db/character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newSheet: newSheet }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No Response From character DB Endpoint");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // return Character Sheet MongoDB doc _id and save to user, set in global context
        fetchCharacterData(); // Refetch character data after successful form submission
      })
      .catch((error) => console.error("Error: ", error));

    setIsLoading((prevState) => !prevState);
  };

  const fetchCharacterData = useCallback(async () => {
    setIsLoading(true);
    const characterData = await fetchCharacterSheet(user);
    if (setCharacter) {
      setCharacter(characterData);
    } else {
      throw new Error("setCharacter is not provided by CharacterContext");
    }
    console.log(characterData);
    setIsLoading(false);
  }, [
    user,
    setCharacter,
  ]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    fetchCharacterData();
  }, [router, user, fetchCharacterData]);

  return isDisplayedInGame ? (
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
      <CharacterSheet />
    ) : (
      <CreateCharacterForm onFormSubmit={handleFormSubmit} />
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
      <CharacterSheet />
    </BasePage>
  ) : (
    <BasePage>
      <CreateCharacterForm onFormSubmit={handleFormSubmit} />
    </BasePage>
  );
};

export default ManageCharacter;
