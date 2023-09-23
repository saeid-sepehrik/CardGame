import { useEffect, useState } from "react";
import { appApi } from "../utility/appApi";

export const useFetchData = (endpoint: string, filter: string = "") => {
  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    (async function () {
      const resp = await appApi.get(`${endpoint}${filter}`);
      setData(resp.data.data);
    })();
  }, [endpoint, filter]);

  return data;
};
