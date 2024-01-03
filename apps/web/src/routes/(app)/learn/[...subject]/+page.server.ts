import { directus } from '$lib/directus'
import { readItems } from '@directus/sdk'
import type { PageServerLoad } from './$types'
import path from 'path'

export const load = (async ({ params, url }) => {
  const tree = await directus.request(
    readItems('subject_section', {
      // @ts-ignore
      fields: ['*.*.*'],
      filter: {
        children: {
          _nnull: true
        }
      }
    })
  )
  console.log(tree)
  // console.log(tree)
  return { tree }
}) satisfies PageServerLoad
