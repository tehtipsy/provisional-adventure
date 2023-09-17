import { useContext, useEffect, useRef } from "react";
import { TurnContext } from "@/contexts/turnContext";
import { GlobalContext } from "@/contexts/globalContext";
import useCharacterState from "@/utils/game/useCharacterState";
import { initActionPoints } from "@/utils/game/initActionPoints";
import { incramentActionPointsInDatabase } from "@/utils/game/incramentActionPointsInDatabase";
import { refetchActionPoints } from "@/utils/game/refetchActionPoints";
import { startNewRound } from "@/utils/game/startNewRound";
import { endTurn } from "@/utils/game/endTurn";

export default function useTotalPointsState() {
  const { user } = useContext(GlobalContext);
  const {
    roundCount,
    setRoundCount,
    totalActionPoints,
    setTotalActionPoints,
    setCurrentPlayer,
  } = useContext(TurnContext);
  const { character, totalFocus, actionPoints } = useCharacterState();

  if (character !== null && actionPoints !== undefined) {
    // clean this up
    const prevActionPointsRef = useRef(actionPoints);
    const prevTotalActionPointsRef = useRef(totalActionPoints);

    useEffect(() => {
      initActionPoints(totalFocus, actionPoints, user);
    }, [roundCount, user]);

    useEffect(() => {
      // sum everyone's action points at the start of each round in MongoDB Doc
      incramentActionPointsInDatabase({ totalActionPoints: totalFocus });
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
      if (prevActionPointsRef.current > 0 && actionPoints === 0) {
        const fetchTurnData = async () => {
          const currentPlayer = await endTurn(user);
          setCurrentPlayer(currentPlayer);
        };
        fetchTurnData();
      }
    }, [actionPoints]);

    useEffect(() => {
      prevActionPointsRef.current = actionPoints;
      prevTotalActionPointsRef.current = totalActionPoints;
    }, [roundCount, actionPoints, totalActionPoints]);
  }

  // return something?
  // return {
  //   totalActionPoints,
  //   roundCount,
  // };
}
