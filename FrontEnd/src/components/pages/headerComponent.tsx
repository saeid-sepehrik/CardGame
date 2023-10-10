import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button, Col, Row, Select } from "antd";
import { logout } from "../auth/auth.slice";
import { useTranslation } from "react-i18next";

export const HeaderComponent = () => {
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  const onChange = (value?: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Row className="justify-center">
      <Col
        style={{ maxWidth: "390px" }}
        className="bg-no-repeat bg-cover bg-[url('../../../picture/background/header.png')]"
        span={24}
      >
        <Select
          showSearch
          optionFilterProp="children"
          onChange={onChange}
          defaultValue={i18n.language}
          options={[
            {
              value: "en",
              label: "en",
              icon: "<StepForwardOutlined />",
            },
            {
              value: "fa",
              label: "fa",
            },
          ]}
        />
        {auth.token && (
          <Button
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </Button>
        )}
      </Col>
    </Row>
  );
};
