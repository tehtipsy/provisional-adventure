import { useState, useCallback, useEffect } from "react";
import * as Ably from "ably/promises";
import { updateTurnPlayersInDatabase } from "@/utils/game/updateTurnPlayersInDatabase";

export const useOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

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
    if (onlineUsers.length > 0) {
      updateTurnPlayersInDatabase(onlineUsers);
    }
  }, [onlineUsers]);

  return { onlineUsers, handlePresenceMessage };
};
