import PocketBase from 'pocketbase'
import type { PageLoad } from './$types'
import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import { userSubscription, subscriptionPlans } from '$lib/pocketbase'

export const load = (async ({ parent }) => {
  const { pbCookie, user } = await parent()
  const pb = new PocketBase(PUBLIC_POCKETBASE_URL)
  pb.authStore.loadFromCookie(pbCookie)

  const sub = user ? userSubscription(pb, user.id) : null
  return {
    sub
  }
}) satisfies PageLoad
