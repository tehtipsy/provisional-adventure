import React, { useRef } from "react";
import { useCallback, useContext, useEffect, useState } from "react";

import { CharacterProps } from "@/utils/props/CharacterProps";

import { GlobalContext } from "@/contexts/globalContext";
import { TurnContext } from "@/contexts/turnContext";

import ManageCharacter from "@/pages/manage-character";
import BasePage from "@/components/base/basePage";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import EndTurnButton from "@/components/ui/endTurnButton";
import AttackOptions from "@/components/attackOptions";

import rollDice from "@/utils/game/rollDice";
import { updateCharacterSheet } from "@/utils/game/characterSheets";
import { useAblyChannel } from "@/utils/ably/useAblyChannel";
import { initActionPoints } from "@/utils/game/initActionPoints";
import { updateTurnPlayersInDatabase } from "@/utils/game/updateTurnPlayersInDatabase";

import Modal from "react-modal";
import { PokeNotification } from "@/components/pokeNotification";
import Loading from "@/components/ui/loading";
import { CharacterContext } from "@/contexts/characterContext";
import { ActionContext } from "@/contexts/actionContext";
import OnlineUsers from "@/components/game/onlineUsers";
import RollSelections from "@/components/game/rollSelections";
import { startNewRound } from "@/utils/game/startNewRound";

const Game: React.FC = () => {
  const { reciver, actionType } = useContext(ActionContext);
  const { channel, onlineUsers } = useAblyChannel();
  const { character, setCharacter } = useContext(CharacterContext);

  const handleStartNewRound = () => {
    startNewRound;
  };
  if (setCharacter) {
    return (
      <BasePage>
        <div className="flex justify-center text-center flex-col mt-4 md:flex-row md:space-x-8 md:mt-0">
          <div className="w-auto bg-gray-300 dark:bg-gray-900 flex flex-col m-6 p-6 space-y-6 rounded">
            <div className="text-white text-xl leading-8 dark:text-gray-300">
              <div className="flex justify-center items-center ">
                <Button
                  className="bg-red-500 hover:bg-red-700"
                  onClick={handleStartNewRound}
                >
                  {"Start New Round (testing)"}
                </Button>
              </div>
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
        <ManageCharacter
          // isRefreshNeeded={refreshNeeded}
          isDisplayedInGame={true}
          // setParentCharacter={setCharacter}
        />
        <div>{reciver && <div>{actionType}</div>}</div>
      </BasePage>
    );
  } else {return (<div>{"Game is Borked"}</div>)}
};

export default Game;
