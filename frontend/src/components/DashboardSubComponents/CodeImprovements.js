import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import CodeBlockWithCopy from "./CodeBlockWithCopy";

const CodeImprovements = ({ aiSuggestedData, fileName }) => {
  return (
    <>
      <div className="md:col-span-2">
        <h1 className="text-[#696F79] font-bold text-base inter text-center">
          Suggested Code Improvements and Comments for <u>({fileName})</u>
        </h1>
        <div className="bg-[#FFFFFF] mt-4 p-2">
          <Markdown
            className="text-justify mt-4 leading-loose"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <CodeBlockWithCopy
                    language={match[1]}
                    value={String(children).replace(/\n$/, "")}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {aiSuggestedData}
          </Markdown>
        </div>
      </div>
    </>
  );
};

export default CodeImprovements;
