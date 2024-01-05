import { getChapters } from '$lib/directus'
import type { LayoutLoad } from './$types'

export const load = (async ({ params }) => {
  const chapters = await getChapters(params.subject)
  return { chapters }
}) satisfies LayoutLoad
