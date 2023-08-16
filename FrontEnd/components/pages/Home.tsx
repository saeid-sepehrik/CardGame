import { useState } from "react";
import { AppstoreAddOutlined, LoginOutlined } from '@ant-design/icons';
import { Button } from "antd";
import { ListGame } from "../ListGame"


export const Home = () => {

    const [showListGame, setshowListGame] = useState(false);

    const toggleShowComponents = () => {
        setshowListGame(!showListGame);

    };
    return (
        <>
            <Button onClick={toggleShowComponents} type="primary" shape="round" icon={<AppstoreAddOutlined />}>ایجاد بازی جدید</Button>
            <Button type="primary" shape="round" icon={<LoginOutlined />}>ورود به بازی ایجاد شده</Button>
            <Button type="primary" shape="round" icon={<LoginOutlined />}>بازگشت</Button>

            {showListGame && <ListGame></ListGame>}
        </>
    )
}