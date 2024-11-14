import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [import.meta.env.VITE_API_URI, "./src/schema.graphql"],
  documents: ["src/**/*.{gql,graphql,tsx,ts}"],
  generates: {
    "./src/apollo/generated/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/apollo/generated/types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
