import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/contexts/globalContext";
import { TurnContext } from "@/contexts/turnContext";

import { useAblyChannel } from "@/utils/ably/useAblyChannel";
import { updateCharacterSheet } from "@/utils/game/characterSheets";

export default function useGameChannelsState() {
  const { user } = useContext(GlobalContext);
  const { channel } = useAblyChannel();
  const {
    roundCount,
    currentPlayer,
    totalActionPoints,
    setRoundCount,
    setCurrentPlayer,
    setTotalActionPoints,
  } = useContext(TurnContext);

  // Subscribe to Turn Change event
  useEffect(() => {
    channel?.subscribe("newRound", (message) => {
      const { roundCount, currentPlayer, totalActionPoints } = message.data;
      setRoundCount(roundCount);
      setCurrentPlayer(currentPlayer);
      setTotalActionPoints(totalActionPoints);
    });
  }, [channel, setRoundCount]);

  // Publish to Turn Change event
  useEffect(() => {
    channel?.publish("newRound", {
      roundCount,
      currentPlayer,
      totalActionPoints,
    });
  }, [channel, roundCount]);

  // Subscribe to "poke" event
  useEffect(() => {
    if (channel && user) {
      channel.subscribe("poke", async (message) => {
        const { sender } = message.data;
        if (sender === user) {
          const {
            // updatedSenderCharacterData: { value: senderValue },
            updatedCharacterData: { value: characterValue },
          } = await updateCharacterSheet(message.data); // Send a message to the receiver
          // setCharacter({ characterSheet: senderValue });
          channel.publish("update-complete", {
            updatedCharacterData: characterValue,
            sender: sender,
            receiver: message.data.receiver,
          });
        }
      });
    }
  }, [channel, user]);

  // Subscribe to Character Sheet "update-complete" Change event
  useEffect(() => {
    if (channel && user) {
      channel.subscribe("update-complete", (message) => {
        const { updatedCharacterData, sender, receiver } = message.data;
        if (receiver === user) {
          // setCharacter({ characterSheet: updatedCharacterData });
          // // set poke sender to display poke alert
          // setPokeSender(sender);
          // // display message to the user in the DOM
          // setPokeNotification(
          //   `You received a poke from ${sender}`
          // );
        }
      });
    }
  }, [channel, user]);

  return {
    channel,
  };
}