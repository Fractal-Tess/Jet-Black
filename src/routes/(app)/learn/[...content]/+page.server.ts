import type { PageServerLoad } from './$types'
import path from 'path'

async function parseTree(path: string) {
  console.log()
}

export const load = (async ({ params, url }) => {
  console.log()
  console.log(params.content.split('/'))
  return {}
}) satisfies PageServerLoad
