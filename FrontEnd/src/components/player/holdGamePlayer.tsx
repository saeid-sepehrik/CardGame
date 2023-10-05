import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setRole, setRoleGame } from "./player.slice";
import { Card, Slider, Switch } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import i18n from "../../i18n";

export const HoldGamePlayer = () => {
  const [opacity, setopacity] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const { t } = useTranslation();
  const playerSelector = useAppSelector((s) => s.player);
  const dispatch = useAppDispatch();

  const onChange = (checked: boolean) => {
    setDisabled(checked);
    setopacity(0);
  };

  useEffect(() => {
    dispatch(setRole());
  }, []);

  useEffect(() => {
    dispatch(setRoleGame());
  }, []);

  return (
    <>
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
          <MessageOutlined
            onClick={() => console.log("sdsds")}
            key="ellipsis"
          />,
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
