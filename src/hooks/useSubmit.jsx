import { useState } from "react";
import axios from "axios";

export const useSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = async (url, data) => {
    setLoading(true);

    try {
      const res = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res)
      if (res.status >= 200 && res.status < 300) {
        setSuccess(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return { loading, error, success, submit };
};
