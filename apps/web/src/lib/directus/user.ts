import { asyncTryOrElse } from '$lib/utils'
import { readMe } from '@directus/sdk'
import { directus } from './index'

export async function getUser() {
  const result = await asyncTryOrElse(
    async () => await directus.request(readMe())
  )
  return result.isOk ? result.value : null
}
