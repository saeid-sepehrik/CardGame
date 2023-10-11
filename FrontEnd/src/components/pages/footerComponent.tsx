import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Row } from "antd";

export const FooterComponent = () => {
  return (
    <>
      <Row
        gutter={[38, 38]}
        className="justify-around text-4xl"
        style={{ color: "#460448" }}
      >
        <YoutubeOutlined />
        <FacebookOutlined />
        <InstagramOutlined />
      </Row>
    </>
  );
};
