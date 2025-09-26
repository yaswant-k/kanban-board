import type { CodegenConfig } from '@graphql-codegen/cli'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' }) // ✅ ensures env vars are loaded

const config: CodegenConfig = {
  schema: [
    {
      [process.env.NEXT_PUBLIC_NHOST_BACKEND_URL!]: {
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET!,
        },
      },
    },
  ],
  documents: ['src/graphql/**/*.graphql'],
  generates: {
    'src/graphql/__generated__/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        reactApolloVersion: 3,
      },
    },
  },
}

export default config
