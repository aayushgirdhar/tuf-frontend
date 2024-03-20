import React, { useEffect, useRef, useState } from "react";
import CodeEditor from "./CodeEditor";
import Loader from "./Loader";
import { useSubmit } from "../hooks/useSubmit";
import { codeRunner } from "../utils/CodeRunner";

const CodeForm = () => {
  const formRef = useRef(null);
  const { loading, error, submit } = useSubmit();
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [stdin, setStdin] = useState("");
  const [code, setCode] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [output, setOutput] = useState(null);
  const [outputLoading, setOutputLoading] = useState(false);

  const languages = [
    { name: "C", id: 50, value: "c" },
    { name: "C++", id: 54, value: "cpp" },
    { name: "Java", id: 62, value: "java" },
    { name: "Python", id: 71, value: "python" },
    { name: "JavaScript", id: 93, value: "javascript" },
  ];

  useEffect(() => {
    if (submitError) {
      const timeoutId = setTimeout(() => setSubmitError(false), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [submitError]);

  const handleRun = async (e) => {
    e.preventDefault();
    const language_id = languages.find((lang) => lang.value === language)?.id;
    if (language_id === undefined) {
      setSubmitError({
        msg: "Please choose a language",
      });
      setOutputLoading(false);
      return;
    }
    setOutputLoading(true);
    if (code === "") {
      setSubmitError({
        msg: "Please enter a code",
      });
      setOutputLoading(false);
      return;
    }
    try {
      const stdout = await codeRunner(btoa(code), btoa(stdin), language_id);
      setOutput(stdout);
      setOutputLoading(false);
    } catch (error) {
      setSubmitError({
        msg: error.message,
      });
      setOutputLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      setSubmitError({
        msg: "Please enter a username",
      });
      return;
    }
    if (language === "") {
      setSubmitError({
        msg: "Please choose a language",
      });
      return;
    }
    const language_id = languages.find((lang) => lang.value === language)?.id;
    const data = {
      username,
      language_id,
      language,
      stdin,
      code,
    };
    const url = import.meta.env.VITE_API_URL + "/snippets/create";
    try {
      await submit(url, data);
      setCode("");
      setStdin("");
      setUsername("");
      setLanguage("");
      setOutput(null);
    } catch (error) {
      setSubmitError({
        msg: "Submission failed. Please try again later.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="my-10 w-[50%] mx-auto flex flex-col gap-4"
    >
      <div className="row flex justify-between items-center ">
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          className="px-3 py-2 w-[47%] rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <select
          name="language"
          value={language || ""}
          className="w-[47%] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="" disabled>
            Select Language
          </option>
          {languages.map((lang) => (
            <option key={lang.id} value={lang.value}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <CodeEditor code={code} setCode={setCode} language={language} />
      <textarea
        name="stdin"
        id="stdin"
        placeholder="Custom Input"
        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        onChange={(e) => setStdin(e.target.value)}
      />
      {output && (
        <div className="px-5 py-3 border rounded-md border-green-500 bg-green-50 text-green-500">
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      )}
      {error && (
        <p className="px-5 py-3 border rounded-md border-red-500 bg-red-50 text-red-500">
          {error}
        </p>
      )}
      {submitError && (
        <p className="px-5 py-3 border rounded-md border-red-500 bg-red-50 text-red-500">
          {submitError.msg}
        </p>
      )}
      <div className="flex gap-10">
        <button
          type="button"
          onClick={handleRun}
          className="w-full h-12 rounded-md bg-green-500 text-white font-medium"
        >
          {outputLoading ? <Loader /> : "Run"}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-md bg-blue-500 text-white font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CodeForm;
