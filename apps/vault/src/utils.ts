import PocketBase from 'pocketbase'
import { Result } from 'true-myth'
import path from 'node:path'
import { ENV } from './env.js'

const ROOT_PATH = new URL(path.dirname(import.meta.url)).pathname

export const obsidianVaultPath = path.resolve(ROOT_PATH, '../obsidian')

export const pb = new PocketBase(ENV.POCKETBASE_URL)
await pb.admins.authWithPassword(
  ENV.POCKETBASE_ADMIN_EMAIL,
  ENV.POCKETBASE_ADMIN_PASSWORD
)

function id<A>(a: A) {
  return a
}

export function asyncTryOrElse<T>(
  fn: () => Promise<T>
): Promise<Result<T, unknown>>
export function asyncTryOrElse<T, E>(
  fn: () => Promise<T>,
  onErr: (value: unknown) => E
): Promise<Result<T, E>>
export function asyncTryOrElse<T extends {}, E>(
  fn: () => Promise<T>,
  onErr?: (value: unknown) => E
): Promise<Result<T, unknown>> {
  return fn().then(Result.ok<T, E>, onErr ?? id)
}
