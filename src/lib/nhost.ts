'use client'

import { createClient } from '@nhost/nhost-js'

export const nhost = createClient({
  backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND_URL!,
})
