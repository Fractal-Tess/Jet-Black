import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ resolve, event }) => {
  console.log(event.cookies.getAll())
  const response = await resolve(event)

  return response
}
