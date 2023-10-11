import { Alert, Button, Form, Input, InputNumber, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const onFinish = (values: joinFormType) => {
    dispatch(setIncorrectCodeGame(false));
    setName(values.name);
    dispatch(getGamewithCode(values.code));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (playerSelector.dataGame.code > 0) {
      dispatch(
        joinPlayer({ name: name, id_game: playerSelector.dataGame._id })
      );
    }
  }, [playerSelector.dataGame]);

  useEffect(() => {
    if (localStorage.getItem("idPlayer") !== null) {
      navigate("/playerGame");
    }
  }, [playerSelector.dataPlayer]);

  useEffect(() => {
    if (playerSelector.incorrectCodeGame) console.log("code incorrect");
  }, [playerSelector.incorrectCodeGame]);

  return (
    <Row className="flex-1 justify-center border-2 m-10">
      {playerSelector.incorrectCodeGame && (
        <Alert
          message={t("player.alert.wrongCodeGametitle")}
          description={t("player.alert.wrongCodeGameDescription")}
          type="warning"
          showIcon
          closable
          afterClose={() => {
            dispatch(setIncorrectCodeGame(false));
          }}
        />
      )}
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<joinFormType>
          label={t("player.label.name")}
          rules={[{ required: true, message: t("player.alert.formNameEmpty") }]}
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item<joinFormType>
          label={t("player.label.code_game")}
          name="code"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          rules={[{ required: true, message: t("player.alert.formCodeEmpty") }]}
        >
          <InputNumber min={100000} max={999999} />
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-neutral" type="primary" htmlType="submit">
            {t("button.join")}
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};
