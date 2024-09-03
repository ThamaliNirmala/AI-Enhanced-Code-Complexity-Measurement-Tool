import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const ErrorsAndBugs = ({ bugs }) => {
  return (
    <div>
      <h1 className="text-[#696F79] font-bold text-base inter text-center  ">
        Potential errors and bugs
      </h1>
      <div className="md:col-span-1 bg-[#dce9f5] px-2 mt-4">
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
    </div>
  );
};

export default ErrorsAndBugs;
