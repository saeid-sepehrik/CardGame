/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, ConfigProvider, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useCallback, useEffect, useState } from "react";
import { IRole } from "../../models/models";
import {
  setDataRole,
  setDataRoleNewGame,
  setDataRoleSelected,
  setgroupCount,
} from "./newGame.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

export const Role = () => {
  const [increaseItem, setincreaseItem] = useState("");
  const dispatch = useAppDispatch();
  const newGameSelector = useAppSelector((s) => s.newGame);
  const { i18n } = useTranslation();
  useEffect(() => {
    dispatch(
      setDataRoleNewGame({
        code: newGameSelector.scenarioSelected.code,
        lang: i18n.language,
      })
    );
  }, [newGameSelector.scenarioSelected]);

  useEffect(() => {
    if (increaseItem !== "") {
      if (newGameSelector.groupCount[0] === undefined) {
        const a: Array<number> = [];
        newGameSelector.group.map((g) => {
          if (g === increaseItem) {
            a.push(1);
          } else {
            a.push(0);
          }
        });
        dispatch(setgroupCount(a));
        setincreaseItem("");
      } else {
        const aaa = [...newGameSelector.groupCount];
        newGameSelector.group.map((g) => {
          if (g === increaseItem) {
            aaa[newGameSelector.group.indexOf(increaseItem)] += 1;
          }
        });
        dispatch(setgroupCount(aaa));
        setincreaseItem("");
      }
    }
  }, [newGameSelector.roleSelected]);

  const removeRole = useCallback(
    (role: IRole) => {
      dispatch(
        setDataRole(
          newGameSelector.dataRole.filter((x: IRole) => x._id !== role._id)
        )
      );
    },
    [newGameSelector.dataRole]
  );

  const setincrease = useCallback(
    (role: IRole) => {
      setincreaseItem((role as any)["group_" + i18n.language]);
    },
    [newGameSelector.roleSelected]
  );

  return (
    <>
      <Row gutter={[8, 8]}>
        {newGameSelector.roleSelected.map((rs) => (
          <Col key={Math.random()} xs={12} sm={8} md={8} lg={6} xl={6}>
            <Card style={{ backgroundColor: `${rs.color}` }}>
              {(rs as any)["title_" + i18n.language]}
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {newGameSelector.dataRole.map((r: IRole) => (
          <Col
            key={Math.random()}
            xs={{ span: 12 }}
            sm={{ span: 8 }}
            md={{ span: 6 }}
            lg={{ span: 4 }}
          >
            <ConfigProvider
              theme={{
                components: {
                  Card: {
                    headerBg: r.color as "blue",
                  },
                },
              }}
            >
              <Card
                size="small"
                onClick={() => {
                  dispatch(
                    dispatch(
                      setDataRoleSelected([...newGameSelector.roleSelected, r])
                    )
                  );
                  if (r.just_one) removeRole(r);
                  setincrease(r);
                }}
                style={{ width: "100%", float: "left", padding: "5px" }}
                cover={<img alt="example" src={r.pic_path as ""} />}
              >
                <Meta title={(r as any)["title_" + i18n.language]} />
              </Card>
            </ConfigProvider>
          </Col>
        ))}
      </Row>
    </>
  );
};
