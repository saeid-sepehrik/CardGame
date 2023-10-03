import { useState } from "react";

import { GameType, Scenario, Role, Step, BadgeRole, Done } from "./index";

import { IRole } from "../../models/models";
import { useAppSelector } from "../../redux/hooks";

export const NewGame = () => {
  const [gameTypeId, setgameTypeId] = useState("");
  const [scenario, setscenario] = useState(0);
  const [groupCount, setgroupCount] = useState<number[]>([]);
  const [group, setGroup] = useState<string[]>([""]);
  const [dataRoleSelected, setdataRoleSelected] = useState<IRole[]>([]);

  const step = useAppSelector((s) => s.step);
  return (
    <>
      <Step />
      <BadgeRole groupCount={groupCount} group={group}></BadgeRole>
      <GameType setgameTypeId={setgameTypeId}></GameType>
      {step.value == 1 && (
        <Scenario gameTypeId={gameTypeId} setscenario={setscenario}></Scenario>
      )}
      {step.value == 2 && (
        <Role
          dataRoleSelected={dataRoleSelected}
          setdataRoleSelected={setdataRoleSelected}
          groupCount={groupCount}
          setgroupCount={setgroupCount}
          group={group}
          setGroup={setGroup}
          scenario={scenario}
        ></Role>
      )}
      {step.value == 3 && (
        <Done
          gameTypeId={gameTypeId}
          scenario={scenario}
          dataRoleSelected={dataRoleSelected}
        ></Done>
      )}
    </>
  );
};
