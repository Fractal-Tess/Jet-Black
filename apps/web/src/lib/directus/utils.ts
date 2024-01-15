import { env } from '$env/dynamic/public'

export function directusAsset(asset: string | unknown) {
  if (typeof asset !== 'string') return
  return `${env.PUBLIC_DIRECTUS_URL}/assets/${asset}`
}
