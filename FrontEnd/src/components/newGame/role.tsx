import { Card, Col, ConfigProvider, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useCallback, useEffect, useState } from 'react'
import { IRole } from '../../models/models';
import { CheckSquareOutlined } from '@ant-design/icons';

export interface dataProps {
    scenario: number,
    dataRoleSelected: IRole[],
    setdataRoleSelected: (dataRoleSelected: IRole[]) => void
    group: string[],
    groupCount: number[],
    setGroup: (group: string[]) => void,
    setgroupCount: (groupCount: number[]) => void
}

export const Role = ({ dataRoleSelected, setdataRoleSelected, scenario, group, setGroup, groupCount, setgroupCount }: dataProps) => {

    const [dataRole, setdataRole] = useState<IRole[]>([]);
    const [increaseItem, setincreaseItem] = useState('');

    useEffect(() => {
        (async function () {
            // setLoading(true);
            const resp = await fetch(
                `http://localhost:3000/api/role/${scenario}`
            );
            const json = await resp.json();
            setdataRole(json.data);

            const a: Array<string> = [];
            json.data.map((m: IRole) => {
                a.push(m.group as ' ')
            })
            const ba: Array<string> = [... new Set(a)]
            setGroup(ba);
        })();
    }, [scenario]);

    useEffect(() => {
        if (increaseItem !== '') {
            if (groupCount[0] === undefined) {
                const a: Array<number> = [];
                group.map(() => {
                    a.push(0);
                })
                group.map((g) => {
                    if (g === increaseItem)
                        a[group.indexOf(increaseItem)] += 1;
                })
                setgroupCount(a);
                setincreaseItem('');
            } else {
                const aaa: number[] = groupCount;
                group.map((g) => {

                    if (g === increaseItem)
                        aaa[group.indexOf(increaseItem)] += 1;
                })

                const bbb: Array<number> = [];
                let i = 0;
                aaa.forEach(element => {

                    bbb[i] = element;
                    i++;
                });

                setgroupCount(bbb);
                setincreaseItem('');
            }
        }
    }, [increaseItem])

    const removeRole = useCallback(
        (role: IRole) => {
            setdataRole(dataRole.filter((x: IRole) => x._id !== role._id));
        },
        [dataRole]

    );

    const setincrease = useCallback(
        (role: IRole) => {
            setincreaseItem(role.group as '');
        },
        [dataRoleSelected]
    );

    return (
        <>
            <Row gutter={[8, 8]}>
                <Col span={12} >
                    <Row gutter={[16, 16]}>
                        {
                            dataRole.map((r: IRole) => (
                                <Col key={Math.random()} xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }} >
                                    <ConfigProvider
                                        theme={{
                                            components: {
                                                Card: {
                                                    headerBg: r.color as 'blue',
                                                },
                                            }
                                        }}


                                    >
                                        <Card
                                            title={r.title}
                                            size='small'
                                            onClick={() => {
                                                const a: Array<IRole> = [...dataRoleSelected, r];
                                                setdataRoleSelected(a);
                                                if (r.just_one)
                                                    removeRole(r);
                                                setincrease(r);
                                            }}
                                            style={{ width: '100%', float: 'left', padding: '5px' }}
                                            cover={
                                                <img
                                                    alt="example"
                                                    src={r.pic_path as ''}
                                                />
                                            }
                                        >
                                        </Card>



                                    </ConfigProvider>


                                </Col>
                            ))
                        }
                    </Row>
                </Col>
                <Col span={12} >
                    <Row gutter={[16, 16]}>
                        {dataRoleSelected.map((r: IRole) => (
                            <Col key={Math.random()} xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 6 }} >
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Card: {
                                                headerBg: r.color as 'blue',
                                            },
                                        }
                                    }}
                                >
                                    <Card

                                        title={r.title}
                                        size='small'
                                        style={{ width: '100%', float: 'left', padding: '5px' }}
                                        cover={
                                            <img
                                                alt="example"
                                                src={r.pic_path as ''}
                                            />
                                        }
                                    >
                                        <Meta

                                            avatar={<CheckSquareOutlined />}
                                            title='SEL'
                                        />
                                    </Card>


                                </ConfigProvider>


                            </Col>
                        ))
                        }
                    </Row>
                </Col>
            </Row>
        </>
    )
}
