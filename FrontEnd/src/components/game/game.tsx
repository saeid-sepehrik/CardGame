/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAlluser, setGame } from "./game.slice";
import { useEffect } from "react";
import { WaitingGame } from "./waitingGame";
import { GameHold } from "./gameHold";

export const Game = () => {
  // const [getNewData, setgetNewData] = useState(false);
  const dispatch = useAppDispatch();
  const gameSelector = useAppSelector((s) => s.game);

  // useEffect(() => {
  //   if (gameSelector.codeGame === 0) {
  //     setgetNewData(true);
  //   }
  // }, [gameSelector.codeGame]);

  //////game
  useEffect(() => {
    if (!gameSelector.receivedGame) dispatch(setGame());
    dispatch(setAlluser());
  }, []);

  return (
    <>
      {gameSelector.dataGame.status === 1 && <WaitingGame />}
      {(gameSelector.dataGame.status === 2 ||
        gameSelector.dataGame.status === 3) && <GameHold />}
    </>
  );
};
