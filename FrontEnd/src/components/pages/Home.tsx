import { AppstoreAddOutlined, LoginOutlined } from "@ant-design/icons";
import { Button, Col, Image, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Row justify="space-evenly" style={{}}>
        <Col className="w-full">
          <Image src="../../../picture/background/mafia.gif"></Image>
        </Col>
        <Button
          className="btn btn-neutral"
          type="primary"
          onClick={() => navigate("/newGame")}
          icon={<AppstoreAddOutlined />}
        >
          {t("button.create_game")}
        </Button>
        <Button
          className="btn btn-neutral"
          onClick={() => navigate("/joinGame")}
          type="primary"
          icon={<LoginOutlined />}
        >
          {t("button.join_game")}
        </Button>
      </Row>
    </>
  );
};
