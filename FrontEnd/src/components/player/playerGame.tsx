import React from "react";
import { WaitingPlayer } from "./waitingPlayer";
import { HoldGamePlayer } from "./holdGamePlayer";
import { useAppSelector } from "../../redux/hooks";

export const PlayerGame = () => {
  const playerSelector = useAppSelector((s) => s.player);
  return (
    <>
      {localStorage.getItem("idRoleGamePlayer") === null &&
        playerSelector.dataRoleGame._id === "" && <WaitingPlayer />}
      {(localStorage.getItem("idRoleGamePlayer") !== null ||
        playerSelector.dataRoleGame._id !== "") && <HoldGamePlayer />}
    </>
  );
};
