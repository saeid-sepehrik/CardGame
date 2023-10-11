import { Card, List } from "antd";
import { useEffect, useState } from "react";
import { IScenario } from "../../models/models";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { incrementByAmount } from "./step.slice";
import { useTranslation } from "react-i18next";
import { appApi } from "../../utility/appApi";
import {
  setDataRoleSelected,
  setScenarioSelected,
  setgroupCount,
} from "./newGame.slice";

export const Scenario = () => {
  const [dataSenario, setdataSenario] = useState<IScenario[]>([]);

  const step = useAppSelector((s) => s.step);
  const newGageSelector = useAppSelector((s) => s.newGame);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(setDataRoleSelected([]));
    dispatch(setgroupCount([]));
    (async function () {
      const resp = await appApi.get(
        `scenario/${newGageSelector.gameTypeSelected._id}`
      );
      setdataSenario(resp.data.data);
    })();
  }, [newGageSelector.gameTypeSelected]);

  return (
    <>
      {step.value == 1 && (
        <List
          className="p-2"
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
                className="bg-purple-500"
                title={(item as any)["title_" + i18n.language]}
                onClick={() => {
                  dispatch(setScenarioSelected(item));
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
