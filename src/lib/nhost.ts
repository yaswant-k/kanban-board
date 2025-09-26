'use client'

import { createClient } from '@nhost/nhost-js'

export const nhost = createClient({
  subdomain: 'vndputnsmkcqzjahwihz',       // ← from your backend URL
  region: 'us-west-2'                      // ← also from your backend URL
})
