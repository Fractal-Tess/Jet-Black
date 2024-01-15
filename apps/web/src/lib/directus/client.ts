import { createDirectus, authentication, rest } from '@directus/sdk'
import { env } from '$env/dynamic/public'
import type { Schema } from './schema'

export const directus = createDirectus<Schema>(env.PUBLIC_DIRECTUS_URL)
  .with(
    authentication('cookie', {
      autoRefresh: true,
      credentials: 'include'
    })
  )
  .with(rest())
