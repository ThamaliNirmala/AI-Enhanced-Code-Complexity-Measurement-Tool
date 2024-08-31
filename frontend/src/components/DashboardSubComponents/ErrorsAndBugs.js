import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const ErrorsAndBugs = ({ bugs }) => {
  return (
    <div className="md:col-span-1 bg-[#FFFFFF]">
      <div className="p-2">
        <Markdown
          className="text-justify mt-4 leading-loose"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {bugs}
        </Markdown>
      </div>
    </div>
  );
};

export default ErrorsAndBugs;
