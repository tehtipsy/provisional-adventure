import { FormEvent, useContext, useState } from "react";
import { GlobalContext } from "@/contexts/globalContext";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useRouter } from "next/router";

type CreateCharacterFormProps = {
  onFormSubmit: () => void;
};

export const CreateCharacterForm = ({ onFormSubmit }: CreateCharacterFormProps) => {
  const router = useRouter();

  const { user } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [prowess, setProwess] = useState("");
  const [finesse, setFinesse] = useState("");
  const [constitution, setConstitution] = useState("");
  const [focus, setFocus] = useState("");
  const [willpower, setWillpower] = useState("");
  const [motivation, setMotivation] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Create the newSheet object
    const newSheet = {
      user_id: {}, // user.id
      name: user,
      characterName: name,
      attributes: {
        prowess: {
          unmodifiedValue: parseInt(prowess),
        },
        finesse: {
          unmodifiedValue: parseInt(finesse),
        },
        constitution: {
          unmodifiedValue: parseInt(constitution),
        },
        focus: {
          unmodifiedValue: parseInt(focus),
        },
        willpower: {
          unmodifiedValue: parseInt(willpower),
        },
        motivation: {
          unmodifiedValue: parseInt(motivation),
        },
      },
      actionPoints: 0,
      equipment: {
        hands: {
          //     // choose from items array
        },
        belt: {
          //     // choose from items array
        },
        quiver: {
          //     // choose from items array
        },
        backpack: {
          //     // choose from items array
        },
        armor: {
          head: {
            //     // choose from items array
          },
          chest: {
            //     // choose from items array
          },
          torso: {
            //     // choose from items array
          },
          gloves: {
            //     // choose from items array
          },
        },
      },
      statusEffects: {
        //   // choose from Effects array
      },
    };

    fetch("/api/db/character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newSheet: newSheet }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data)) // return Character Sheet MongoDB doc _id and save to user, set in global context
      .catch((error) => console.error("Error: ", error));

    onFormSubmit();
  };

  return (
    <>
      <div className="text-2xl m-6 text-center">{user}'s New Character</div>
      <form
        onSubmit={handleSubmit}
        className="w-auto bg-gray-300 dark:bg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded"
      >
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
        <Input
          onChange={(e) => setProwess(e.target.value)}
          placeholder="Enter Prowess"
        />
        <Input
          onChange={(e) => setFinesse(e.target.value)}
          placeholder="Enter Finesse"
        />
        <Input
          onChange={(e) => setConstitution(e.target.value)}
          placeholder="Enter Constitution"
        />
        <Input
          onChange={(e) => setFocus(e.target.value)}
          placeholder="Enter Focus"
        />
        <Input
          onChange={(e) => setWillpower(e.target.value)}
          placeholder="Enter Willpower"
        />
        <Input
          onChange={(e) => setMotivation(e.target.value)}
          placeholder="Enter Motivation"
        />
        <Button type="submit">Save New Character Sheet</Button>{" "}
      </form>
    </>
  );
};
