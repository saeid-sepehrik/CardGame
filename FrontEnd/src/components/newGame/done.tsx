/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IRole } from "../../models/models";
import { CommentOutlined, GoldTwoTone } from "@ant-design/icons";
import { Alert, Button, ConfigProvider, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGame } from "../game/game.slice";
import { appApi } from "../../utility/appApi";
import { useTranslation } from "react-i18next";
export interface DoneProps {
  gameTypeId: string;
  scenario: number;
  dataRoleSelected: IRole[];
}

export const Done = ({ scenario, gameTypeId, dataRoleSelected }: DoneProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [warning, setwarning] = useState(false);
  const [chooseOnline, setchooseOnline] = useState(false);
  const navigate = useNavigate();
  const gameSelector = useAppSelector((s) => s.game);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  //create game
  useEffect(() => {
    if (chooseOnline) {
      localStorage.removeItem("idGame");
      (async function () {
        // setLoading(true);
        const code = Math.floor(100000 + Math.random() * 900000);
        const data = {
          code_scenario: scenario,
          id_game_type: gameTypeId,
          status: 1,
          code: code,
        };
        const resp = await appApi.post("/game/", { data });

        localStorage.setItem("idGame", resp.data.data._id);
        dispatch(setGame());
      })();
    }
  }, [chooseOnline]);

  // create rolegame
  useEffect(() => {
    if (chooseOnline) {
      (async function () {
        dataRoleSelected.forEach((drs) => {
          (async function () {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id_game: gameSelector.dataGame,
                id_role: drs._id,
                id_user: "",
                status: 1,
                score: 0,
                newMessage: false,
              }),
            };
            await fetch(`http://localhost:3000/api/gameRole/`, requestOptions);
          })();
        });

        navigate("/game");
      })();
    }
  }, [gameSelector.dataGame]);

  const countinueOnline = () => {
    if (isOnline) {
      setchooseOnline(!chooseOnline);
      // console.log("online");
      setwarning(false);
    } else {
      setwarning(true);
      // console.log("ofline");
    }
  };

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#00b96b",
            borderRadius: 2,

            // Alias Token
            colorBgBase: "#f6ffed",
          },
        }}
      >
        <Space>
          <Button
            type="primary"
            icon={<CommentOutlined />}
            size={"large"}
            onClick={() => {
              countinueOnline();
            }}
          >
            {t("button.continue_online")}
          </Button>
          <Button type="default" icon={<GoldTwoTone />} size={"large"}>
            {t("button.continue_ofline")}
          </Button>
        </Space>
      </ConfigProvider>
      {warning && (
        <Alert
          message="You are offline."
          description="Please check your internet connection."
          type="warning"
          showIcon
          closable
          afterClose={() => {
            setwarning(false);
          }}
        />
      )}
    </>
  );
};
