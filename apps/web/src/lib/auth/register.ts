import { asyncTryOrElse } from '$lib/utils'
import { Result, Unit } from 'true-myth'
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

  return Result.ok(Unit)
}
