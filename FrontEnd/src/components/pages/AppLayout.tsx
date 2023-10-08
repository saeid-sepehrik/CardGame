import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

import { Layout, Menu, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./Home";
import { NewGame } from "../newGame/newGame";
import { Login } from "../auth/Login";
import { Game } from "../game/game";
import { JoinGame } from "../player/joinGame";
import { PlayerGame } from "../player/playerGame";
import { ProtectedRout } from "./protectedRout";
import { Main } from "../dashbord/main";
import { useState } from "react";
const { Header, Content, Footer, Sider } = Layout;

export const AppLayout = () => {
  const navigate = useNavigate();
  const [collapsedState, setcollapsedState] = useState(true);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        collapsed={collapsedState}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={() => {
          setcollapsedState(!collapsedState);
        }}
      >
        {/* <div className="demo-logo-vertical" /> */}
        <Menu
          onClick={(info) => {
            setcollapsedState(!collapsedState);
            navigate(info.key);
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={[
            {
              key: "/",
              icon: <UserOutlined />,
              label: "Home",
            },
            {
              key: "/newGame",
              icon: <VideoCameraOutlined />,
              label: "New Game",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          header
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route path="/newGame" element={<NewGame />} />
              <Route path="/login" element={<Login />} />
              <Route path="/game" element={<Game />} />
              <Route path="/joinGame" element={<JoinGame />} />
              <Route path="/playerGame" element={<PlayerGame />} />
              <Route
                path="/dashbord"
                element={
                  <ProtectedRout>
                    <Main />
                  </ProtectedRout>
                }
              />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
