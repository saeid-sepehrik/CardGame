/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, ConfigProvider, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useCallback, useEffect, useState } from "react";
import { IRole } from "../../models/models";
import { CheckSquareOutlined } from "@ant-design/icons";
import { appApi } from "../../utility/appApi";
import { setDataRoleSelected } from "./role.slice";
import { useAppDispatch } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

export interface RoleProps {
  scenario: number;
  dataRoleSelected: IRole[];
  setdataRoleSelected: (dataRoleSelected: IRole[]) => void;
  group: string[];
  groupCount: number[];
  setGroup: (group: string[]) => void;
  setgroupCount: (groupCount: number[]) => void;
}

export const Role = ({
  dataRoleSelected,
  setdataRoleSelected,
  scenario,
  group,
  setGroup,
  groupCount,
  setgroupCount,
}: RoleProps) => {
  const [dataRole, setdataRole] = useState<IRole[]>([]);
  const [increaseItem, setincreaseItem] = useState("");
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  useEffect(() => {
    (async function () {
      // setLoading(true);
      const resp = await appApi.get(`role/${scenario}`);
      setdataRole(resp.data.data);

      const a: Array<string> = [];
      resp.data.data.map((m: IRole) => {
        a.push((m as any)["group_" + i18n.language]);
      });
      const ba: Array<string> = [...new Set(a)];
      setGroup(ba);
    })();
  }, [scenario, setGroup]);

  useEffect(() => {
    if (increaseItem !== "") {
      if (groupCount[0] === undefined) {
        const a: Array<number> = [];
        group.map(() => {
          a.push(0);
        });
        group.map((g) => {
          if (g === increaseItem) a[group.indexOf(increaseItem)] += 1;
        });
        setgroupCount(a);
        setincreaseItem("");
      } else {
        const aaa: number[] = groupCount;
        group.map((g) => {
          if (g === increaseItem) aaa[group.indexOf(increaseItem)] += 1;
        });

        const bbb: Array<number> = [];
        let i = 0;
        aaa.forEach((element) => {
          bbb[i] = element;
          i++;
        });

        setgroupCount(bbb);
        setincreaseItem("");
      }
    }
  }, [group, groupCount, increaseItem, setgroupCount]);

  const removeRole = useCallback(
    (role: IRole) => {
      setdataRole(dataRole.filter((x: IRole) => x._id !== role._id));
    },
    [dataRole]
  );

  const setincrease = useCallback(
    (role: IRole) => {
      setincreaseItem((role as any)["group_" + i18n.language]);
    },
    [dataRoleSelected]
  );

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            {dataRole.map((r: IRole) => (
              <Col
                key={Math.random()}
                xs={{ span: 12 }}
                sm={{ span: 12 }}
                md={{ span: 6 }}
                lg={{ span: 6 }}
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
                    title={(r as any)["title_" + i18n.language]}
                    size="small"
                    onClick={() => {
                      const a: Array<IRole> = [...dataRoleSelected, r];
                      setdataRoleSelected(a);
                      dispatch(setDataRoleSelected(a));
                      if (r.just_one) removeRole(r);
                      setincrease(r);
                    }}
                    style={{ width: "100%", float: "left", padding: "5px" }}
                    cover={<img alt="example" src={r.pic_path as ""} />}
                  ></Card>
                </ConfigProvider>
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            {dataRoleSelected.map((r: IRole) => (
              <Col
                key={Math.random()}
                xs={{ span: 12 }}
                sm={{ span: 12 }}
                md={{ span: 6 }}
                lg={{ span: 6 }}
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
                    title={(r as any)["title_" + i18n.language]}
                    size="small"
                    style={{ width: "100%", float: "left", padding: "5px" }}
                    cover={<img alt="example" src={r.pic_path as ""} />}
                  >
                    <Meta avatar={<CheckSquareOutlined />} title="SEL" />
                  </Card>
                </ConfigProvider>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};
