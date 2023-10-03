import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import React from "react";
import { Button, List, Modal, Rate, Space } from "antd";
import { IGameRole, IRole, Iplayer } from "../../models/models";
import { setRole } from "../newGame/role.slice";
import { useTranslation } from "react-i18next";
import {
  IGameRoleFull,
  setDataGameRoleFull,
  setPlayer,
  setRoleGame,
} from "./game.slice";
import { setloading } from "../game.tsx/waitingGame.slice";

export const GameHold = () => {
  const [rate, setrate] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gameSelector = useAppSelector((s) => s.game);
  const roleSelector = useAppSelector((s) => s.role);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    console.log(rate);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const IconText = ({
    icon,
    text,
    item,
  }: {
    icon: React.FC;
    text: string;
    item?: IGameRoleFull;
  }) => (
    <Space>
      {item !== undefined && (
        <>
          <Button type="primary" onClick={showModal}>
            {t("button.killed")}
          </Button>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>{item.user_name}</p>
            <Rate
              allowHalf
              defaultValue={2.5}
              count={5}
              onChange={(value) => setrate(value)}
            />
          </Modal>
        </>
      )}
      {React.createElement(icon)}
      {text}
    </Space>
  );

  ////roleGame
  useEffect(() => {
    if (!gameSelector.receivedRoleGame) {
      dispatch(setRoleGame());
    }
  }, [gameSelector.receivedRoleGame]);

  ////role
  useEffect(() => {
    if (!roleSelector.receivedRole && gameSelector.receivedRoleGame) {
      dispatch(setRole(gameSelector.dataRoleGame));
    }
  }, [gameSelector.receivedRoleGame]);

  //player
  useEffect(() => {
    if (!gameSelector.receivedPlayer) dispatch(setPlayer());
  }, []);

  ///roleGameFull
  useEffect(() => {
    if (
      roleSelector.receivedRole &&
      gameSelector.receivedPlayer &&
      gameSelector.receivedRoleGame
    ) {
      const role: IRole[] = roleSelector.roleSelected;
      const gameRole: IGameRole[] = gameSelector.dataRoleGame;
      const player: Iplayer[] = gameSelector.dataPlayer;
      console.log(player);
      console.log(gameRole);
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
        user_name: player.filter((f) => f._id === m.id_user)[0].name,
      }));
      // console.log(atemp);
      dispatch(setDataGameRoleFull(atemp));
      dispatch(setloading(false));
    }
  }, [
    gameSelector.countUpdateedRoleGame,
    roleSelector.receivedRole,
    gameSelector.receivedPlayer,
    gameSelector.receivedRoleGame,
  ]);

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={gameSelector.dataRoleGameFull}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text={"3"}
                key="list-vertical-star-o"
                item={item}
              />,
              <IconText
                icon={LikeOutlined}
                text="0"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="0"
                key="list-vertical-message"
              />,
            ]}
            extra={<img width={100} alt="logo" src={"../" + item.pic_path} />}
          >
            <List.Item.Meta title={item.title} />
            {item.user_name}
          </List.Item>
        )}
      />
    </>
  );
};
