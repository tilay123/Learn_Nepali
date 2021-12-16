import path from "path";
import fs from "fs";

export const getUrlFromTitle = (lessonPath, pathName) =>
  `/${lessonPath}/` + pathName.toLocaleLowerCase().split(" ").join("");

export const getLowerCaseTitle = (str) =>
  str.toLocaleLowerCase().split(" ").join("");

export const getLessonContents = (fileName) => {
  const filePath = path.join(process.cwd(), "data", `${fileName}.json`);
  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content);
};
