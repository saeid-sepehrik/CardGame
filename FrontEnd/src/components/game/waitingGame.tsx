/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
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
import { setPlayer, updateGame, updateRoleGame } from "./game.slice";
import { useTranslation } from "react-i18next";
import { shuffle } from "../../utility/functions";
import { IGameRole } from "../../models/models";

export const WaitingGame = () => {
  const gameSelector = useAppSelector((s) => s.game);
  const dispatch = useAppDispatch();
  const twoColors = { "0%": "#108ee9", "100%": "#87d068" };
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      (async function () {
        dispatch(setPlayer());
      })();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function division() {
    const temp: IGameRole[] = [...gameSelector.dataRoleGame];
    const id_player_shufle = shuffle(
      gameSelector.dataPlayer.map((m) => {
        return m._id;
      })
    );
    temp.map((m, index) => {
      dispatch(
        updateRoleGame({
          data: { ...m, status: 2, id_user: id_player_shufle[index] },
          updateGameRoleFull: false,
        })
      );
    });
  }

  useEffect(() => {
    if (
      gameSelector.dataRoleGame.length !== 0 &&
      gameSelector.dataRoleGame.every((r) => {
        if (r.status !== 2) return false;
        return true;
      })
    ) {
      dispatch(
        updateGame({
          ...gameSelector.dataGame,
          status: 3,
        })
      );
    }
  }, [gameSelector.dataRoleGame]);

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
              {gameSelector.dataPlayer.length !== 0 &&
                gameSelector.dataRoleGame.length ===
                  gameSelector.dataPlayer.length && (
                  <Button
                    className="btn btn-neutral"
                    type="primary"
                    onClick={() => division()}
                    shape="round"
                    size="large"
                    icon={<ArrowRightOutlined />}
                  >
                    {t("button.division_role")}
                  </Button>
                )}
              <Statistic
                title={t("waiting.status")}
                value={gameSelector.dataPlayer.length}
                suffix={" / " + gameSelector.dataRoleGame.length}
              />
              <Space wrap>
                <Progress
                  type="dashboard"
                  percent={Math.round(
                    (gameSelector.dataPlayer.length * 100) /
                      gameSelector.dataRoleGame.length
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
        {(gameSelector.dataPlayer.length === 0 ||
          gameSelector.dataRoleGame.length !==
            gameSelector.dataPlayer.length) && (
          <Col span={6}>
            <Card title={t("waiting.card_title")} bordered={false} size="small">
              {t("waiting.card_detaile_1")}
              {gameSelector.dataRoleGame.length -
                gameSelector.dataPlayer.length}
              {t("waiting.card_detaile_2")}
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};
