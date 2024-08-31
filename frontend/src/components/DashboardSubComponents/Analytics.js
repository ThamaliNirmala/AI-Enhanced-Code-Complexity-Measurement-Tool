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
    <div className="md:col-span-1 bg-[#FFFFFF]">
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
              effort={commonMethodAggregate?.halstead?.effort}
              volume={commonMethodAggregate?.halstead?.volume}
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
  );
};

export default Analytics;
