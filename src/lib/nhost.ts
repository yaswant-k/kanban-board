'use client'

import { createClient } from '@nhost/nhost-js'

export const nhost = createClient({
  // ✅ This is the correct config key in v4+
  backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND_URL!,
})
