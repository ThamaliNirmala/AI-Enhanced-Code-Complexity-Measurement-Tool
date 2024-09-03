import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ComplexityChart from "./ComplexityChart";
import HalsteadChart from "./HulsteadChart";
import MaintainabilityChart from "./MaintainabilityChart";

const Analytics = ({ analytics, ext }) => {
  const commonMethodAggregate =
    analytics?.reports?.[0]?.complexity?.methodAggregate;
  return (
    <div>
       <h1 className="text-[#696F79] font-bold text-base inter text-center">
        Code Complexity Measures
      </h1>
      <div className="bg-[#dce9f5] md:col-span-1 px-2 mt-4">
        <div className="p-2">
          {ext === ".js" || ext === ".jsx" ? (
            <>
              <ComplexityChart
                cyclomatic={commonMethodAggregate?.cyclomatic}
                density={commonMethodAggregate?.cyclomaticDensity}
              />
              <HalsteadChart
                bugs={commonMethodAggregate?.halstead?.bugs}
                difficulty={commonMethodAggregate?.halstead?.difficulty}
                sloc={analytics?.summary?.average?.sloc}
                warnings={analytics?.summary?.total?.jshint}
              />
              <MaintainabilityChart
                maintainabilityIndex={
                  analytics?.summary?.average?.maintainability
                }
              />
            </>
          ) : (
            <Markdown
              className="text-justify mt-4 leading-loose"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {analytics}
            </Markdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
