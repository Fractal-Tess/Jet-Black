import { getSubSubjects } from '$lib/directus'
import type { LayoutLoad } from './$types'

export const load = (async ({ params }) => {
  const subSubjects = await getSubSubjects(params.subject)

  return { subSubjects, subject: params.subject }
}) satisfies LayoutLoad
