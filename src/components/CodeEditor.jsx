import { useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useDebouncedCallback } from "use-debounce";

const CodeEditor = ({ code, setCode, language }) => {
  const handleChange = useDebouncedCallback((e) => {
    setCode(e);
  }, 1000);

  useEffect(() => {
    switch (language) {
      case "java":
        setCode(
          "public class Main {\n\tpublic static void main(String[] args) {\n\t\t// Code here\n\t}\n}"
        );
        break;
      case "python":
        setCode("# Code here");
        break;
      case "c":
        setCode("#include <stdio.h>\n\nint main() {\n\t// Code here\n\treturn 0;\n}");
        break;
      case "cpp":
        setCode("#include <iostream>\n\nint main() {\n\t// Code here\n\treturn 0;\n}");
        break;
      case "javascript":
        setCode("// Code here");
        break;
      default:
        setCode("");
        break;
    }
  }, [language]);

  return (
    <div className="h-96">
      <Editor
        value={code}
        height="100%"
        width="100%"
        language={language}
        theme="vs-dark"
        onChange={handleChange}
        options={{
          inlineSuggest: true,
          fontSize: "16px",
          formatOnType: true,
          autoClosingBrackets: true,
          minimap: { scale: 5 },
        }}
      />
    </div>
  );
};

export default CodeEditor;
