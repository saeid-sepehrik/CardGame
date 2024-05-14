import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { IGameRoleFull, updateRoleGame } from "./game.slice";
import { Button, Modal, Rate } from "antd";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
            newMessage: false,
          };
        });
      dispatch(
        updateRoleGame({ data: tempRoleGame[0], updateGameRoleFull: true })
      );
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
        title={t("gameItem.confirmRemoveUSer")}
        open={isModalRemoveOpen}
        onOk={handleOkModalRemove}
        onCancel={handleCancelModalRemove}
        footer={[
          <Button key="back" onClick={handleCancelModalRemove}>
            {t("button.cancel")}
          </Button>,
          <Button
            key="submit"
            style={{ backgroundColor: "green" }}
            type="primary"
            onClick={handleOkModalRemove}
          >
            {t("button.submit")}
          </Button>,
        ]}
      >
        <p>{GameRoleFullModalRemove?.user_name}</p>
        <p>{t("gameItem.rateUSer")}</p>
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
