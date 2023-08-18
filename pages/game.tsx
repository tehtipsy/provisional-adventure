import React from "react";
import { useCallback, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import * as Ably from "ably/promises";

import { GlobalContext } from "@/contexts/globalContext";
import { TurnContext } from "@/contexts/turnContext";

import {
  fetchCharacterSheet,
  updateCharacterSheet,
} from "@/utils/game/characterSheets";
import rollDice from "@/utils/game/rollDice";

import BasePage from "@/components/base/basePage";
import Modal from "react-modal";
import { PokeNotification } from "@/components/pokeNotification";
import Loading from "@/components/ui/loading";
import PokeButton from "@/components/ui/pokeButton";
import EndTurnButton from "@/components/ui/endTurnButton";
import { CharacterSheet } from "@/components/characterSheet";
import AttackOptions from "@/components/attackOptions";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

interface CharacterSheetInterface {
  characterSheet: any;
}

const Game: React.FC = () => {
  const router = useRouter();

  const { user } = useContext(GlobalContext);
  const { currentPlayer, setCurrentPlayer } = useContext(TurnContext);

  const [character, setCharacter] = useState<CharacterSheetInterface | null>(
    null
  );

  const [pokeSender, setPokeSender] = useState<string | null>(null);
  const [pokeReceiver, setPokeReceiver] = useState<string | null>(null);
  const [showPartSelection, setShowPartSelection] = useState(false);
  const [showAttackSelection, setShowAttackSelection] = useState(false);
  const [showAutoRollSelection, setShowAutoRollSelection] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [selectedDamageType, setSelectedDamageType] = useState<string | null>(
    null
  );
  const [numDiceToRoll, setNumDiceToRoll] = useState<number | null>(null);
  const [successfulRolls, setSuccessfulRolls] = useState<number | null>(null);

  const [pokeNotification, setPokeNotification] = useState<string | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [ably, setAbly] = useState<Ably.Types.RealtimePromise | null>(null);
  const [channel, setChannel] =
    useState<Ably.Types.RealtimeChannelPromise | null>(null);

  const handlePresenceMessage = useCallback(
    (message: Ably.Types.PresenceMessage) => {
      console.log(
        "handlePresenceMessage",
        message.action,
        message.clientId,
        new Date()
      );

      if (message.action === "enter" || message.action === "present") {
        setOnlineUsers((prev) => {
          if (prev.includes(message.clientId) === false) {
            return [...prev, message.clientId];
          } else {
            return prev;
          }
        });
      } else {
        // user has left
        setOnlineUsers((prev) =>
          prev.filter((username) => {
            const keep: boolean = username !== message.clientId;
            return keep;
          })
        );
      }
    },
    []
  );

  useEffect(() => {
    // The first requirement is to have a valid username
    // to be used as the Ably clientId
    if (!user) {
      // redirect to User Form
      router.push("/");
      return async () => {
        await channel?.presence.leave();
        channel?.presence.unsubscribe();
        ably?.close();
        setChannel(null);
        setAbly(null);
      };
    }
    // If not already connected to ably, connect
    if (ably === null) {
      const ably = new Ably.Realtime.Promise({
        authUrl: "/api/authentication/token-auth",
        authMethod: "POST",
        clientId: user,
      });

      ably.connection.on((stateChange: Ably.Types.ConnectionStateChange) => {
        console.log(stateChange);
      });

      setAbly(ably);
    }

    if (ably === null) return;

    // If not already subscribed to a channel, subscribe
    if (channel === null) {
      const _channel: Ably.Types.RealtimeChannelPromise =
        ably.channels.get("game");
      setChannel(_channel);

      // Note: the 'present' event doesn't always seem to fire
      // so we use presence.get() later to get the initial list of users
      // _channel.presence.subscribe(['present', 'enter', 'leave'], handlePresenceMessage)
      _channel.presence.subscribe(["enter", "leave"], handlePresenceMessage);

      const getExistingMembers = async () => {
        const messages = await _channel.presence.get();
        messages.forEach(handlePresenceMessage);
      };
      getExistingMembers();

      _channel.presence.enter();

      return () => {};
    }
  }, [router, user, ably, channel, onlineUsers, handlePresenceMessage]);

  const fetchCharacterData = useCallback(async () => {
    const characterData = await fetchCharacterSheet(user);
    setCharacter(characterData);
    console.log(characterData);
  }, [user]);

  useEffect(() => {
    fetchCharacterData();
  }, [fetchCharacterData]);

  // Subscribe to Turn "currentPlayer" Change event
  useEffect(() => {
    if (channel) {
      channel.subscribe("currentPlayer", (message) => {
        setCurrentPlayer(message.data);
      });
    }
  }, [channel, setCurrentPlayer]);

  // Subscribe to "poke" event
  useEffect(() => {
    if (channel && user) {
      channel.subscribe("poke", async (message) => {
        const {
          tier,
          damageType,
          bodyPart,
          action,
          sender,
          receiver,
          timestamp,
        } = message.data;

        if (sender === user) {
          const data = {
            receiver: receiver,
            sender: sender,
            action: action,
            tier: tier,
            bodyPart: bodyPart,
            damageType: damageType,
          };

          const updatedCharacterData = await updateCharacterSheet(data);
          console.log(updatedCharacterData); // sender and reciver sheets
          console.log(updatedCharacterData.updatedSenderCharacterData.value);
          setCharacter({
            characterSheet:
              updatedCharacterData.updatedSenderCharacterData.value,
          });

          // Send a message to the receiver
          channel.publish("update-complete", {
            updatedCharacterData:
              updatedCharacterData.updatedCharacterData.value,
            timestamp: timestamp,
            sender: sender,
            receiver: receiver,
          });
        }
      });
    }
  }, [channel, user]);

  // Subscribe to Character Sheet "update-complete" Change event
  useEffect(() => {
    if (channel && user) {
      channel.subscribe("update-complete", (message) => {
        const { updatedCharacterData, timestamp, sender, receiver } =
          message.data;
        if (receiver === user) {
          console.log(
            "Updated Character Sheet Recived from attacker: ",
            updatedCharacterData
          );
          setCharacter({ characterSheet: updatedCharacterData });
          // set poke sender to display poke alert
          setPokeSender(sender);
          // display message to the user in the DOM
          console.log(`You received a poke from ${sender}`);
          setPokeNotification(
            `${timestamp} - You received a poke from ${sender}`
          );
          setIsModalOpen(true);
        }
      });
    }
  }, [channel, user]);

  const updateTurnInDatabase = useCallback(async () => {
    // Post Online Users To turn MongoDB Doc
    await fetch("/api/db/turn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ players: onlineUsers }),
    });
  }, [onlineUsers]);

  useEffect(() => {
    if (onlineUsers.length > 0) {
      updateTurnInDatabase();
    }
  }, [onlineUsers, updateTurnInDatabase]);

  const sendPoke = useCallback(
    (receiver: string, tier: number) => {
      console.log("Tier in sendPoke: ", tier);
      console.log("Selected Body Part in sendPoke: ", selectedBodyPart);
      console.log("Selected Damage Type in sendPoke: ", selectedDamageType);

      const characterSheet = character?.characterSheet;
      const weaponName = characterSheet.equipment.hands.name;

      channel?.publish("poke", {
        action: "attack", // add choice
        receiver,
        tier: tier,
        sender: user,
        bodyPart: selectedBodyPart,
        damageType: selectedDamageType,
        weapon: weaponName,
        timestamp: new Date().toISOString(),
      });
    },
    [channel, user, selectedBodyPart, selectedDamageType, character] // , action]
  );

  useEffect(() => {
    if (pokeReceiver && successfulRolls !== null) {
      sendPoke(pokeReceiver, successfulRolls);
      setPokeReceiver(null);
    }
  }, [successfulRolls, pokeReceiver, sendPoke]);

  const endTurn = async (user: string) => {
    const data = {
      name: "endTurn",
      username: user,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch("/api/db/turn-action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    if (result.success) {
      channel?.publish("currentPlayer", result.currentPlayer);
    }
  };

  const handleDiceRolls = (choice: string) => {
    const characterSheet = character?.characterSheet;
    const handsSlot = characterSheet.equipment.hands;

    const damageRating = handsSlot.damageRating;

    const characterProwess = characterSheet.attributes.prowess;
    const attackProwess =
      characterProwess.unmodifiedValue +
      characterProwess.t1 +
      characterProwess.t2 +
      characterProwess.t3 +
      characterProwess.t4 +
      characterProwess.bonus;
    console.log("attackProwess value: ", attackProwess);

    const numDice = attackProwess + damageRating;
    setNumDiceToRoll(numDice);
    console.log("numDice: ", numDice);

    if (choice !== "Manual") {
      // get tier from dice roll
      const tier = rollDice(numDice);
      setSuccessfulRolls(tier);
    }
  }; // useEffect [character, ???] ???

  // handleDiceRolls choice === "Auto":
  const handleDiceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tier = parseInt(event.target.value, 10);
    console.log("Dice Above 5 Input: ", tier);
    setTimeout(() => setSuccessfulRolls(tier), 1000);
  };

  function handlePartSelection(bodyPart: string) {
    setSelectedBodyPart(bodyPart);
    setShowPartSelection(false);
    setShowAttackSelection(true);
  }

  function handleAttackSelection(attack: string) {
    setSelectedDamageType(attack);
    setShowAttackSelection(false);
    setShowAutoRollSelection(true);
  }

  const handleRollSelection = (choice: string) => {
    handleDiceRolls(choice);
    setShowAutoRollSelection(false);
  };

  const handleClearRolls = () => {
    setSuccessfulRolls(null);
    setNumDiceToRoll(null);
  };

  return (
    <BasePage>
      <div className="text-2xl m-6 text-center">
        {onlineUsers.length === 0 ? (
          <>
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </>
        ) : (
          <>
            <>
              <div className="flex justify-center">
                {user === currentPlayer ? (
                  <EndTurnButton endTurn={endTurn} username={user} />
                ) : (
                  ""
                )}
              </div>
              <br />
            </>
            <ul>
              {onlineUsers.map((username: string) => {
                return (
                  <React.Fragment key={username}>
                    <li>
                      <div
                        className={
                          username === currentPlayer ? "animate-pulse" : ""
                        }
                      >
                        {username}
                        {username === user ? (
                          " (you)"
                        ) : username === currentPlayer ? (
                          " (now playing)"
                        ) : user === currentPlayer ? (
                          pokeReceiver !== username ? (
                            <PokeButton
                              onPoke={() => {
                                setPokeReceiver(username);
                                setShowPartSelection(true);
                                handleClearRolls();
                              }}
                            />
                          ) : showPartSelection ? (
                            <AttackOptions
                              options={["Head", "Torso", "Limbs"]}
                              onOptionSelection={handlePartSelection}
                            />
                          ) : showAttackSelection ? (
                            character &&
                            character.characterSheet.equipment.hands
                              .damageType && (
                              <AttackOptions
                                options={
                                  character.characterSheet.equipment.hands
                                    .damageType
                                }
                                onOptionSelection={handleAttackSelection}
                              />
                            )
                          ) : showAutoRollSelection ? (
                            <AttackOptions
                              options={["Auto", "Manual"]}
                              onOptionSelection={handleRollSelection}
                            />
                          ) : null
                        ) : null}
                      </div>
                    </li>
                    <br />
                  </React.Fragment>
                );
              })}
            </ul>
          </>
        )}
        <div>
          {numDiceToRoll && <div>Number Of Dice To Roll: {numDiceToRoll}</div>}
        </div>
        <div>
          {numDiceToRoll && successfulRolls === null && (
            <div>
              Enter the Number Of Dice 5 or Above:
              <Input
                placeholder="0"
                type="number"
                min={1}
                max={99}
                onChange={handleDiceInput}
              />{" "}
            </div>
          )}
        </div>
        <div>
          {successfulRolls !== null && successfulRolls !== undefined && (
            <div>Number Of Rolls 5 and above: {successfulRolls}</div>
          )}
        </div>
        {numDiceToRoll &&
          successfulRolls !== null &&
          successfulRolls !== undefined && (
            <div>
              <Button
                className="bg-red-500 hover:bg-red-700"
                onClick={handleClearRolls}
              >
                Clear Rolls
              </Button>
            </div>
          )}
      </div>
      <CharacterSheet character={character} />
      <Modal
        className="h-0 w-1/2 flex justify-center items-center fixed inset-20"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-30"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        {pokeSender && <PokeNotification sender={pokeSender} />}
      </Modal>
      <div>{pokeNotification && <div>{pokeNotification}</div>}</div>
    </BasePage>
  );
};

export default Game;
