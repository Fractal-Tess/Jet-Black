import { z } from 'zod'
import Result from 'true-myth/result'
import { asyncTryOrElse } from '$lib/utils'

export type LoginAction =
  | {
      method: 'GOOGLE'
    }
  | {
      method: 'CREDENTIALS'
      credentials: {
        email: string
        password: string
      }
    }
type LoginError = {
  code: 'INVALID_CREDENTIALS' | 'FAILED_OAUTH' | 'UNKNOWN'
  message: string
}

export const userCredentialsLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
