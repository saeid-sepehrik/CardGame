import { Avatar, Card, FloatButton, Modal, Rate } from "antd";
import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import {
  IGameRoleFull,
  setCountActivePlayer,
  updateRoleGame,
} from "./game.slice";
import { LogoutOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";

export const GameItem = () => {
  const gameSelector = useAppSelector((s) => s.game);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setCountActivePlayer());
  }, [dispatch, gameSelector.dataRoleGameFull]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rateValue, setrateValue] = useState(0);
  const [GameRoleFullModal, setGameRoleFullModal] = useState<IGameRoleFull>();

  const showModalRemove = (gameRoleFull: IGameRoleFull) => {
    setGameRoleFullModal(gameRoleFull);
    setIsModalOpen(true);
  };

  const handleOkModalRemove = () => {
    if (GameRoleFullModal) {
      const tempRoleGame = gameSelector.dataRoleGame
        .filter((f) => f._id === GameRoleFullModal._id)
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
    setIsModalOpen(false);
  };

  const handleCancelModalRemove = () => {
    setIsModalOpen(false);
    setrateValue(0);
  };

  return (
    <>
      <Modal
        title={`Are you sure to Remove ${GameRoleFullModal?.user_name}`}
        open={isModalOpen}
        onOk={handleOkModalRemove}
        onCancel={handleCancelModalRemove}
      >
        <p>How much do you rate {GameRoleFullModal?.user_name}?</p>
        <Rate
          onChange={(value) => {
            setrateValue(value);
          }}
          value={rateValue}
        />
      </Modal>

      {/* <Modal
        title={`mesage to ${GameRoleFullModal?.user_name}`}
        open={isModalMessageOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure ?</p>
      </Modal> */}

      {gameSelector.dataRoleGameFull.map((m) => (
        <Card
          key={m._id}
          style={{
            width: `100%`,
            marginBottom: 7,
            backgroundColor: `${m.status === 3 ? "#772424" : ""}`,
          }}
          actions={[
            (m.status !== 3 && (
              <DeleteOutlined
                key="setting"
                onClick={() => showModalRemove(m)}
              />
            )) || (
              <span
                key="edit"
                style={{ display: m.status !== 3 ? "none" : "" }}
              >
                <Rate disabled defaultValue={m.score} />
              </span>
            ),

            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar src={m.pic_path} />}
            title={m.user_name}
            description={m.title}
          />
        </Card>
      ))}

      {gameSelector.CountActivePlayer === 0 && (
        <FloatButton
          icon={<LogoutOutlined />}
          description={t("gameItem.finish_game")}
          shape="square"
          style={{ width: 100, right: 200 }}
          onClick={() => {
            localStorage.setItem(
              "idLastGame",
              localStorage.getItem("idGame") as ""
            );
            localStorage.removeItem("idGame");
            navigate("/");
          }}
        />
      )}
    </>
  );
};
