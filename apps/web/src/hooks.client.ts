import { directus } from '$lib/directus'

try {
  const authRes = await fetch(
    'https://directus-jet-black.app.jet-black.xyz/auth/refresh',
    {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        mode: 'cookie'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  type Auth = {
    access_token: string
    expires: number
  }
  const data = (await authRes.json()) as Auth
  directus.setToken(data.access_token)
} catch (error) {}
