import {
  OrderedListOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { incrementByAmount } from "./step.slice";
import { useTranslation } from "react-i18next";

export interface StepProps {
  curentStep: number;
  setcurentStep: (curentStep: number) => void;
}
export const Step = () => {
  const step = useAppSelector((s) => s.step);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <>
      <Steps
        className="border-b-4"
        current={step.value}
        labelPlacement="vertical"
        onChange={(c) => {
          dispatch(incrementByAmount(c));
        }}
        items={[
          {
            title: `${t("steps.type")}`,
            icon: <UserOutlined />,
          },
          {
            title: `${t("steps.Scenarion")}`,
            icon: <SolutionOutlined />,
          },
          {
            title: `${t("steps.Roles")}`,
            icon: <OrderedListOutlined />,
          },
          {
            title: `${t("steps.done")}`,
            icon: <SmileOutlined />,
          },
        ]}
      />
    </>
  );
};
