import { env } from '$env/dynamic/public'
import { asyncTryOrElse } from '$lib/utils'
import { readItems, readMe } from '@directus/sdk'
import { directus } from '.'

export function directusAsset(asset: string | unknown) {
  if (typeof asset !== 'string') return
  return env.PUBLIC_DIRECTUS_URL + '/assets/' + asset
}

export async function getUser() {
  const result = await asyncTryOrElse(
    async () => await directus.request(readMe())
  )
  return result.isOk ? result.value : null
}

export async function getChapters(subject: string) {
  const tree = await directus.request(
    readItems('chapter', {
      // @ts-ignore
      fields: ['*.*.*'],

      filter: {
        sub_chapters: {
          _nnull: true
        },
        subject: {
          label: {
            _eq: subject
          }
        }
      }
    })
  )

  return tree
}

export async function getSubjects() {
  const result = await asyncTryOrElse(
    async () => await directus.request(readItems('subject'))
  )

  if (result.isErr) return []
  return result.value
}
