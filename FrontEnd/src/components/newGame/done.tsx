/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { CommentOutlined, GoldTwoTone } from "@ant-design/icons";
import { Alert, Button, Col, ConfigProvider, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGame } from "../game/game.slice";
import { appApi } from "../../utility/appApi";
import { useTranslation } from "react-i18next";

export const Done = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [warning, setwarning] = useState(false);
  const [chooseOnline, setchooseOnline] = useState(false);
  const navigate = useNavigate();
  const newGamegameSelector = useAppSelector((s) => s.newGame);
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
          code_scenario: newGamegameSelector.scenarioSelected.code,
          id_game_type: newGamegameSelector.gameTypeSelected._id,
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
      newGamegameSelector.roleSelected.forEach((drs) => {
        (async function () {
          const requestOptions = {
            id_game: gameSelector.dataGame._id,
            id_role: drs._id,
            id_user: "",
            status: 1,
            score: 0,
            newMessage: false,
          };
          await appApi.post("gameRole/", requestOptions);
        })();
      });
      navigate("/game");
    }
  }, [gameSelector.dataGame]);

  const countinueOnline = () => {
    if (isOnline) {
      setchooseOnline(!chooseOnline);
      setwarning(false);
    } else {
      setwarning(true);
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
        <Row justify="space-evenly" style={{}}>
          <Col className="w-full p-5">
            <Button
              className="btn btn-neutral"
              type="primary"
              icon={<CommentOutlined />}
              size={"large"}
              onClick={() => {
                countinueOnline();
              }}
            >
              {t("button.continue_online")}
            </Button>
          </Col>
          <Col className="w-full p-5">
            <Button
              className="btn btn-neutral"
              type="primary"
              icon={<GoldTwoTone />}
              size={"large"}
            >
              {t("button.continue_ofline")}
            </Button>
          </Col>
        </Row>
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
