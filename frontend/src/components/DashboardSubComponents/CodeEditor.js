// CodeEditor.js
import React, { useState, useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import hljs from "highlight.js/lib/core";
// Import languages
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import csharp from "highlight.js/lib/languages/csharp";
import php from "highlight.js/lib/languages/php";
import ruby from "highlight.js/lib/languages/ruby";
import go from "highlight.js/lib/languages/go";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import sql from "highlight.js/lib/languages/sql";
import bash from "highlight.js/lib/languages/bash";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import yaml from "highlight.js/lib/languages/yaml";
import markdown from "highlight.js/lib/languages/markdown";
import typescript from "highlight.js/lib/languages/typescript";
import shell from "highlight.js/lib/languages/shell";
import scala from "highlight.js/lib/languages/scala";
import kotlin from "highlight.js/lib/languages/kotlin";
import lua from "highlight.js/lib/languages/lua";
import r from "highlight.js/lib/languages/r";
import objectivec from "highlight.js/lib/languages/objectivec";
import swift from "highlight.js/lib/languages/swift";
import graphql from "highlight.js/lib/languages/graphql";
import { generateRandomFilename, languageExtensions } from "../helpers/helper";
import { Button, message } from "antd";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";

// Register languages
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("php", php);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("go", go);
hljs.registerLanguage("html", html);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("dockerfile", dockerfile);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("scala", scala);
hljs.registerLanguage("kotlin", kotlin);
hljs.registerLanguage("lua", lua);
hljs.registerLanguage("r", r);
hljs.registerLanguage("objectivec", objectivec);
hljs.registerLanguage("swift", swift);
hljs.registerLanguage("graphql", graphql);

const CodeEditor = ({ setFile, setIsEnabledUpload, isEnabledEditor }) => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [copied, setCopied] = useState(false);
  const textAreaRef = useRef(null);

  useEffect(() => {
    detectLanguage(code);
  }, [code]);

  const detectLanguage = (code) => {
    // Detect the language using highlight.js
    const detectedLanguage = hljs.highlightAuto(code).language;
    setLanguage(detectedLanguage || "text");
    handleSaveToState(detectedLanguage);
  };

  const handleCodeChange = (event) => {
    if (event.target.value.trim()) setIsEnabledUpload(false);
    else setIsEnabledUpload(true);
    setCode(event.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      message.info("Text copied to clipboard")

    });
  };

  const getFileExtension = (lang) => {
    return (languageExtensions[lang] || [".txt"])[0];
  };

  const handleSaveToState = (detectedLanguage) => {
    const filename = `${generateRandomFilename()}${getFileExtension(
      detectedLanguage
    )}`;
    const blob = new Blob([code], { type: "text/plain" });
    const file = new File([blob], filename, { type: "text/plain" });

    if (code) setFile(file); // Save file object to state
    else setFile(null);
  };

  const handleDownload = () => {
    const filename = `${generateRandomFilename()}${getFileExtension(language)}`;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  console.log("Lang", language);
  console.log("getFileExtension", getFileExtension(language));

  return (
    <div style={{ position: "relative", marginBottom: "1rem" }}>
      <textarea
        ref={textAreaRef}
        value={code}
        onChange={handleCodeChange}
        rows="10"
        style={{ width: "100%", fontFamily: "monospace" }}
        disabled={!isEnabledEditor}
        className={`${!isEnabledEditor && "cursor-not-allowed"}`}
        placeholder="Start typing your code here..."
      />
      <p className="inter">
        ⚠️ Automatic language detection with highlight might produce invalid
        responses, so consider setting the language explicitly when precision is
        critical. (Use File Upload)
      </p>
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          padding: "0.2rem",
          backgroundColor: "gray",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
       <CopyOutlined /> {language}
      </button>

      {code.trim() && (
        <Button
          onClick={handleDownload}
          style={{
            position: "absolute",
            top: "0",
            right: "100px", // Adjust position to not overlap with copy Button
            padding: "0.5rem",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
          icon={<DownloadOutlined />}
        >
          Download
        </Button>
      )}

      {code.trim() && (
        <>
          <SyntaxHighlighter language={language} style={solarizedlight}>
            {code}
          </SyntaxHighlighter>
        </>
      )}
    </div>
  );
};

export default CodeEditor;
