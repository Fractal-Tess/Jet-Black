import { directus } from '$lib/directus'
import { asyncTryOrElse } from '$lib/utils'
import type { PageLoad } from './$types'

export const load = (async () => {
  const success = await asyncTryOrElse(async () => await directus.logout())
  return { success: success.isOk }
}) satisfies PageLoad
