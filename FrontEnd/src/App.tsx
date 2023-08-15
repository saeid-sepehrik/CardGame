import { useEffect, useState } from "react";
import Card from 'antd/es/card/Card'
import { AppstoreAddOutlined, LoginOutlined } from '@ant-design/icons';
import './App.css'
import Meta from "antd/es/card/Meta";
import { Button } from "antd";
// const i = [{ "id": 1, "title": "fffffffffffff", "pic": "picture/mafia.jpg" }]



function App() {
  const [data, setdata] = useState<any>([]);
  useEffect(() => {
    (async function () {
      // setLoading(true);
      const resp = await fetch(
        `http://localhost:8081/game_type`
      );
      const json = await resp.json();

      // setLoading(false);
      // setTotal(+(resp.headers.get("X-Total-Count") || "0"));
      setdata(json);
    })();
  }, []);

  return (
    <>
      {data.map((m: any) => (
        <Card key={m.id} hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={m.pic} />}
        ><Meta title={m.title} /></Card >
      ))
      }
      <Button type="primary" shape="round" icon={<AppstoreAddOutlined />}>ایجاد بازی جدید</Button>
      <Button type="primary" shape="round" icon={<LoginOutlined />}>ورود به بازی ایجاد شده</Button>
    </>
  )
}

export default App
