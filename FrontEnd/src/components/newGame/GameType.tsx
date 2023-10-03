import { Card, Col, Image, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { IGroupType } from "../../models/models";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { incrementByAmount } from "./step.slice";
import { appApi } from "../../utility/appApi";
import { useTranslation } from "react-i18next";

interface GameTypeProps {
  setgameTypeId: (gameTypeId: string) => void;
}

export const GameType = ({ setgameTypeId }: GameTypeProps) => {
  const step = useAppSelector((s) => s.step);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const [data, setdata] = useState<IGroupType[]>([]);

  // i18n.changeLanguage('en')
  useEffect(() => {
    (async function () {
      // setLoading(true);
      const resp = await appApi.get(`gameType`);

      setdata(resp.data.data);

      // console.log(json.data)
    })();
  }, []);

  return (
    <>
      {step.value == 0 && (
        <>
          <Row gutter={[8, 8]}>
            {data.map((m) => (
              <Col
                key={Math.random()}
                xs={{ span: 12 }}
                sm={{ span: 12 }}
                md={{ span: 6 }}
                lg={{ span: 6 }}
              >
                <Card
                  key={m._id}
                  hoverable
                  onClick={() => {
                    setgameTypeId(m._id);
                    dispatch(incrementByAmount(1));
                  }}
                  style={{ width: 150 }}
                  cover={<Image alt="example" src={m.pic_path} />}
                >
                  <Meta title={(m as any)["title_" + i18n.language]} />
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
