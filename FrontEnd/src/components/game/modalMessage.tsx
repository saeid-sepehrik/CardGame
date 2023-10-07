import { Button, Divider, List, Modal, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import {
  IGameRoleFull,
  sendNewMessage,
  setDataMessagesPlayer,
  setloading,
  updateRoleGame,
} from "./game.slice";
import { IMessage } from "../../models/models";
import {
  CheckCircleOutlined,
  DislikeOutlined,
  LikeOutlined,
} from "@ant-design/icons";

export interface ModalMessageProps {
  GameRoleFullModalMessage?: IGameRoleFull;
  setGameRoleFullModalMessage: (GameRoleFullModalMessage: any) => void;
}

export const ModalMessage = ({
  GameRoleFullModalMessage,
  setGameRoleFullModalMessage,
}: ModalMessageProps) => {
  const [isModalMessageOpen, setIsModalMessageOpen] = useState(false);
  const [textMessage, settextMessage] = useState("");
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const gameSelector = useAppSelector((s) => s.game);

  useEffect(() => {
    if (GameRoleFullModalMessage !== undefined) {
      dispatch(setloading(true));
      console.log(GameRoleFullModalMessage.id_user);
      dispatch(setDataMessagesPlayer(GameRoleFullModalMessage.id_user));
      setIsModalMessageOpen(true);
    }
  }, [GameRoleFullModalMessage]);

  const loadMoreData = () => {
    if (GameRoleFullModalMessage !== undefined) {
      if (gameSelector.loading) {
        return;
      }
      dispatch(setloading(true));
      dispatch(setDataMessagesPlayer(GameRoleFullModalMessage.id_user as ""));
    }
  };

  const handleCancelModalMessage = () => {
    setIsModalMessageOpen(false);
    settextMessage("");
    setGameRoleFullModalMessage(undefined);
  };

  const handleOkModalMessage = () => {
    if (GameRoleFullModalMessage) {
      const newMessage: IMessage = {
        id_game: GameRoleFullModalMessage._id,
        id_player: GameRoleFullModalMessage.id_user,
        text: textMessage,
        read: false,
        action: "CheckCircleOutlined",
      };
      dispatch(sendNewMessage(newMessage));

      const tempRoleGame = gameSelector.dataRoleGame
        .filter((f) => f._id === GameRoleFullModalMessage._id)
        .map((roleGame) => {
          return {
            ...roleGame,
            newMessage: true,
          };
        });
      dispatch(
        updateRoleGame({ data: tempRoleGame[0], updateGameRoleFull: true })
      );
    }
    settextMessage("");
    setGameRoleFullModalMessage(undefined);
    setIsModalMessageOpen(false);
  };
  return (
    <>
      <Modal
        title={`${t("gameItem.messageTo")} ${
          GameRoleFullModalMessage?.user_name
        }`}
        open={isModalMessageOpen}
        onOk={handleOkModalMessage}
        onCancel={handleCancelModalMessage}
        footer={[
          <Button key="back" onClick={handleCancelModalMessage}>
            {t("button.cancel")}
          </Button>,
          <Button
            key="submit"
            style={{ backgroundColor: "green" }}
            type="primary"
            onClick={handleOkModalMessage}
          >
            {t("button.send")}
          </Button>,
        ]}
      >
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <InfiniteScroll
            dataLength={gameSelector.dataMessages.length}
            next={loadMoreData}
            hasMore={gameSelector.dataMessages.length > 10}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={
              <Divider plain>{t("common.label.notMoreMessage")}</Divider>
            }
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={gameSelector.dataMessages}
              renderItem={(item) => (
                <List.Item key={item.text}>
                  <List.Item.Meta title={item.text} />
                  {item.action === "CheckCircleOutlined" && (
                    <CheckCircleOutlined style={{ color: "yellowgreen" }} />
                  )}
                  {item.action === "DislikeOutlined" && (
                    <DislikeOutlined style={{ color: "red" }} />
                  )}
                  {item.action === "LikeOutlined" && (
                    <LikeOutlined style={{ color: "green" }} />
                  )}
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
        <TextArea
          onChange={(e) => settextMessage(e.target.value)}
          rows={4}
          placeholder={t("gameItem.maxLenghtText")}
          maxLength={100}
          defaultValue={""}
        />
      </Modal>
    </>
  );
};
