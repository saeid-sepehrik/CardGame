import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGame, setPlayer, setRoleGame } from "./game.slice";
import { useEffect } from "react";
import { WaitingGame } from "./waitingGame";
import { GameHold } from "./gameHold";

export const Game = () => {
  const dispatch = useAppDispatch();
  const gameSelector = useAppSelector((s) => s.game);

  useEffect(() => {
    if (gameSelector.dataGame.code === 0) dispatch(setGame());
    if (gameSelector.dataPlayer.length === 0) dispatch(setPlayer());
    if (gameSelector.dataRoleGame.length === 0) dispatch(setRoleGame());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {gameSelector.dataGame.status === 1 && <WaitingGame />}
      {gameSelector.dataGame.status === 3 && <GameHold />}
    </>
  );
};
