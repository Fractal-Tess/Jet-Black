import type { RequestHandler } from './$types'

// TODO: Patch this out and do it on the client
export const PATCH: RequestHandler = async ({ locals, request }) => {
  return new Response()
}
