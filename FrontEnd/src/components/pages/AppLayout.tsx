import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

import { Layout, Menu } from "antd";
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
import { HeaderComponent } from "./headerComponent";
import { FooterComponent } from "./footerComponent";
import { Setting } from "./setting";
import { useTranslation } from "react-i18next";

const { Header, Content, Footer, Sider } = Layout;

export const AppLayout = () => {
  const navigate = useNavigate();
  const [collapsedState, setcollapsedState] = useState(true);
  const { t } = useTranslation();

  return (
    <Layout className="bg-transparent">
      <Sider
        collapsed={collapsedState}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={() => {
          setcollapsedState(!collapsedState);
        }}
      >
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
              label: `${t("common.label.home")}`,
            },
            {
              key: "/newGame",
              icon: <VideoCameraOutlined />,
              label: `${t("common.label.newGame")}`,
            },
            {
              key: "/setting",
              icon: <VideoCameraOutlined />,
              label: `${t("common.label.setting")}`,
            },
          ]}
        />
      </Sider>
      <Layout className="bg-transparent" style={{ minHeight: "97vh" }}>
        <Header className="bg-transparent p-0">
          <HeaderComponent />
        </Header>
        <Content
          style={{
            // minHeight: "100%",
            borderColor: "#670568",
            // display: "table",
          }}
          className="m-0 border-8 border-solid bg-[url('../../../picture/background/bk.jpg')]"
        >
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/newGame" element={<NewGame />} />
            <Route path="/login" element={<Login />} />
            <Route path="/game" element={<Game />} />
            <Route path="/joinGame" element={<JoinGame />} />
            <Route path="/playerGame" element={<PlayerGame />} />
            <Route path="/setting" element={<Setting />} />
            <Route
              path="/dashbord"
              element={
                <ProtectedRout>
                  <Main />
                </ProtectedRout>
              }
            />
          </Routes>
        </Content>
        <Footer className="py-2 bg-transparent">
          <FooterComponent />
        </Footer>
      </Layout>
    </Layout>
  );
};
