import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { gql } from "graphql-tag";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readTypeDefs = () => {
  return gql(
    readFileSync(path.resolve(__dirname, "../schema.graphql"), {
      encoding: "utf-8",
    }),
  );
};
