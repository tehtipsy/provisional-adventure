import React from "react";
import { useContext } from "react";
import { GlobalContext } from "@/contexts/globalContext";
import { TurnContext } from "@/contexts/turnContext";
import { CharacterContext } from "@/contexts/characterContext";
import { useAblyChannel } from "@/utils/ably/useAblyChannel";
import useSelectionState from "@/utils/game/useSelectionState";
import Button from "@/components//ui/button";
import PokeOnlineUser from "@/components/game/pokeOnlineUser";
import EndTurnButton from "@/components/ui/endTurnButton";
import { endTurn } from "@/utils/game/endTurn";

const OnlineUsers: React.FC = () => {
  const { user } = useContext(GlobalContext);
  const { currentPlayer } = useContext(TurnContext);
  const { onlineUsers } = useAblyChannel(); // move to TurnContext?
  const { character } = useContext(CharacterContext);
  const { pokeReceiver, handlePokeSelection } = useSelectionState();

  return (
    <div key={`online-users-component-div`}>
      <ul key={`online-users-ul`}>
        {onlineUsers.map((username) => {
          return (
            <div key={`${username}-li-div`}>
              <li key={`${username}-li`}>
                <div
                  key={`${username}-name`}
                  className={
                    username === currentPlayer
                      ? "animate-pulse flex justify-center items-center"
                      : "flex justify-center items-center"
                  }
                >
                  {username}
                  {username === user ? (
                    <p key={`${username}-you-tag`} className="px-6">
                      {" (you)"}
                    </p>
                  ) : username === currentPlayer ? (
                    <p key={`${username}-playing-tag`} className="px-6">
                      {" (now playing)"}
                    </p>
                  ) : user === currentPlayer ? (
                    pokeReceiver !== username && character ? (
                      <Button
                        key={`${username}-poke-button`}
                        className="px-6"
                        onClick={() => {
                          handlePokeSelection(username);
                        }}
                      >
                        {"Attack"}
                      </Button>
                    ) : (
                      <PokeOnlineUser key={`${username}-poke-component`} />
                    )
                  ) : null}
                </div>
              </li>
              <br />
            </div>
          );
        })}
      </ul>
      <div>
        {user === currentPlayer ? (
          <EndTurnButton endTurn={endTurn} username={user} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default OnlineUsers;
