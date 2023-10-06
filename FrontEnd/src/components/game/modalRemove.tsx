import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import {
  IGameRoleFull,
  setCountActivePlayer,
  updateRoleGame,
} from "./game.slice";
import { Modal, Rate } from "antd";

export interface ModalRemoveProps {
  GameRoleFullModalRemove?: IGameRoleFull;
  setGameRoleFullModalRemove: (GameRoleFullModalMessage: any) => void;
}

export const ModalRemove = ({
  GameRoleFullModalRemove,
  setGameRoleFullModalRemove,
}: ModalRemoveProps) => {
  const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false);
  const [rateValue, setrateValue] = useState(0);
  const dispatch = useAppDispatch();
  const gameSelector = useAppSelector((s) => s.game);

  useEffect(() => {
    if (GameRoleFullModalRemove !== undefined) {
      setIsModalRemoveOpen(true);
    }
  }, [GameRoleFullModalRemove]);

  const handleOkModalRemove = () => {
    if (GameRoleFullModalRemove) {
      const tempRoleGame = gameSelector.dataRoleGame
        .filter((f) => f._id === GameRoleFullModalRemove._id)
        .map((roleGame) => {
          return {
            ...roleGame,
            score: rateValue,
            status: 3,
          };
        });
      dispatch(
        updateRoleGame({ data: tempRoleGame[0], updateGameRoleFull: true })
      );
      dispatch(setCountActivePlayer());
    }
    setrateValue(0);
    setGameRoleFullModalRemove(undefined);
    setIsModalRemoveOpen(false);
  };

  const handleCancelModalRemove = () => {
    setIsModalRemoveOpen(false);
    setrateValue(0);
    setGameRoleFullModalRemove(undefined);
  };
  return (
    <>
      <Modal
        title={`Are you sure to Remove ${GameRoleFullModalRemove?.user_name}`}
        open={isModalRemoveOpen}
        onOk={handleOkModalRemove}
        onCancel={handleCancelModalRemove}
      >
        <p>How much do you rate {GameRoleFullModalRemove?.user_name}?</p>
        <Rate
          onChange={(value) => {
            setrateValue(value);
          }}
          value={rateValue}
        />
      </Modal>
    </>
  );
};
