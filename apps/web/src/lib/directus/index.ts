import { authentication, createDirectus, rest } from '@directus/sdk'
import { env } from '$env/dynamic/public'
import type { Schema } from './schema'
export * from './schema'
export * from './utils'

export const directus = createDirectus<Schema>(env.PUBLIC_DIRECTUS_URL)
  .with(
    authentication('cookie', {
      autoRefresh: true,
      credentials: 'include'
    })
  )
  .with(rest())
