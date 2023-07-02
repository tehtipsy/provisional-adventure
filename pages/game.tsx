import Modal from "react-modal";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BasePage from "@/components/base/basePage";
import { GlobalContext } from "@/contexts/globalContext";
import * as Ably from "ably/promises";
import Loading from "@/pages/loading";
import Button from "@/components/ui/button";
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
                    <Button onClick={() => sendPoke(username)}>Poke</Button>
                  )}{" "}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <Modal
        className="h-1/2 w-1/2 flex justify-center items-center fixed inset-20"
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
