import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // ✅ Point directly to your Nhost Hasura GraphQL endpoint
  schema: {
    [process.env.NEXT_PUBLIC_NHOST_BACKEND_URL!]: {
      headers: {
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET!,
      },
    },
  },
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
        reactApolloVersion: 3, // works with Apollo v4
      },
    },
  },
};

export default config;
