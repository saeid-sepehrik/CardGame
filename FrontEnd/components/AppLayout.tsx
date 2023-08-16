import { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Mafia } from "./pages/Mafia";
import { Home } from "./pages/Home";

const { Header, Sider, Content } = Layout;

export const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    onClick={(info) => navigate(info.key)}
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
                            key: "/Mafia",
                            icon: <VideoCameraOutlined />,
                            label: "Mafia",
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Home></Home>} />
                        <Route path="Mafia" element={<Mafia></Mafia>} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};