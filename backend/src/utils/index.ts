import fs from "fs";

export const readJsonFile = (filePath: string): any => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing the JSON file:", error);
    return null;
  }
};
