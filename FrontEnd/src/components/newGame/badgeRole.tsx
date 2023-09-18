import { Avatar, Badge, Button, Col, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { incrementByAmount } from './step.slice';



export interface dataProps {
    group: string[],
    groupCount: number[],
}


export const BadgeRole = ({ group, groupCount }: dataProps) => {
    const step = useAppSelector(s=>s.step);
    const dispatch = useAppDispatch();
    return (
        <>
            {
                step.value === 2 &&
                <>
                    <hr />
                    <Row>
                        <Col span={12}>

                        </Col>
                        <Col span={12}>
                            <Row>
                                {group.map((e: string) => (
                                    <Col span={7} key={Math.random()}>
                                        <Badge count={groupCount[group.indexOf(e)]} key={Math.random()} overflowCount={999}>
                                            <Avatar shape="square" size="large">{e}</Avatar>
                                        </Badge>
                                    </Col>
                                ))}

                                <Col span={10}>
                                    <Button onClick={() => dispatch(incrementByAmount(3))}>create</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <hr />
                </>

            }

        </>
    )
}