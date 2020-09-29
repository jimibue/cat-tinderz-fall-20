import React, { useState, useEffect } from "react";
import axios from "axios";
export const useAxiosOnMount = (
  // url,
  // defualtOptions = { method: "get" },
  defualtOptions,
  manual = false
) => {
  const [response, setResponse] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const refetch = async (options = defualtOptions) => {
    setLoading(true);
    try {
      const res = await axios({
        // url,
        ...options,
        manual,
      });
      // const res = await axios.get(url);
      setResponse(res);
      setData(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!manual) {
      refetch();
    }
  }, []);
  return [{ data, response, loading, error, setData }, refetch];
};
