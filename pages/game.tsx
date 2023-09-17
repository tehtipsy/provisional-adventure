import React, { useEffect } from "react";
import BasePage from "@/components/base/basePage";
import ManageCharacter from "@/pages/manage-character";
import OnlineUsers from "@/components/game/onlineUsers";
import RollSelections from "@/components/game/rollSelections";
import useGameChannelsState from "@/utils/game/useGameChannelsState";
import { startNewRound } from "@/utils/game/startNewRound";
// garbaje
import { useContext } from "react";
import { TurnContext } from "@/contexts/turnContext";
import Button from "@/components/ui/button";
import Loading from "@/components/ui/loading";

const Game: React.FC = () => {
  const { onlineUsers } = useGameChannelsState();

  // round count manual override
  const { roundCount, setRoundCount } = useContext(TurnContext);

  useEffect(() => {
    console.log(roundCount);
  }, [roundCount]);

  const handleStartNewRound = () => {
    if (setRoundCount && (roundCount || roundCount === 0)) {
      console.log(roundCount);
      const newRoundCount = roundCount + 1;
      startNewRound(newRoundCount);
      setRoundCount(newRoundCount);
    }
  };

  //

  return (
    <BasePage>
      <div className="flex justify-center items-center ">
        <Button
          className="bg-red-500 hover:bg-red-700"
          onClick={handleStartNewRound}
        >
          {`Start New Round round count is: ${roundCount}`}
        </Button>
      </div>
      <div className="flex justify-center text-center flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
        <div className="w-auto bg-gray-300 dark:bg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded">
          <div className="text-white text-xl leading-8 dark:text-gray-300">
            <h1>{"Online Users"}</h1>
          </div>
          {onlineUsers.length === 0 ? (
            <div className="text-center w-auto bg-gray-300 dark:bg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded">
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </div>
          ) : (
            <OnlineUsers />
          )}
          <RollSelections />
        </div>
      </div>
      <ManageCharacter isDisplayedInGame={true} />
    </BasePage>
  );
};

export default Game;
