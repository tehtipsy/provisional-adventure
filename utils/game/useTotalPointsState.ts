import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "@/contexts/globalContext";
import { CharacterContext } from "@/contexts/characterContext";
import { TurnContext } from "@/contexts/turnContext";
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
  const { character, setCharacter, totalFocus, actionPoints } =
    useContext(CharacterContext);

  const prevActionPointsRef = useRef(actionPoints);
  const prevTotalActionPointsRef = useRef(totalActionPoints);

  useEffect(() => {
    if (
      (totalFocus || totalFocus === 0) &&
      (actionPoints || actionPoints === 0)
    ) {
      const fetchData = async () => {
        const newSheets = await initActionPoints(
          actionPoints,
          totalFocus,
          user
        );
        if (setCharacter)
          setCharacter({
            characterSheet: newSheets.updatedSenderCharacterData.value,
          });
      };
      fetchData();
    }
  }, [roundCount]);

  useEffect(() => {
    // sum everyone's action points at the start of each round in MongoDB Doc
    if (totalFocus || totalFocus === 0)
      incramentActionPointsInDatabase({ totalActionPoints: totalFocus });
  }, [character]); // WHEN?

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const newTotal = await refetchActionPoints();
  //     if (setTotalActionPoints) setTotalActionPoints(newTotal);
  //   };
  //   fetchData();
  // }, [roundCount]); // WHEN?

  useEffect(() => {
    if (
      prevTotalActionPointsRef.current &&
      prevTotalActionPointsRef.current > 0 &&
      totalActionPoints === 0
    ) {
      if (roundCount || roundCount === 0) {
        const newRoundCount = roundCount + 1;
        if (setRoundCount) setRoundCount(newRoundCount);
        const fetchTurnData = async () => {
          const { currentPlayer, totalActionPoints } = await startNewRound(
            newRoundCount
          );
          if (setCurrentPlayer) setCurrentPlayer(currentPlayer);
          if (setTotalActionPoints) setTotalActionPoints(totalActionPoints);
        };
        fetchTurnData();
      }
    }
  }, [totalActionPoints]);

  useEffect(() => {
    if (
      prevActionPointsRef.current &&
      prevActionPointsRef.current > 0 &&
      actionPoints === 0
    ) {
      const fetchTurnData = async () => {
        const nextPlayer = await endTurn(user);
        if (setCurrentPlayer) setCurrentPlayer(nextPlayer);
      };
      fetchTurnData();
    }
  }, [actionPoints]);

  useEffect(() => {
    prevActionPointsRef.current = actionPoints;
  }, [roundCount, actionPoints]);

  useEffect(() => {
    prevTotalActionPointsRef.current = totalActionPoints;
  }, [roundCount, totalActionPoints]);

  // return something?
}
