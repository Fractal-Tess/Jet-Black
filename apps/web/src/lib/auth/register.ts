import { asyncTryOrElse } from '$lib/utils'
import { Result, Unit } from 'true-myth'
import { createItems, createUser, readItem, readItems } from '@directus/sdk'
import { directus } from '$lib/directus'
import { z } from 'zod'

export const registerSchema = z
  .object({
    email: z.string().email().default('motoristite21@gmail.com'),
    password: z.string().min(7).default('1231231'),
    passwordConfirm: z.string().min(7).default('1231231')
  })
  .refine(data => data.password == data.passwordConfirm, {
    message: 'Паролите не съвпадат',
    path: ['passwordConfirm']
  })

type RegisterErr = {
  path: [keyof z.infer<typeof registerSchema>][number] | 'toast'
  message: string
}

export async function register(
  credentials: z.infer<typeof registerSchema>
): Promise<Result<unknown, RegisterErr>> {
  // Attempt Create the record

  const res = await asyncTryOrElse(
    async () =>
      await directus.request(
        createUser({
          email: credentials.email,
          password: credentials.password,
          role: '9c56c08b-220a-40a3-9c50-9c43337ca6cd'
        })
      )
  )
  return Result.ok(res)
}
