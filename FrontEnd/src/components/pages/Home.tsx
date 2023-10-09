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
        className="btn btn-accent btn-outline"
        type="primary"
        onClick={() => navigate("/newGame")}
        icon={<AppstoreAddOutlined />}
      >
        {t("button.create_game")}
      </Button>

      <Button
        className="btn btn-accent btn-outline"
        onClick={() => navigate("/joinGame")}
        type="primary"
        icon={<LoginOutlined />}
      >
        {t("button.join_game")}
      </Button>
    </>
  );
};
