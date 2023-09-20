import { useEffect, useState } from "react";
import { IGame, IRole } from "../../models/models";
import { CommentOutlined, GoldTwoTone } from "@ant-design/icons";
import { Alert, Button, ConfigProvider, Space } from "antd";
import { useNavigate } from "react-router-dom";
export interface dataProps {
  scenario: number;
  gameTypeName: string;
  scenarioName: string;
  dataRoleSelected: IRole[];
}

export const Done = ({
  scenario,
  gameTypeName,
  scenarioName,
  dataRoleSelected,
}: dataProps) => {
  const [game, setgame] = useState<IGame>();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [warning, setwarning] = useState(false);
  const [chooseOnline, setchooseOnline] = useState(false);
  const navigate = useNavigate();
  localStorage.removeItem("codeGame");

  useEffect(() => {
    if (chooseOnline)
      (async function () {
        // setLoading(true);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code_scenario: scenario,
            title_game_type: gameTypeName,
            title_scenario: scenarioName,
            status: 1,
            code: Math.floor(100000 + Math.random() * 900000),
          }),
        };
        const resp = await fetch(
          `http://localhost:3000/api/game/`,
          requestOptions
        );
        const json = await resp.json();
        console.log(json);
        setgame(json.data);
      })();
  }, [chooseOnline, gameTypeName, scenario, scenarioName]);

  useEffect(() => {
    console.log("000000000000");
    if (game !== undefined)
      if (game.code > 0) {
        dataRoleSelected.forEach((drs) => {
          (async function () {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id_game: game._id,
                id_role: drs._id,
                status: 1,
              }),
            };
            const resp = await fetch(
              `http://localhost:3000/api/gameRole/`,
              requestOptions
            );
            const json = await resp.json();
            console.log(json);
          })();
        });
        localStorage.setItem("codeGame", game.code.toString());
        navigate("../game/waiting");
      }
  }, [game]);

  const countinueOnline = () => {
    if (isOnline) {
      setchooseOnline(true);
      console.log("online");
      setwarning(false);
    } else {
      setwarning(true);
      console.log("ofline");
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
            Countinue online
          </Button>
          <Button type="default" icon={<GoldTwoTone />} size={"large"}>
            Countinue Ofline
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
