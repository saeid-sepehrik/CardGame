import { Card, List } from "antd";
import { useEffect, useState } from "react";
import { IScenario } from "../../models/models";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { incrementByAmount } from "./step.slice";
import axios from "axios";
import { useTranslation } from "react-i18next";

export interface ScenarioProps {
  gameTypeId: string;
  setscenario: (scenario: number) => void;
}

export const Scenario = ({ gameTypeId, setscenario }: ScenarioProps) => {
  const [dataSenario, setdataSenario] = useState<IScenario[]>([]);

  const step = useAppSelector((s) => s.step);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    (async function () {
      // setLoading(true);
      const resp = await axios.get(
        `http://localhost:3000/api/scenario/${gameTypeId}`
      );

      setdataSenario(resp.data.data);
    })();
  }, [gameTypeId]);

  return (
    <>
      {gameTypeId != "" && step.value == 1 && (
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
                title={(item as any)["title_" + i18n.language]}
                onClick={() => {
                  setscenario(item.code);
                  dispatch(incrementByAmount(2));
                }}
              >
                {(item as any)["dsc_" + i18n.language]}
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  );
};
