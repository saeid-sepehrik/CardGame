
import { useEffect, useState } from "react";
import Card from 'antd/es/card/Card'
import Meta from "antd/es/card/Meta";
import { Image } from "antd";
import { useNavigate } from "react-router-dom"

export const ListGame = () => {
    const [data, setdata] = useState<any>([]);
    useEffect(() => {
        (async function () {
            // setLoading(true);
            const resp = await fetch(
                `http://localhost:3000/api/gameType`
            );
            const json = await resp.json();

            setdata(json.data);
            console.log(json.data)
        })();
    }, []);

    const navigate = useNavigate();
    return (
        <>
            {data.map((m: any) => (
                <Card key={m.title} hoverable
                    onClick={() => navigate(`/${m.title}`)}
                    style={{ width: 240 }}
                    cover={<Image alt="example" src={m.pic_path} />}
                ><Meta title={m.title} /></Card >
            ))}
        </>
    );
}
