import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const CodeSubmissions = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/snippets`
        );
        setSnippets(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message);
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (snippets.length === 0)
    return <p className="mt-5 text-xl">No submissions yet</p>;
  return (
    <div>
      <table className="table-auto w-full my-6 ">
        <thead>
          <tr className="bg-neutral-100">
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Language</th>
            <th className="px-4 py-2">Input</th>
            <th className="px-4 py-2">Code</th>
            <th className="px-4 py-2">Output</th>
            <th className="px-4 py-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {snippets.map((snippet) => (
            <tr key={snippet._id} className="even:bg-blue-50 text-center">
              <td className="px-4 py-2">{snippet.username}</td>
              <td className="px-4 py-2">{snippet.language}</td>
              <td className="px-4 py-2">{snippet.stdin}</td>
              <td className="px-4 py-2">
                {snippet.code.substring(0, 50) + "..."}
              </td>
              <td className="px-4 py-2 whitespace-pre-wrap">
                {snippet.stdout.substr(0, 100)}
              </td>
              <td className="px-4 py-2">
                {formatDistanceToNow(new Date(snippet.createdAt), {
                  addSuffix: true,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CodeSubmissions;
