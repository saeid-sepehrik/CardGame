import { AppstoreAddOutlined, LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Button
        className="btn"
        onClick={() => navigate("/newGame")}
        type="primary"
        shape="round"
        icon={<AppstoreAddOutlined />}
      >
        {t("button.create_game")}
      </Button>

      <Button
        onClick={() => navigate("/joinGame")}
        type="primary"
        shape="round"
        icon={<LoginOutlined />}
      >
        {t("button.join_game")}
      </Button>
    </>
  );
};
