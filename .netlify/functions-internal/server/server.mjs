export { default } from "./main.mjs";
export const config = {
  name: "server handler",
  generator: "nitro@3.0.1-20260219-081345-4df7aab2",
  path: "/*",
  nodeBundler: "none",
  includedFiles: ["**"],
  excludedPath: ["/.netlify/*"],
  preferStatic: true,
};