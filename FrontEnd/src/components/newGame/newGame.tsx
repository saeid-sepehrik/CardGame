import { useState } from 'react'
import { GameType } from './GameType';
import { Scenario } from './scenario';
import { Role } from './role';
import { Step } from './step';
import { BadgeRole } from './badgeRole';
import { Done } from './done';
import { IRole } from '../../models/models';
import {useAppSelector } from '../../redux/hooks';

export const NewGame = () => {
    const [gameType, setgameType] = useState("");
    const [gameTypeName, setgameTypeName] = useState("");
    const [scenario, setscenario] = useState(0);
    const [scenarioName, setscenarioName] = useState("");
    const [groupCount, setgroupCount] = useState<number[]>([]);
    const [group, setGroup] = useState<string[]>(['']);
    const [dataRoleSelected, setdataRoleSelected] = useState<IRole[]>([]);

    const step = useAppSelector(s=>s.step);
    return (
        <>
            <Step/>
            <BadgeRole groupCount={groupCount} group={group}></BadgeRole>
            <GameType setgameTypeName={setgameTypeName} gameType={gameType} setgameType={setgameType} ></GameType >
            <Scenario setscenarioName={setscenarioName} gameType={gameType} setscenario={setscenario}></Scenario >
            {step.value == 2 &&
                <Role dataRoleSelected={dataRoleSelected} setdataRoleSelected={setdataRoleSelected} groupCount={groupCount} setgroupCount={setgroupCount} group={group} setGroup={setGroup} scenario={scenario}></Role >}
            {
                step.value == 3 &&
                <Done scenario={scenario} gameTypeName={gameTypeName} scenarioName={scenarioName} dataRoleSelected={dataRoleSelected}></Done>
            }
        </>
    )
} 