import { List } from "antd";
import { useEffect, useState } from "react";
import { IGameType } from "../../models/models";
import { useAppDispatch } from "../../redux/hooks";
import { incrementByAmount } from "./step.slice";
import { appApi } from "../../utility/appApi";
import { useTranslation } from "react-i18next";
import { setGameTypeSelected } from "./newGame.slice";

export const GameType = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const [data, setdata] = useState<IGameType[]>([]);

  useEffect(() => {
    (async function () {
      const resp = await appApi.get(`gameType`);
      setdata(resp.data.data);
    })();
  }, []);

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item._id}
            extra={<img width={100} alt="logo" src={item.pic_path} />}
            onClick={() => {
              dispatch(setGameTypeSelected(item));
              dispatch(incrementByAmount(1));
            }}
          >
            <List.Item.Meta title={(item as any)["title_" + i18n.language]} />
            {(item as any)["dsc_" + i18n.language]}
          </List.Item>
        )}
      />
    </>
  );
};
