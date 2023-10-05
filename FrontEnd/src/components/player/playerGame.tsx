// import React from "react";
// import { useEffect } from "react";
import { WaitingPlayer } from "./waitingPlayer";
import { HoldGamePlayer } from "./holdGamePlayer";
import { useAppSelector } from "../../redux/hooks";
export const PlayerGame = () => {
  const playerSelector = useAppSelector((s) => s.player);
  return (
    <>
      {playerSelector.dataRoleGame._id === "" && <WaitingPlayer />}
      {playerSelector.dataRoleGame._id !== "" && <HoldGamePlayer />}
    </>
  );
};
