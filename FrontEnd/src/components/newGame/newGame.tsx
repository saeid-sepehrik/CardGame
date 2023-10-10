import { GameType, Scenario, Role, Step, BadgeRole, Done } from "./index";
import { useAppSelector } from "../../redux/hooks";

export const NewGame = () => {
  const step = useAppSelector((s) => s.step);
  return (
    <>
      <Step />
      <BadgeRole />
      {step.value == 0 && <GameType />}
      {step.value == 1 && <Scenario />}
      {step.value == 2 && <Role />}
      {step.value == 3 && <Done />}
    </>
  );
};
