import { Avatar, Card, FloatButton, Rate } from "antd";
import { DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { IGameRoleFull, updateRoleGame } from "./game.slice";
import { LogoutOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { ModalMessage } from "./modalMessage";
import { ModalRemove } from "./modalRemove";

export const GameItem = () => {
  const [GameRoleFullModalRemove, setGameRoleFullModalRemove] =
    useState<IGameRoleFull>();
  const [GameRoleFullModalMessage, setGameRoleFullModalMessage] =
    useState<IGameRoleFull>();
  const gameSelector = useAppSelector((s) => s.game);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showModalMessage = (gameRoleFull: IGameRoleFull) => {
    setGameRoleFullModalMessage(gameRoleFull);
  };

  const showModalRemove = (gameRoleFull: IGameRoleFull) => {
    setGameRoleFullModalRemove(gameRoleFull);
  };

  return (
    <>
      <ModalMessage
        GameRoleFullModalMessage={GameRoleFullModalMessage}
        setGameRoleFullModalMessage={setGameRoleFullModalMessage}
      />
      <ModalRemove
        GameRoleFullModalRemove={GameRoleFullModalRemove}
        setGameRoleFullModalRemove={setGameRoleFullModalRemove}
      />
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
            <MessageOutlined
              width={20}
              key="ellipsis"
              onClick={() => showModalMessage(m)}
            />,
          ]}
        >
          <Meta
            avatar={<Avatar src={m.pic_path} />}
            title={m.user_name}
            description={m.title}
          />
        </Card>
      ))}

      {gameSelector.dataRoleGame.filter((f) => f.status === 2).length === 0 && (
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
            gameSelector.dataRoleGame.map((m) => {
              const temp = {
                ...m,
                status: 4,
              };
              dispatch(
                updateRoleGame({ data: temp, updateGameRoleFull: true })
              );
            });
          }}
        />
      )}
    </>
  );
};
