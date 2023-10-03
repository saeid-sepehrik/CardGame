import { Avatar, Badge, Button, Col, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { incrementByAmount } from "./step.slice";
import { useTranslation } from "react-i18next";

export interface BadgeRoleProps {
  group: string[];
  groupCount: number[];
}

export const BadgeRole = ({ group, groupCount }: BadgeRoleProps) => {
  const step = useAppSelector((s) => s.step);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <>
      {step.value === 2 && (
        <>
          <hr />
          <Row>
            <Col span={12}></Col>
            <Col span={12}>
              <Row>
                {group.map((e: string) => (
                  <Col span={7} key={Math.random()}>
                    <Badge
                      count={groupCount[group.indexOf(e)]}
                      key={Math.random()}
                      overflowCount={999}
                    >
                      <Avatar shape="square" size="large">
                        {e}
                      </Avatar>
                    </Badge>
                  </Col>
                ))}

                <Col span={10}>
                  <Button onClick={() => dispatch(incrementByAmount(3))}>
                    {t("button.next")}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
        </>
      )}
    </>
  );
};
