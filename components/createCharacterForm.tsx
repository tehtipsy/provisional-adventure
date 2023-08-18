import { FormEvent, useContext, useState } from "react";
import { GlobalContext } from "@/contexts/globalContext";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

type CreateCharacterFormProps = {
  onFormSubmit: () => void;
};

export const CreateCharacterForm = ({ onFormSubmit }: CreateCharacterFormProps) => {

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
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        finesse: {
          unmodifiedValue: parseInt(finesse),
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        constitution: {
          unmodifiedValue: parseInt(constitution),
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        focus: {
          unmodifiedValue: parseInt(focus),
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        willpower: {
          unmodifiedValue: parseInt(willpower),
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
        motivation: {
          unmodifiedValue: parseInt(motivation),
          t1: 0,
          t2: 0,
          t3: 0,
          t4: 0,
          bonus: 0,
        },
      },
      actionPoints: 0,
      equipment: {
        hands: {
          quantity: 1,
          damageRating: 1,
          damageType: ["Bludgeoning", "Slapping"],
          name: "Fist",
          //     // choose from items array
        },
        belt: {
          quantity: 1,
          damageRating: 2,
          damageType: ["Piercing", "Slashing"],
          name: "Short Sword",
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
      <div className="text-2xl m-6 text-center">{`${user}'s New Character`}</div>
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
