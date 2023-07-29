import Modal from "react-modal";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BasePage from "@/components/base/basePage";
import { GlobalContext } from "@/contexts/globalContext";
import * as Ably from "ably/promises";
import Loading from "@/pages/loading";
import PokeButton from "@/components/ui/pokeButton";
import EndTurnButton from "@/components/ui/endTurnButton";
import { PokeNotification } from "@/components/pokeNotification";

const Game: React.FC = () => {
  const router = useRouter();

  const { user } = useContext(GlobalContext);

  const [pokeSender, setPokeSender] = useState<string | null>(null);
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

      // Subscribe to poke event
      _channel.subscribe("poke", (message) => {
        const { sender, receiver, timestamp } = message.data;
        if (receiver === user) {
          // display message to the user
          setPokeSender(sender);
          console.log(`You received a poke from ${sender}`);
          setPokeNotification(
            `${timestamp} - You received a poke from ${sender}`
          );
          setIsModalOpen(true);
        }
      });

      const getExistingMembers = async () => {
        const messages = await _channel.presence.get();
        messages.forEach(handlePresenceMessage);
      };
      getExistingMembers();

      _channel.presence.enter();

      return () => {};
    }
  }, [user, ably, channel, onlineUsers, handlePresenceMessage]);

  const sendPoke = (receiver: string) => {
    channel?.publish("poke", {
      sender: user,
      receiver,
      timestamp: new Date().toISOString(),
    });
  };

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
  };

  return (
    <BasePage>
      <div className="text-2xl m-6 text-center">
        {onlineUsers.length === 0 ? (
          <Loading />
        ) : (
          <ul>
            {onlineUsers.map((username: string) => {
              return (
                <li key={username}>
                  {username} is Online
                  {username === user ? (
                    " (you)"
                  ) : (
                    <PokeButton sendPoke={sendPoke} username={username} />
                  )}{" "}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="flex justify-center">
        <EndTurnButton endTurn={endTurn} username={user} />
      </div>
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
