import { authentication, createDirectus, readItems, rest } from '@directus/sdk'
import { env } from '$env/dynamic/public'
import type { Schema } from './schema'
export * from './schema'
export * from './utils'

let token = ''

export const directus = createDirectus<Schema>(env.PUBLIC_DIRECTUS_URL)
  .with(rest())
  .with(
    authentication('cookie', {
      autoRefresh: true,
      credentials: 'include',
      storage: {
        get: async () => {
          console.log('Calling get')
          return {
            access_token: token,
            refresh_token: null,
            expires: null,
            expires_at: null
          }
        },

        set: async value => {
          console.log('Calling set')
        }
      }
    })
  )
