import type { PageServerLoad } from './$types'

export const load = (async ({ locals }) => {
  const { pb } = locals
  const valid = pb.authStore.isValid

  pb.authStore.clear()
  return {
    state: valid ? 'SUCCESS' : ('FAIL' as 'SUCCESS' | 'FAIL'),
    message: valid
      ? 'Вие успешно излязохте от профила си'
      : 'Вие не сте в профила си за да излезето от него'
  }
}) satisfies PageServerLoad
