import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { NewGame } from "../newGame/newGame";
import { Footer } from "antd/es/layout/layout";
import { Login } from "../auth/Login";
import { Main } from "../dashbord/main";

const { Header, Content } = Layout;

export const AppLayout = () => {
  return (
    <Layout>
      <Header> header </Header>
      <Content>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/newGame" element={<NewGame />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashbord" element={<Main />} />
        </Routes>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};
