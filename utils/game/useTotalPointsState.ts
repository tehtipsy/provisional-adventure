import { useContext, useEffect, useRef, useState } from "react";
import { TurnContext } from "@/contexts/turnContext";
import { GlobalContext } from "@/contexts/globalContext";
import useCharacterState from "@/utils/game/useCharacterState";
import { initActionPoints } from "@/utils/game/initActionPoints";
import { incramentActionPointsInDatabase } from "@/utils/game/incramentActionPointsInDatabase";
import { refetchActionPoints } from "@/utils/game/refetchActionPoints";
import { startNewRound } from "@/utils/game/startNewRound";

export default function useTotalPointsState() {
  const { user } = useContext(GlobalContext);
  const {
    roundCount,
    setRoundCount,
    totalActionPoints,
    setTotalActionPoints,
    setCurrentPlayer,
  } = useContext(TurnContext);
  const prevTotalActionPointsRef = useRef(totalActionPoints);
  const { character, totalFocus, actionPoints } = useCharacterState();
  const prevActionPointsRef = useRef(actionPoints);

  useEffect(() => {
    initActionPoints(totalFocus, actionPoints ? actionPoints : 0, user);
  }, [roundCount, user]);

  useEffect(() => {
    if (character !== null) {
      // sum everyone's action points at the start of each round in MongoDB Doc
      incramentActionPointsInDatabase({ totalActionPoints: totalFocus });
    }
  }, [roundCount]);

  useEffect(() => {
    const fetchData = async () => {
      const newTotal = await refetchActionPoints();
      setTotalActionPoints(newTotal);
    };
    fetchData();
  }, [roundCount]);

  useEffect(() => {
    if (prevTotalActionPointsRef.current > 0 && totalActionPoints === 0) {
      const newRoundCount = roundCount + 1;
      setRoundCount(newRoundCount);
      const fetchTurnData = async () => {
        const { currentPlayer, totalActionPoints } = await startNewRound(
          newRoundCount
        );
        setCurrentPlayer(currentPlayer);
        setTotalActionPoints(totalActionPoints);
      };
      fetchTurnData();
    }
  }, [roundCount, totalActionPoints]);

  useEffect(() => {
    prevActionPointsRef.current = actionPoints;
    prevTotalActionPointsRef.current = totalActionPoints;
  }, [roundCount]);

  // return something?
  // return {
  //   totalActionPoints,
  //   roundCount,
  // };
}
