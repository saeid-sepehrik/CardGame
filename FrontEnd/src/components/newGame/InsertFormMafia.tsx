import { Avatar, Badge, Button, Col, Divider, List, Row, Space, Steps } from 'antd'
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useCallback } from 'react'
import Card from 'antd/es/card/Card'
import Meta from "antd/es/card/Meta";
import { Image } from "antd";
import { Navigate, useNavigate } from 'react-router-dom';

// export interface IRole {
//     _id: String,
//     title: String,
//     title_fn: String,
//     is_active: Boolean,
//     mask_code_scenarios: Number,
//     just_one: Boolean,
//     pic_path: String,
//     dsc: String,
//     group: String,
//     color: String,

// }
// export interface dataProps {
//     curentStep: number;
//     setcurentStep: (curentStep: number) => void;
// }
export const InsertFormMafia = () => {
    // const [data, setdata] = useState<any>([]);
    // const [curentStep, setcurentStep] = useState(0);
    // const [gameType, setgameType] = useState(0);
    // const [scenario, setscenario] = useState(0);
    // const [dataSenario, setdataSenario] = useState<any>([]);
    // const [dataRole, setdataRole] = useState<any>([]);
    // const [dataRoleSelected, setdataRoleSelected] = useState<any>([]);
    // const [group, setGroup] = useState<any>([{}]);

    // useEffect(() => {
    //     (async function () {
    //         // setLoading(true);
    //         const resp = await fetch(
    //             `http://localhost:3000/api/gameType`
    //         );
    //         const json = await resp.json();

    //         setdata(json.data);

    //         // console.log(json.data)
    //     })();
    // }, []);

    // useEffect(() => {
    //     (async function () {
    //         // setLoading(true);
    //         const resp = await fetch(
    //             `http://localhost:3000/api/scenario/${gameType}`
    //         );
    //         const json = await resp.json();

    //         setdataSenario(json.data);

    //     })();
    // }, [gameType]);

    // useEffect(() => {
    //     (async function () {
    //         // setLoading(true);
    //         const resp = await fetch(
    //             `http://localhost:3000/api/role/${scenario}`
    //         );
    //         const json = await resp.json();

    //         setdataRole(json.data);

    //         let unique_values = json.data
    //             .map((item: any) => item.group)
    //             .filter(
    //                 (value: any, index: any, current_value: any) => current_value.indexOf(value) === index
    //             );
    //         // console.log("uniq value " + dataRole);
    //         //  setGroup(unique_values);
    //         let r: any = [];
    //         unique_values.forEach((e: any) => {
    //             r.push({ 'value': e, 'count': 0 })
    //         });
    //         setGroup(r);
    //     })();
    // }, [scenario]);

    // const removeRole = useCallback(
    //     (role: IRole) => {
    //         setdataRole(dataRole.filter((x: IRole) => x._id !== role._id));
    //     },
    //     [dataRole]
    // );
    // function createBadge() {
    //     //console.log(group);
    //     var tt: any = [];
    //     group.map((r: any) => {
    //         tt.push(<Badge count={r.count} key={Math.random()} overflowCount={999}>
    //             <Avatar shape="square" size="large">{r.value}</Avatar>
    //         </Badge>)
    //     });
    //     return tt
    // }

    // function setCountBadge() {

    //     console.log('1 ' + group);
    //     let groupV = group;
    //     groupV.forEach((w: any) => {
    //         w.count = 0;
    //     });
    //     groupV.forEach((g: any) => {
    //         dataRoleSelected.forEach((s: any) => {
    //             if (s.group == g.value)
    //                 g.count++;
    //         });
    //     });
    //     setGroup(groupV);
    //     console.log(group);
    //     console.log(groupV);
    // }

    return (
        <>

            {/* {
                createBadge()
            } */}

            {/* <Steps
                current={curentStep}
                labelPlacement='vertical'
                onChange={c => {
                    setcurentStep(c);
                    // console.log(c);
                }}
                items={[
                    {
                        title: 'Type',
                        icon: <UserOutlined />,
                    },
                    {
                        title: 'Scenarion',
                        icon: <SolutionOutlined />,
                    },
                    {
                        title: 'Roles',
                        icon: <LoadingOutlined />,
                    },
                    {
                        title: 'Done',
                        icon: <SmileOutlined />,
                    },
                ]}
            /> */}
            {/* {(gameType == 0 || curentStep == 0) &&
                (data.map((m: any) => (
                    <Card
                        key={m._id}
                        hoverable
                        onClick={() => {
                            setgameType(m._id);
                            setcurentStep(1);
                        }}
                        style={{ width: 240 }}
                        cover={<Image alt="example" src={m.pic_path} />}
                    >
                        <Meta title={m.title} />
                    </Card >
                )))
            } */}


            {/* {
                gameType != '' &&
                curentStep == 1 &&
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={dataSenario}
                    renderItem={(item: any) => (
                        <List.Item>
                            <Card
                                title={item.title}
                                onClick={() => {

                                    setscenario(item.code);
                                    // console.log("senario " + scenario)
                                    setcurentStep(2);

                                }}
                            >Card content
                            </Card>
                        </List.Item>
                    )
                    }

                />
            } */}

            {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={12} >
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        {
                            dataRole.map((r: any) => (
                                <Card
                                    onClick={() => {
                                        setdataRoleSelected([...dataRoleSelected, r]);
                                        setCountBadge();
                                        if (r.just_one)
                                            removeRole(r);
                                    }}
                                    key={r._id}
                                    style={{ width: 150, float: 'left', backgroundColor: r.color }}
                                    cover={
                                        <img
                                            alt="example"
                                            src={r.pic_path}
                                        />
                                    }
                                >
                                    <Meta
                                        title={r.title}
                                    />
                                </Card>
                            ))
                        }
                    </Row>
                </Col>
                <Col span={12} >
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>


                        {dataRoleSelected.map((r: any) => (
                            <Card
                                hoverable
                                key={Math.random()}
                                style={{ width: 150, float: 'left', backgroundColor: r.color }}
                                cover={
                                    <img
                                        alt="example"
                                        src={r.pic_path}
                                    />
                                }
                            >
                                <Meta
                                    title={r.title}
                                />
                            </Card>
                        ))

                        }

                    </Row>
                </Col >
            </Row > */}







            {
                // curentStep == 2 &&
                // scenario != 0 && (
                // console.log(group)
                // group.map((r: any) => {
                //     <Space>r</Space>
                //     //console.log(group)
                // })
                // )
            }

        </>
    )
}
