import { useEffect, useState } from 'react'
import { IGame, IRole } from '../../models/models';
export interface dataProps {
    scenario: number;
    gameTypeName: string;
    scenarioName: string;
    dataRoleSelected: IRole[],
}

export const Done = (
    { scenario, gameTypeName, scenarioName, dataRoleSelected }
    : dataProps
) => {

    const [game, setgame] = useState<IGame>();

    useEffect(() => {
        (async function () {
            // setLoading(true);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code_scenario: scenario,
                    title_game_type: gameTypeName,
                    title_scenario: scenarioName,
                    status: 1,
                    code: Math.floor(100000 + Math.random() * 900000)
                })
            };
            const resp = await fetch(
                `http://localhost:3000/api/game/`, requestOptions
            );
            const json = await resp.json();
            console.log(json);
            setgame(json.data);
        })();
    }, []);


    useEffect(() => {
        if (game !== undefined)
            if (game.code > 0) {
                dataRoleSelected.forEach(drs => {
                    (async function () {
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id_game: game._id,
                                id_role: drs._id,
                                status: 1,
                            })
                        };
                        const resp = await fetch(
                            `http://localhost:3000/api/gameRole/`, requestOptions
                        );
                        const json = await resp.json();
                        console.log(json);

                    })();
                });
            }
    }, [game]);


    return (
        <>
            <h1>Game created successful</h1>
            {game !== undefined &&
                game?.code > 0 &&
                <h2>Code game for join : </h2>}
        </>
    )
}
