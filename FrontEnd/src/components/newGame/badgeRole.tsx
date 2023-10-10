import { Avatar, Badge, Button, Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { incrementByAmount } from "./step.slice";
import { useTranslation } from "react-i18next";
import {
  setDataRoleNewGame,
  setDataRoleSelected,
  setgroupCount,
} from "./newGame.slice";

export const BadgeRole = () => {
  const step = useAppSelector((s) => s.step);
  const dispatch = useAppDispatch();
  const newGamegameSelector = useAppSelector((s) => s.newGame);
  const { t, i18n } = useTranslation();
  return (
    <>
      {step.value === 2 && (
        <>
          <Row className="p-3 bg-purple-200	">
            {newGamegameSelector.group.map((e: string) => (
              <Col
                key={Math.random()}
                xs={{ span: 6 }}
                sm={{ span: 6 }}
                md={{ span: 4 }}
                lg={{ span: 4 }}
              >
                <Badge
                  count={
                    newGamegameSelector.groupCount[
                      newGamegameSelector.group.indexOf(e)
                    ]
                  }
                  key={Math.random()}
                  overflowCount={999}
                >
                  <Avatar shape="square" size="large">
                    {e}
                  </Avatar>
                </Badge>
              </Col>
            ))}
            <Col
              xs={{ span: 6 }}
              sm={{ span: 6 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
            >
              <Button
                className="btn btn-neutral"
                type="primary"
                onClick={() => {
                  dispatch(setDataRoleSelected([]));
                  const f: Array<number> = [];
                  newGamegameSelector.group.map(() => {
                    f.push(0);
                  });
                  dispatch(setgroupCount(f));
                  dispatch(
                    setDataRoleNewGame({
                      code: newGamegameSelector.scenarioSelected.code,
                      lang: i18n.language,
                    })
                  );
                }}
              >
                {t("button.reset")}
              </Button>
            </Col>
            <Col
              xs={{ span: 6 }}
              sm={{ span: 6 }}
              md={{ span: 4 }}
              lg={{ span: 4 }}
            >
              <Button
                className="btn btn-neutral"
                type="primary"
                onClick={() => dispatch(incrementByAmount(3))}
              >
                {t("button.next")}
              </Button>
            </Col>
          </Row>
          <hr />
        </>
      )}
    </>
  );
};
