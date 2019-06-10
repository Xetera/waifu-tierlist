import { useState } from "react";

export default (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const request = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  };
  return { data, request, loading };
};
