import { getSubjects, getUser } from '$lib/directus'
import type { LayoutLoad } from './$types'

export const ssr = false

export const load = (async () => {
  const [user, subjects] = await Promise.allSettled([getUser(), getSubjects()])

  return {
    subjects: subjects.status === 'fulfilled' ? subjects.value : [],
    user: user.status === 'fulfilled' ? user.value : null
  }
}) satisfies LayoutLoad
