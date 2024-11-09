import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: import.meta.env.VITE_API_URI,
  documents: ["src/**/*.{gql,graphql,tsx,ts}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/__generated__/types.ts": {
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
