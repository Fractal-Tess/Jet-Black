import { asyncTryOrElse } from '$lib/utils'
import { readItems } from '@directus/sdk'
import { directus } from '../client'

export async function getSubjects() {
  const result = await asyncTryOrElse(
    async () => await directus.request(readItems('subject'))
  )

  if (result.isErr) return []
  return result.value
}
