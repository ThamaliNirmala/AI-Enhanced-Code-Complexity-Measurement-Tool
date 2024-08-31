export const Greeting = ({ role }) => {
  const currentHour = new Date().getHours();

  let greeting;
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <h1 className="md:pt-24 pt-28 inter font-bold text-lg md:mx-32 mx-5">
      Hi, {greeting}! {role}
    </h1>
  );
};

export const languageExtensions = {
  javascript: [".js", ".jsx"],
  python: [".py"],
  java: [".java"],
  csharp: [".cs"],
  php: [".php"],
  ruby: [".rb"],
  go: [".go"],
  html: [".html", ".htm"],
  css: [".css"],
  json: [".json"],
  sql: [".sql"],
  bash: [".sh"],
  dockerfile: ["Dockerfile"],
  yaml: [".yaml", ".yml"],
  markdown: [".md"],
  typescript: [".ts", ".tsx"],
  shell: [".sh"],
  scala: [".scala"],
  kotlin: [".kt"],
  lua: [".lua"],
  r: [".r"],
  objectivec: [".m"],
  swift: [".swift"],
  htmlbars: [".hbs"],
  graphql: [".graphql", ".gql"],
  // Add more languages and their extensions as needed
};

export const generateRandomFilename = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `file_${timestamp}_${randomNum}`;
};
