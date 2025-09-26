// ✅ src/lib/nhost.ts
'use client'

import { createNhostClient } from '@nhost/nhost-js'

export const nhost = createNhostClient({
  backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND_URL!,
})
