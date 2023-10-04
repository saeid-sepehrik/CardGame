import { Button, FloatButton, List, Rate, Space } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import React, { useEffect } from "react";
import {
  IGameRoleFull,
  setCountActivePlayer,
  setDataGameRoleFull,
  updateRoleGame,
} from "./game.slice";
import { LogoutOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const GameItem = () => {
  const gameSelector = useAppSelector((s) => s.game);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setCountActivePlayer());
  }, []);

  const IconText = ({
    icon,
    text,
    item,
  }: {
    icon: React.FC;
    text: string;
    item: IGameRoleFull;
  }) => (
    <Space>
      {item !== undefined && (
        <>
          {item.status === 2 && item.edite === false && (
            <Button
              danger
              type="primary"
              onClick={() => {
                const tempData = gameSelector.dataRoleGameFull.map((obj) => {
                  if (obj._id === item._id) {
                    return { ...obj, edite: true };
                  }
                  return obj;
                });
                dispatch(setDataGameRoleFull(tempData));
              }}
            >
              {t("button.remove")}
            </Button>
          )}
          {item.edite === true && (
            <Button
              type="primary"
              onClick={() => {
                const tempData = gameSelector.dataRoleGameFull.map((obj) => {
                  if (obj._id === item._id) {
                    return { ...obj, edite: false, status: 2 };
                  }
                  return obj;
                });
                dispatch(setDataGameRoleFull(tempData));
              }}
            >
              {t("button.cancel")}
            </Button>
          )}
          {item.edite === true && (
            <>
              <Button
                type="primary"
                danger
                onClick={() => {
                  console.log(item.user_name);
                  // const itemrole:IGameRole = gameSelector.dataRoleGameFull.filter(f=>f._id = item._id)[0];
                  const itemtemp = gameSelector.dataRoleGameFull.filter(
                    (f) => f._id === item._id
                  )[0];
                  dispatch(updateRoleGame(itemtemp));
                  const tempData = gameSelector.dataRoleGameFull.map((obj) => {
                    if (obj._id === item._id) {
                      return { ...obj, edite: false, status: 3 };
                    }
                    return obj;
                  });
                  dispatch(setDataGameRoleFull(tempData));
                  dispatch(setCountActivePlayer());
                }}
              >
                {t("button.submit")}
              </Button>
              <Rate
                onChange={(value) => {
                  const tempData = gameSelector.dataRoleGameFull.map((obj) => {
                    if (obj._id === item._id) {
                      return { ...obj, score: value, status: 3 };
                    }
                    return obj;
                  });
                  dispatch(setDataGameRoleFull(tempData));
                }}
                value={item.score}
              />
            </>
          )}
        </>
      )}
      {React.createElement(icon)}
      {text}
    </Space>
  );

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
                text={item.score.toString(10)}
                key="list-vertical-star-o"
                item={item}
              />,
            ]}
            extra={<img width={100} alt="logo" src={"../" + item.pic_path} />}
          >
            <List.Item.Meta title={item.title} />
            {item.user_name}
            {item.status === 3 ? (
              <h3 style={{ color: "red" }}>{t("gameItem.removed")}</h3>
            ) : (
              <></>
            )}
            <br />
          </List.Item>
        )}
      />
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
