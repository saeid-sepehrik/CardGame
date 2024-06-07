import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { NewGame } from "../newGame/newGame";
import { Login } from "../auth/Login";
import { Game } from "../game/game";
import { JoinGame } from "../player/joinGame";
import { PlayerGame } from "../player/playerGame";
import { ProtectedRout } from "./protectedRout";
import { Main } from "../dashbord/main";
import { HeaderComponent } from "./headerComponent";
import { FooterComponent } from "./footerComponent";
import { Setting } from "./setting";

const { Header, Content, Footer } = Layout;

export const AppLayout = () => {
  return (
    <Layout className="bg-transparent">
      <Layout className="bg-transparent" style={{ minHeight: "97vh" }}>
        <Header className="bg-transparent p-0 h-12">
          <HeaderComponent />
        </Header>
        <Content
          style={{
            borderColor: "#670568",
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
