// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: {
    [process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL!]: {
      headers: process.env.HASURA_ADMIN_SECRET
        ? { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET }
        : {},
    },
  },
  documents: ['src/graphql/**/*.graphql'],
  generates: {
    'src/graphql/__generated__/': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
}

export default config
