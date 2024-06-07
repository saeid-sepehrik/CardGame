import { Col, Drawer, Row } from "antd";
import { useState } from "react";
import {
  MenuOutlined,
  HomeOutlined,
  SettingOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const HeaderComponent = () => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <Row className="justify-center h-12">
      <Col className="h-12 absolute start-2.5">
        <Drawer
          contentWrapperStyle={{ height: "auto" }}
          drawerStyle={{ backgroundColor: "#f4ddf9" }}
          title={`${t("common.label.menu")}`}
          placement={"top"}
          width={500}
          onClose={onClose}
          open={open}
        >
          <Row justify="space-between">
            <Col
              span={6}
              onClick={() => {
                navigate("/");
                setOpen(false);
              }}
            >
              <HomeOutlined className="pe-1" />
              {t("common.label.home")}
            </Col>
            <Col
              span={6}
              onClick={() => {
                navigate("/newGame");
                setOpen(false);
              }}
            >
              <PlaySquareOutlined className="pe-1" />
              {t("common.label.newGame")}
            </Col>
            <Col
              span={6}
              onClick={() => {
                navigate("/setting");
                setOpen(false);
              }}
            >
              <SettingOutlined className="pe-1" />
              {t("common.label.setting")}
            </Col>
          </Row>
        </Drawer>
        <MenuOutlined onClick={showDrawer} />
      </Col>
      <Col className="bg-no-repeat w-60 bg-contain bg-bottom bg-[url('../../../picture/background/header.png')]"></Col>
    </Row>
  );
};
