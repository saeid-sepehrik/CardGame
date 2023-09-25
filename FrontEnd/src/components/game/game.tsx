import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setDataGame,
  setDataGameRoleFull,
  setRoleGame,
  setloading,
} from "./waitingGame.slice";
import { useEffect, useState } from "react";
import axios from "axios";
import { IGameRole, IRole } from "../../models/models";
import { setDataRoleSelected } from "../newGame/role.slice";
import { Avatar, List } from "antd";

export const Game = () => {
  const [roleIds, setroleIds] = useState<string[]>([]);
  const [getNewData, setgetNewData] = useState(false);
  const [ReadyForsetRoleGameFull, setReadyForsetRoleGameFull] = useState(0);
  const waitingSelector = useAppSelector((s) => s.waiting);
  const roleSelector = useAppSelector((s) => s.role);
  const dispatch = useAppDispatch();

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
  }, [getNewData]);

  //////game
  useEffect(() => {
    if (getNewData) {
      (async function () {
        // setLoading(true);
        const resp = await axios.get(
          `http://localhost:3000/api/game/${localStorage.getItem("idGame")}`
        );
        dispatch(setDataGame(resp.data.data[0]));
        console.log(resp.data.data[0]);
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
        // console.log("article" + article.ids);
        const resp = await axios.post(
          "http://localhost:3000/api/role/game/game/",
          article
        );
        // console.log(resp.data.data);
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

  return (
    <>
      {/* <h1>{dataGame}</h1> */}
      {
        waitingSelector.dataRoleGameFull.map((m) => {
          <h3>2222{m.id_game}</h3>;
        })
        // <h1>hiiiii</h1>
      }
      {/* <Image src={}></Image> */}
      <List
        dataSource={waitingSelector.dataRoleGameFull}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={"../" + item.pic_path} />}
              title={<a href="https://ant.design">{"./" + item.title}</a>}
              description={"../" + item.pic_path}
            />
          </List.Item>
        )}
      />
    </>
  );
};
