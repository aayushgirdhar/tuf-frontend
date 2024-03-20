import axios from "axios";

export const codeRunner = async (base64Code, base64Stdin, language) => {
  const postOptions = {
    method: "POST",
    url: import.meta.env.VITE_JUDGE0_API_URL + "submissions",
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
    },
    data: {
      language_id: language,
      source_code: base64Code,
      stdin: base64Stdin,
    },
  };

  const response = await axios.request(postOptions);

  const submissionId = response.data.token;

  const getOptions = {
    method: "GET",
    url:
      import.meta.env.VITE_JUDGE0_API_URL + "submissions/" + `${submissionId}`,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
    },
  };

  const res = await axios.request(getOptions);

  return atob(res.data.stdout);
};
