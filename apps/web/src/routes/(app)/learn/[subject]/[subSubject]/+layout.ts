import { directus } from '$lib/directus'
import { readItems } from '@directus/sdk'
import type { LayoutLoad } from './$types'

export const load = (async ({ params, parent }) => {
  const chapters = await directus.request(
    readItems('chapter', {
      filter: {
        sub_subject: {
          label: {
            _eq: params.subSubject
          }
        }
      }
    })
  )
  return { chapters, subSubject: params.subSubject }
}) satisfies LayoutLoad
