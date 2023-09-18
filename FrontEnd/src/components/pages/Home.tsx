
import { AppstoreAddOutlined, LoginOutlined } from '@ant-design/icons';
import { Button } from "antd";
import { useNavigate } from "react-router-dom";


export const Home = () => {

    const navigate = useNavigate();

    // const toggleShowComponents = () => {
    //     setshowListGame(!showListGame);

    // };
    return (
        <>
            <Button onClick={() => navigate('/newGame')} type="primary" shape="round" icon={<AppstoreAddOutlined />}>create new</Button>
            <Button type="primary" shape="round" icon={<LoginOutlined />}>join to game</Button>

            {/* {showListGame && <ListGame></ListGame>} */}
        </>
    )
}