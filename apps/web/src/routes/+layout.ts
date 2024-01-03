import { directus } from '$lib/directus'
import { readItems } from '@directus/sdk'
import type { LayoutLoad } from './$types'

export const load = (async () => {
  const subjects = await directus.request(readItems('subject'))
  return { subjects }
}) satisfies LayoutLoad
