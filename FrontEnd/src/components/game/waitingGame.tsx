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
  setloading,
} from "./waitingGame.slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setDataRoleSelected } from "../newGame/role.slice";

export const WaitingGame = () => {
  const [roleIds, setroleIds] = useState<string[]>([]);
  const [players, setplayers] = useState<Iplayer[]>([]);
  const [getNewData, setgetNewData] = useState(false);
  const [ReadyForsetRoleGameFull, setReadyForsetRoleGameFull] = useState(0);
  const waiting = useAppSelector((s) => s.waiting);
  const dispatch = useAppDispatch();
  const roleSelector = useAppSelector((s) => s.role);
  const waitingSelector = useAppSelector((s) => s.waiting);
  const twoColors = { "0%": "#108ee9", "100%": "#87d068" };
  const navigator = useNavigate();

  useEffect(() => {
    if (waitingSelector.codeGame === 0) {
      setgetNewData(true);
      dispatch(setloading(true));
    } else {
      dispatch(setloading(false));
    }
  }, []);

  /////roleGame
  useEffect(() => {
    if (getNewData) {
      (async function () {
        const ids: string[] = [];
        // setLoading(true);
        const resp = await axios.get(
          `http://localhost:3000/api/gameRole/${localStorage.getItem("idGame")}`
        );
        const a: IGameRole[] = resp.data.data;
        a.map((m) => ids.push(m.id_role));
        dispatch(setRoleGame());
        setroleIds(ids);
        setReadyForsetRoleGameFull(ReadyForsetRoleGameFull + 1);
      })();
    }
  }, [getNewData, waitingSelector.codeGame]);

  //////game
  useEffect(() => {
    if (getNewData) {
      (async function () {
        // setLoading(true);
        const resp = await axios.get(
          `http://localhost:3000/api/game/${localStorage.getItem("idGame")}`
        );
        dispatch(setDataGame(resp.data.data[0]));
      })();
    }
  }, [getNewData]);

  ////role
  useEffect(() => {
    // console.log(roleIds);
    if (getNewData && roleIds !== null) {
      (async function () {
        const article = {
          ids: roleIds,
        };
        console.log("article" + article.ids);
        const resp = await axios.post(
          "http://localhost:3000/api/role/game/game/",
          article
        );
        console.log(resp.data.data);
        dispatch(setDataRoleSelected(resp.data.data));
        setReadyForsetRoleGameFull(ReadyForsetRoleGameFull + 1);
      })();
    }
  }, [roleIds]);

  ///roleGameFull
  useEffect(() => {
    if (
      getNewData &&
      ReadyForsetRoleGameFull === 2 &&
      roleSelector.roleSelected !== null
    ) {
      const role: IRole[] = roleSelector.roleSelected;
      const gameRole: IGameRole[] = waitingSelector.dataRoleGame;
      // gameRole.map((m) =>
      //   atemp.push({
      //     ...m,
      //     role: role.filter((f) => f._id === m.id_role),
      //   })
      // );
      const atemp = gameRole.map((m) => ({
        ...m,
        pic_path: role.filter((f) => f._id === m.id_role)[0].pic_path,
        color: role.filter((f) => f._id === m.id_role)[0].color,
        title: role.filter((f) => f._id === m.id_role)[0].title,
        group: role.filter((f) => f._id === m.id_role)[0].group,
      }));

      dispatch(setDataGameRoleFull(atemp));
    }
  }, [ReadyForsetRoleGameFull, dispatch]);

  // ///roleGameFull
  // useEffect(() => {
  //   if (
  //     getNewData &&
  //     ReadyForsetRoleGameFull === 2 &&
  //     roleSelector.roleSelected !== null
  //   ) {
  //     const atemp: any[] = [];
  //     const role: IRole[] = roleSelector.roleSelected;
  //     const gameRole: IGameRole[] = waitingSelector.dataRoleGame;
  //     gameRole.map((m) =>
  //       atemp.push({
  //         ...m,
  //         role: role.filter((f) => f._id === m.id_role),
  //       })
  //     );
  //     dispatch(setDataGameRoleFull(atemp));
  //   }
  // }, [ReadyForsetRoleGameFull, dispatch]);

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
                  onClick={() => navigator("/game/")}
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
