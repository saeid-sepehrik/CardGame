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
import { IGameRole, IRole, Iplayer } from "../../models/models";
import { appApi } from "../../utility/appApi";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setCountJoined,
  setDataGame,
  setDataGameRoleFull,
  setRoleGame,
} from "./waitingGame.slice";
import axios from "axios";

export const WaitingGame = () => {
  const [players, setplayers] = useState<Iplayer[]>([]);
  const waiting = useAppSelector((s) => s.waiting);
  const dispatch = useAppDispatch();
  const roleSelector = useAppSelector((s) => s.role);
  const waitingSelector = useAppSelector((s) => s.waiting);
  const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

  useEffect(() => {
    if (waitingSelector.codeGame === 0) {
      (async function () {
        // setLoading(true);
        const resp = await axios.get(
          `http://localhost:3000/api/game/${localStorage.getItem("idGame")}`
        );
        dispatch(setDataGame(resp.data.data[0]));
      })();
    }
  }, []);

  useEffect(() => {
    dispatch(setRoleGame());
  }, []);

  useEffect(() => {
    if (waitingSelector.loading === false) {
      const atemp: any[] = [];
      const role: IRole[] = roleSelector.roleSelected;
      const gameRole: IGameRole[] = waiting.dataRoleGame;
      gameRole.map((m) =>
        atemp.push({
          ...m,
          role: role.filter((f) => f._id === m.id_role),
        })
      );
      dispatch(setDataGameRoleFull(atemp));

      atemp.map((m) => {
        console.log(m);
      });
    }
  }, [dispatch, waitingSelector.loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      (async function () {
        const resp = await appApi.get(
          "/player/joinGame/" + localStorage.getItem("idGame")
        );
        setplayers(resp.data.data);
        dispatch(setCountJoined(resp.data.data.length));
      })();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
          <Badge.Ribbon text="code" color="blue" placement="start">
            <Card title={"Code Game : " + waiting.dataGame.code} size="default">
              {waiting.countAllPlayer === waitingSelector.countJoined && (
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  icon={<ArrowRightOutlined />}
                >
                  Division of roles
                </Button>
              )}
              <Statistic
                title="status"
                value={waitingSelector.countJoined}
                suffix={" / " + waiting.countAllPlayer}
              />
              <Space wrap>
                <Progress
                  type="dashboard"
                  percent={Math.round(
                    (waitingSelector.countJoined * 100) / waiting.countAllPlayer
                  )}
                  strokeColor={twoColors}
                />
              </Space>
            </Card>
          </Badge.Ribbon>
        </Space>
      </ConfigProvider>

      <Row gutter={[8, 8]}>
        {players.map((m) => (
          <Col key={m._id} span={6}>
            <Card title={m.name} bordered={false} size="small">
              joined👍
            </Card>
          </Col>
        ))}
        {waiting.countAllPlayer !== waitingSelector.countJoined && (
          <Col span={6}>
            <Card title="Waiting ..." bordered={false} size="small">
              Waiting for {waiting.countAllPlayer - waitingSelector.countJoined}{" "}
              more players
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
};
