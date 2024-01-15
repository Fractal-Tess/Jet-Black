import { asyncTryOrElse } from '$lib/utils'
import { readItems } from '@directus/sdk'
import { directus } from '../client'

export async function getSubSubjects(subject: string) {
  const result = await asyncTryOrElse(
    async () =>
      await directus.request(
        readItems('subject', {
          filter: {
            label: {
              _eq: subject
            }
          },

          fields: [
            {
              sub_subjects: ['*']
            }
          ]
        })
      )
  )

  if (result.isErr) return []
  return result.value.map(subject => subject.sub_subjects).at(0)
}
