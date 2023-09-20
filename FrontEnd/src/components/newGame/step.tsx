import {
  OrderedListOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { incrementByAmount } from "./step.slice";

export interface dataProps {
  curentStep: number;
  setcurentStep: (curentStep: number) => void;
}
export const Step = () => {
  const step = useAppSelector((s) => s.step);
  const dispatch = useAppDispatch();

  return (
    <>
      <Steps
        current={step.value}
        labelPlacement="vertical"
        onChange={(c) => {
          dispatch(incrementByAmount(c));
        }}
        items={[
          {
            title: "Type",
            icon: <UserOutlined />,
          },
          {
            title: "Scenarion",
            icon: <SolutionOutlined />,
          },
          {
            title: "Roles",
            icon: <OrderedListOutlined />,
          },
          {
            title: "How to start?",
            icon: <SmileOutlined />,
          },
        ]}
      />
    </>
  );
};
