import { Col, Row, Select } from "antd";
import { useTranslation } from "react-i18next";

export const Setting = () => {
  const { i18n, t } = useTranslation();

  const onChange = (value?: string) => {
    i18n.changeLanguage(value);
  };
  return (
    <>
      <Row className="border-2 m-5 p-4 justify-start">
        <Col span={6}>{t("common.label.language")} : </Col>
        <Col span={18}>
          <Select
            showSearch
            optionFilterProp="children"
            onChange={onChange}
            defaultValue={i18n.language}
            options={[
              {
                value: "en",
                label: `${t("common.label.english")}`,
                icon: "<StepForwardOutlined />",
              },
              {
                value: "fa",
                label: `${t("common.label.persian")}`,
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};
