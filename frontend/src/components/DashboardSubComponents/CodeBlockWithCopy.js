import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlockWithCopy = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <CopyToClipboard text={value} onCopy={handleCopy}>
        <button className="absolute top-0 right-0 p-2 m-2 text-sm text-white bg-gray-700 rounded hover:bg-gray-600">
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter language={language} style={darcula}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlockWithCopy;
