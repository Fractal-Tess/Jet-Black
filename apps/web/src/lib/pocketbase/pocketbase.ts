import { env } from '$env/dynamic/public'
import PocketBase from 'pocketbase'
import { building } from '$app/environment'

export let pb: PocketBase
if (!building) pb = new PocketBase(env.PUBLIC_POCKETBASE_URL)
