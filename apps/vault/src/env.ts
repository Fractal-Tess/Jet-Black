import z from 'zod'
import { config } from 'dotenv'

const envs = config({
  override: true
}).parsed

const envSchema = z.object({
  POCKETBASE_URL: z.string(),
  POCKETBASE_ADMIN_EMAIL: z.string(),
  POCKETBASE_ADMIN_PASSWORD: z.string()
})

export const ENV = Object.freeze(envSchema.parse(envs))
