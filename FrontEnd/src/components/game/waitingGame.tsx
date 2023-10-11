/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  ConfigProvider,
  Progress,
  Row,
  Space,
  Statistic,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setPlayer,
  setRoleGame,
  updateGame,
  updateRoleGame,
} from "./game.slice";
import { useTranslation } from "react-i18next";
import { shuffle } from "../../utility/functions";
import { appApi } from "../../utility/appApi";
import { IGameRole } from "../../models/models";

export const WaitingGame = () => {
  // const [players, setplayers] = useState<Iplayer[]>([]);
  const gameSelector = useAppSelector((s) => s.game);
  const dispatch = useAppDispatch();
  const twoColors = { "0%": "#108ee9", "100%": "#87d068" };
  const { t } = useTranslation();
  const [goToGame, setgoToGame] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      (async function () {
        dispatch(setPlayer());
      })();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // updateRoleGame;
  useEffect(() => {
    if (goToGame) {
      (async function () {
        const resp = await appApi.get(
          "/gameRole/" + localStorage.getItem("idGame")
        );
        const temp: IGameRole[] = resp.data.data;
        const id_player: string[] = [];
        gameSelector.dataPlayer.map((p) => {
          id_player.push(p._id);
        });
        const id_player_shufle = shuffle(id_player);
        temp
          .filter((f) => f.status === 1)
          .map((m, index) => {
            const new_obj = {
              ...m,
              id_user: id_player_shufle[index],
              status: 2,
            };
            dispatch(
              updateRoleGame({ data: new_obj, updateGameRoleFull: false })
            );
          });
      })();
    }
  }, [goToGame]);

  useEffect(() => {
    if (gameSelector.UpdateedRoleGame) dispatch(setRoleGame());
  }, [gameSelector.UpdateedRoleGame]);

  useEffect(() => {
    if (gameSelector.receivedRoleGame) {
      dispatch(
        updateGame({
          ...gameSelector.dataGame,
          status: 3,
        })
      );
    }
  }, [gameSelector.receivedRoleGame]);

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            // textFontSize: 12,
          },
          token: {
            // Seed Token
            colorPrimary: "#00b96b",
            borderRadius: 2,

            // Alias Token
            colorBgContainer: "#f6ffed",
          },
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Badge.Ribbon
            text={t("waiting.label")}
            color="blue"
            placement="start"
          >
            <Card
              title={`${t("waiting.code_game")} : ${
                gameSelector.dataGame.code
              }`}
              size="default"
            >
              {gameSelector.countJoined !== 0 &&
                gameSelector.countAllPlayer === gameSelector.countJoined && (
                  <Button
                    className="btn btn-neutral"
                    type="primary"
                    onClick={() => setgoToGame(true)}
                    shape="round"
                    size="large"
                    icon={<ArrowRightOutlined />}
                  >
                    {t("button.division_role")}
                  </Button>
                )}
              <Statistic
                title={t("waiting.status")}
                value={gameSelector.countJoined}
                suffix={" / " + gameSelector.countAllPlayer}
              />
              <Space wrap>
                <Progress
                  type="dashboard"
                  percent={Math.round(
                    (gameSelector.countJoined * 100) /
                      gameSelector.countAllPlayer
                  )}
                  strokeColor={twoColors}
                />
              </Space>
            </Card>
          </Badge.Ribbon>
        </Space>
      </ConfigProvider>

      <Row gutter={[8, 8]}>
        {gameSelector.dataPlayer.map((m) => (
          <Col key={m._id} span={6}>
            <Card title={m.name} bordered={false} size="small">
              {t("waiting.joined")}👍
            </Card>
          </Col>
        ))}
        {(gameSelector.countJoined === 0 ||
          gameSelector.countAllPlayer !== gameSelector.countJoined) && (
          <Col span={6}>
            <Card title={t("waiting.card_title")} bordered={false} size="small">
              {t("waiting.card_detaile_1")}
              {gameSelector.countAllPlayer - gameSelector.countJoined}{" "}
              {t("waiting.card_detaile_2")}
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};
