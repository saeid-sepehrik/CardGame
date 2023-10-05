import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { NewGame } from "../newGame/newGame";
import { Footer } from "antd/es/layout/layout";
import { Login } from "../auth/Login";
import { Main } from "../dashbord/main";
import { ProtectedRout } from "./protectedRout";
import { HeaderComponent } from "./headerComponent";
import { Game } from "../game/game";
import { JoinGame } from "../player/joinGame";
import { PlayerGame } from "../player/playerGame";

const { Header, Content } = Layout;

export const AppLayout = () => {
  return (
    <Layout>
      <Header>
        <HeaderComponent />
      </Header>
      <Content>
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
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};
