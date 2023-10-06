/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setMessages,
  setPlayer,
  setRole,
  setRoleGame,
  updateRoleGame,
} from "./player.slice";
import { Card, Slider, Switch, notification } from "antd";
import { MessageOutlined, SmileOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import i18n from "../../i18n";
import { Message } from "./message";

export const HoldGamePlayer = () => {
  const [opacity, setopacity] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [openModalMessage, setopenModalMessage] = useState(false);
  const { t } = useTranslation();
  const playerSelector = useAppSelector((s) => s.player);
  const dispatch = useAppDispatch();

  const onChange = (checked: boolean) => {
    setDisabled(checked);
    setopacity(0);
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (title: string, description: string) => {
    api.open({
      message: title,
      description: description,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  useEffect(() => {
    if (playerSelector.dataRoleGame.newMessage === true)
      openNotification("new message", "you have a new message");
  }, [playerSelector.dataRoleGame.newMessage]);

  useEffect(() => {
    if (
      playerSelector.countUnreadMessage === 0 &&
      playerSelector.dataRoleGame.newMessage === true
    ) {
      console.log("dsdasd");
      dispatch(
        updateRoleGame({ ...playerSelector.dataRoleGame, newMessage: false })
      );
    }
  }, [playerSelector.countUnreadMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      (async function () {
        dispatch(setRoleGame());
      })();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const showModalMessage = () => {
    setopenModalMessage(true);
  };

  useEffect(() => {
    dispatch(setRole());
  }, []);

  useEffect(() => {
    dispatch(setPlayer());
  }, []);

  useEffect(() => {
    dispatch(setRoleGame());
  }, []);

  useEffect(() => {
    dispatch(setMessages());
  }, [playerSelector.dataRoleGame.newMessage]);

  return (
    <>
      {contextHolder}
      <Message
        openModalMessage={openModalMessage}
        setopenModalMessage={setopenModalMessage}
      />
      <Slider
        step={0.01}
        min={0}
        max={0.5}
        defaultValue={opacity}
        disabled={disabled}
        onChange={setopacity}
      />
      Disabled: <Switch size="small" checked={disabled} onChange={onChange} />
      <Card
        cover={
          <img
            style={{
              maxWidth: 200,
              margin: `0 auto`,
              opacity: `${opacity}`,
              display: `${disabled ? "none" : "flex"}`,
            }}
            alt="example"
            src={playerSelector.dataRole.pic_path}
          />
        }
        actions={[
          <div onClick={() => showModalMessage()}>
            {playerSelector.countUnreadMessage === 0 && (
              <MessageOutlined
                onClick={() => showModalMessage()}
                key="ellipsis"
              />
            )}
            {playerSelector.countUnreadMessage > 0 && <>new Message🟢</>}
          </div>,
          <>{playerSelector.dataRoleGame.score}⭐</>,
          <>
            {playerSelector.dataRoleGame.status === 2
              ? "live 🟢"
              : "removed 🔴"}
          </>,
        ]}
      >
        <Meta
          style={{
            opacity: `${opacity}`,
            display: `${disabled ? "none" : "flex"}`,
          }}
          title={(playerSelector.dataRole as any)["title_" + i18n.language]}
          description={(playerSelector.dataRole as any)["dsc_" + i18n.language]}
        />
      </Card>
    </>
  );
};
