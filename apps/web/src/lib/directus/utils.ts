import { env } from '$env/dynamic/public'
export function directusAsset(asset: string) {
  return env.PUBLIC_DIRECTUS_URL + '/assets/' + asset
}
