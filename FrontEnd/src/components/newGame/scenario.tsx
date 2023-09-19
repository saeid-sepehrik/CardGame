import { Card, List } from "antd";
import { useEffect, useState } from "react";
import { IScenario } from "../../models/models";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { incrementByAmount } from "./step.slice";
import axios from "axios";

export interface dataProps {
  gameType: string;
  setscenario: (scenario: number) => void;
  setscenarioName: (scenarioName: string) => void;
}

export const Scenario = ({
  setscenarioName,
  gameType,
  setscenario,
}: dataProps) => {
  const [dataSenario, setdataSenario] = useState<IScenario[]>([]);

  const step = useAppSelector((s) => s.step);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      // setLoading(true);
      const resp = await axios.get(
        `http://localhost:3000/api/scenario/${gameType}`
      );

      setdataSenario(resp.data.data);
    })();
  }, [gameType]);

  return (
    <>
      {gameType != "" && step.value == 1 && (
        <List
          grid={{
            gutter: 16,
            xs: 2,
            sm: 2,
            md: 4,
            lg: 6,
            xl: 6,
            xxl: 8,
          }}
          dataSource={dataSenario}
          renderItem={(item: IScenario) => (
            <List.Item>
              <Card
                title={item.title}
                onClick={() => {
                  setscenario(item.code);
                  setscenarioName(item.title);
                  dispatch(incrementByAmount(2));
                }}
              >
                Card content
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  );
};
