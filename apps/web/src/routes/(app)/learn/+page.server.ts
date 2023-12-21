import type { PageServerLoad } from './$types'
import { join } from 'node:path'

export const load = (async () => {
  const path = new URL(join(import.meta.url, '')).pathname
  console.log(path)
  return {}
}) satisfies PageServerLoad
