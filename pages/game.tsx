import { useCallback, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import BasePage from "@/components/base/basePage";

import { GlobalContext } from "@/contexts/globalContext";

import * as Ably from "ably/promises";
import { configureAbly } from "@ably-labs/react-hooks";

const Game: React.FC = () => {
  const router = useRouter();

  const { user, setUser } = useContext(GlobalContext);

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
      return;
    }
    // If not already connected to ably, connect
    if (ably === null) {
      const ably: Ably.Types.RealtimePromise = configureAbly({
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
    }
  }, [user, ably, channel, onlineUsers, handlePresenceMessage]);

  return (
    <BasePage>
      <div className="text-2xl m-6 text-center">
        <ul>
          {onlineUsers.map((username: string) => {
            return <li key={username}>{username} is Online</li>;
          })}
        </ul>
      </div>
    </BasePage>
  );
};

export default Game;
