'use client'

import { createClient } from '@nhost/nhost-js'

export const nhost = createClient({
  url: process.env.NEXT_PUBLIC_NHOST_BACKEND_URL!,
})
