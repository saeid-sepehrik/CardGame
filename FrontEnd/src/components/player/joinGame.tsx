import { Alert, Button, Form, Input, InputNumber } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import {
  getGamewithCode,
  joinPlayer,
  setIncorrectCodeGame,
} from "./player.slice";
import { useNavigate } from "react-router-dom";
export interface joinFormType {
  name: string;
  code: number;
}
export interface joinDataType {
  name: string;
  id_game: string;
}
export const JoinGame = () => {
  const dispatch = useAppDispatch();
  const playerSelector = useAppSelector((s) => s.player);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("idPlayer") !== null) {
      navigate("/playerGame");
    }
  }, [playerSelector.dataPlayer]);

  useEffect(() => {
    if (playerSelector.dataGame.code > 0) {
      dispatch(
        joinPlayer({ name: name, id_game: playerSelector.dataGame._id })
      );
    }
  }, [playerSelector.dataGame]);

  useEffect(() => {
    if (playerSelector.incorrectCodeGame) console.log("code incorect");
  }, [playerSelector.incorrectCodeGame]);

  const onFinish = (values: joinFormType) => {
    dispatch(setIncorrectCodeGame(false));
    setName(values.name);
    dispatch(getGamewithCode(values.code));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {playerSelector.incorrectCodeGame && (
        <Alert
          message="code game was not correct"
          description="Please check your code"
          type="warning"
          showIcon
          closable
          afterClose={() => {
            dispatch(setIncorrectCodeGame(false));
          }}
        />
      )}
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<joinFormType>
          label="player name"
          rules={[{ required: true, message: "Please input your name!" }]}
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item<joinFormType>
          label="code game"
          name="code"
          rules={[{ required: true, message: "Please input your code Game" }]}
        >
          <InputNumber min={100000} max={999999} style={{ width: 300 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            join
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
