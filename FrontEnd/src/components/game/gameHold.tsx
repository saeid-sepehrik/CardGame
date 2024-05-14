/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { useEffect } from "react";
import { IGameRole, IRole } from "../../models/models";
import { setRoleWithRoleGame } from "../newGame/newGame.slice";
import { useTranslation } from "react-i18next";
import { setDataGameRoleFull } from "./game.slice";
import { setloading } from "./game.slice";
import { GameItem } from "./gameItem";

export const GameHold = () => {
  const gameSelector = useAppSelector((s) => s.game);
  const newGameSelector = useAppSelector((s) => s.newGame);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  //role
  useEffect(() => {
    if (
      newGameSelector.roleSelected.length === 0 &&
      gameSelector.dataRoleGame.length !== 0
    ) {
      dispatch(setRoleWithRoleGame(gameSelector.dataRoleGame));
    }
  }, [gameSelector.dataRoleGame]);

  ///roleGameFull
  useEffect(() => {
    if (
      newGameSelector.roleSelected.length !== 0 &&
      gameSelector.dataPlayer.length !== 0 &&
      gameSelector.dataRoleGame.every((f) => {
        if (f.id_user === "") return false;
        return true;
      })
    ) {
      const role: IRole[] = newGameSelector.roleSelected;
      const gameRole: IGameRole[] = gameSelector.dataRoleGame;
      const atemp = gameRole.map((m) => ({
        ...m,
        pic_path: role.filter((f) => f._id === m.id_role)[0].pic_path,
        color: role.filter((f) => f._id === m.id_role)[0].color,
        title: (role.filter((f) => f._id === m.id_role)[0] as any)[
          "title_" + i18n.language
        ],
        group: (role.filter((f) => f._id === m.id_role)[0] as any)[
          "group_" + i18n.language
        ],
        user_name: gameSelector.dataPlayer.filter((f) => f._id === m.id_user)[0]
          .name,
        edite: false,
        newMessage: false,
      }));
      dispatch(setDataGameRoleFull(atemp));
      dispatch(setloading(false));
    }
  }, [
    newGameSelector.roleSelected,
    gameSelector.dataPlayer,
    gameSelector.dataRoleGame,
  ]);

  return (
    <>
      <GameItem />
    </>
  );
};
