import React from "react";
import { useContext } from "react";
import { GlobalContext } from "@/contexts/globalContext";
import { TurnContext } from "@/contexts/turnContext";
import { CharacterContext } from "@/contexts/characterContext";
import { useAblyChannel } from "@/utils/ably/useAblyChannel";
import useSelectionState from "@/utils/game/useSelectionState";
import Button from "@/components//ui/button";
import PokeOnlineUser from "@/components/game/pokeOnlineUser";

const OnlineUsers: React.FC = () => {
  const { user } = useContext(GlobalContext);
  const { currentPlayer } = useContext(TurnContext);
  const { onlineUsers } = useAblyChannel(); // move to TurnContext?
  const { character } = useContext(CharacterContext);
  const { pokeReceiver, handlePokeSelection } = useSelectionState();

  return (
    <div>
      <ul>
        {onlineUsers.map((username) => {
          return (
            <React.Fragment key={username}>
              <li>
                <div
                  className={
                    username === currentPlayer
                      ? "animate-pulse flex justify-center items-center"
                      : "flex justify-center items-center"
                  }
                >
                  {username}
                  {username === user ? (
                    <p className="px-6">{" (you)"}</p>
                  ) : username === currentPlayer ? (
                    <p className="px-6">{" (now playing)"}</p>
                  ) : user === currentPlayer ? (
                    pokeReceiver !== username && character ? (
                      <p className="px-6">
                        <Button
                          onClick={() => {
                            handlePokeSelection(username);
                          }}
                        >
                          {"Attack"}
                        </Button>
                      </p>
                    ) : (
                      <PokeOnlineUser />
                    )
                  ) : null}
                </div>
              </li>
              <br />
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default OnlineUsers;
