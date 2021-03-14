/*
Custom hook made to GET data from database
*/
import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(); // data being fetched
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(); // Error

  useEffect(() => {
    fetch("http://localhost:3001" + url)
      .then((res) => res.json())
      .then((res) => setData(res))
      .then((_) => setLoading(false))
      .catch((err) => setError(err));
  }, [url]);
  return { data, loading, error };
}

export default useFetch;
