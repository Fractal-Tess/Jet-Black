import { directus } from '$lib/directus'
import { asyncTryOrElse } from '$lib/utils'

async function refreshToken() {
  const res = await asyncTryOrElse(
    async () =>
      await fetch('https://directus-jet-black.app.jet-black.xyz/auth/refresh', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          mode: 'cookie'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
  )
  if (res.isOk) {
    if (res.value.status !== 200) return
    const {
      data: { access_token }
    } = (await res.value.json()) as {
      data: {
        access_token: string
        expires: number
      }
    }
    directus.setToken(access_token)
  }
}
await refreshToken()
setInterval(refreshToken, 1000 * 60 * 10)
