import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button, Col, Row } from "antd";
import { logout } from "../auth/auth.slice";

export const HeaderComponent = () => {
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  return (
    <Row className="justify-center">
      <Col
        style={{ maxWidth: "390px", height: "65px" }}
        className="bg-no-repeat bg-cover bg-[url('../../../picture/background/header.png')]"
        span={24}
      >
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
