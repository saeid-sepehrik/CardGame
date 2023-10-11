import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "./auth.slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Login = () => {
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) navigate("/dashbord");
  }, [auth]);

  interface login {
    email: string;
    password: string;
  }

  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };

  const onFinish = (values: login) => {
    dispatch(login(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
        <Form.Item<FieldType>
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
