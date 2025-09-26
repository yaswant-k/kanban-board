import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_NHOST_BACKEND_URL!,
  documents: ['src/graphql/**/*.graphql'],
  generates: {
    'src/graphql/__generated__/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        reactApolloVersion: 3, // ✅ use v3 compat (works with Apollo v4)
      },
    },
  },
};
export default config;
