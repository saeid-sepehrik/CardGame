import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { IGroupType } from "../../models/models";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { incrementByAmount } from "./step.slice";
import { appApi } from "../../utility/appApi";

export interface dataProps {
  setgameTypeName: (gameTypeName: string) => void;
  gameType: string;
  setgameType: (gameType: string) => void;
}

export const GameType = ({
  setgameTypeName,
  gameType,
  setgameType,
}: dataProps) => {
  const step = useAppSelector((s) => s.step);
  const dispatch = useAppDispatch();

  const [data, setdata] = useState<IGroupType[]>([]);

  useEffect(() => {
    (async function () {
      // setLoading(true);
      const resp = await appApi.get(`api/gameType`);

      setdata(resp.data.data);

      // console.log(json.data)
    })();
  }, []);

  return (
    <>
      {(gameType == "" || step.value == 0) &&
        data.map((m) => (
          <Card
            key={m._id}
            hoverable
            onClick={() => {
              setgameType(m._id);
              setgameTypeName(m.title);
              dispatch(incrementByAmount(1));
            }}
            style={{ width: 150, float: "left" }}
            cover={<Image alt="example" src={m.pic_path} />}
          >
            <Meta title={m.title} />
          </Card>
        ))}
    </>
  );
};
