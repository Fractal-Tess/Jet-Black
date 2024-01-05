<script lang="ts">
  import SSO from '$lib/components/SSO.svelte'
  import { superForm, superValidateSync } from 'sveltekit-superforms/client'
  import { z } from 'zod'
  import { ProgressRadial, getToastStore } from '@skeletonlabs/skeleton'
  import { directus } from '$lib/directus'
  import { page } from '$app/stores'
  import { asyncTryOrElse } from '$lib/utils'
  import { goto } from '$app/navigation'
  import { env } from '$env/dynamic/public'
  import { Result } from 'true-myth'

  let showSpinner = false
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })

  const toastStore = getToastStore()

  const { form, enhance, constraints, errors } = superForm(
    superValidateSync(loginSchema),
    {
      SPA: true,
      validators: loginSchema,
      onUpdate: async ({ form, cancel }) => {
        cancel()
        if (form.valid) {
          showSpinner = true

          const res = await asyncTryOrElse(
            async () =>
              await directus.login(form.data.email, form.data.password),
            e => {
              console.error(e)
              return Result.err(e)
            }
          )

          if (res.isErr) {
            toastStore.trigger({
              message: 'Невалиден емайл или парола',
              autohide: true,
              timeout: 5000,
              background: 'variant-filled-error'
            })
          } else {
            await goto(
              `${env.PUBLIC_ORIGIN}${
                $page.url.searchParams.get('redirect') || ''
              }`,
              {
                invalidateAll: true
              }
            )
          }
        }

        showSpinner = false
        return form
      }
    }
  )
</script>

<div class="flex-1 gap-y-8 flex flex-col items-center justify-center">
  <h1 class="h1 mb-8">Влизане</h1>
  <form
    use:enhance
    method="POST"
    class="flex items-center justify-center flex-col gap-y-4 w-full"
  >
    {#if $errors._errors}
      <span
        class="bg-error-500 text-on-error-token max-w-[340px] [text-wrap:balance] text-center text-xl p-2 px-4 rounded-md"
      >
        {$errors._errors[0]}
      </span>
    {/if}
    <label class="label w-full">
      <span>Емайл</span>
      <input
        autocomplete="email"
        {...$constraints.email}
        aria-invalid={$errors.email ? 'true' : undefined}
        bind:value={$form.email}
        class="input placeholder:opacity-40"
        type="email"
        placeholder="example@mail.com"
      />
    </label>
    <label class="label w-full">
      <span>Парола</span>
      <input
        autocomplete="current-password"
        aria-invalid={$errors.password ? 'true' : undefined}
        {...$constraints.password}
        bind:value={$form.password}
        class="input"
        type="password"
      />
    </label>
    <button
      type="submit"
      class="btn variant-filled w-full transition-all outline outline-1"
      class:variant-filled={!showSpinner}
    >
      {#if showSpinner}
        <ProgressRadial width={'w-8'} />
      {:else}
        Влез
      {/if}
    </button>
    <div class="flex gap-x-2">
      <span> Нямате акаунт? </span>
      <a href="/register" class="anchor no-underline">Създайте нов!</a>
    </div>
  </form>

  <div
    class="text-center flex items-center w-full before:border-b-[1px] before:flex-1 after:border-b-[1px] after:flex-1"
  >
    <span class="flex-[0.2_0_auto]">или</span>
  </div>
  <SSO />
</div>
