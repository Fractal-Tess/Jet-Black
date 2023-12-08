<script lang="ts">
  import { pb } from '$lib/pocketbase'
  import { asyncTryOrElse } from '$lib/utils'
  import Fa from 'svelte-fa'
  import { faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons'
  import { superForm, superValidateSync } from 'sveltekit-superforms/client'
  import { z } from 'zod'
  import { goto } from '$app/navigation'
  import { ProgressRadial } from '@skeletonlabs/skeleton'

  let showSpinner = false
  const loginSchema = z.object({
    email: z.string().email().default('vgfractal@gmail.com'),
    password: z.string().min(8).default('123123123')
  })

  const { form, enhance, constraints, errors } = superForm(
    superValidateSync(loginSchema),
    {
      SPA: true,
      validators: loginSchema,
      onUpdate: async ({ form }) => {
        if (form.valid) {
          showSpinner = true
          const res = await asyncTryOrElse(
            async () =>
              await pb
                .collection('users')
                .authWithPassword(form.data.email, form.data.password)
          )
          showSpinner = false
          if (res.isOk) {
            await goto('/')
          }
        }

        return form
      }
    }
  )

  const auth = async () => {
    const userData = await pb
      .collection('users')
      .authWithOAuth2({ provider: 'google' })
  }

  async function login(method: 'instagram' | 'google' | 'cred') {
    switch (method) {
      case 'cred':
        // Validate cred
        // Attempt login
        break
      case 'google':
        const res = await asyncTryOrElse(
          async () =>
            await pb.collection('users').authWithOAuth2({ provider: 'google' })
        )
        if (res.isErr) {
          console.error(res.error)
          return
        }

        console.log(res.value)
        break
      case 'instagram':
        const res1 = await asyncTryOrElse(async () =>
          pb.collection('users').authWithOAuth2({ provider: 'instagram' })
        )
        break
      default:
        console.log('Login switch should be unreachable')
        break
    }
  }
</script>

<section class="flex flex-col flex-1">
  <div class=" flex-1 flex flex-col items-center justify-center">
    <h2 class="h2 mb-8">Добре дошли!</h2>
    <form
      use:enhance
      method="POST"
      class="my-8 flex items-center justify-center flex-col gap-y-4 w-full"
    >
      <label class="label w-full">
        <span>Емайл</span>
        <input
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
          aria-invalid={$errors.password ? 'true' : undefined}
          {...$constraints.password}
          bind:value={$form.password}
          class="input placeholder:opacity-40"
          type="password"
        />
      </label>
      <button type="submit" class="btn variant-filled w-full">
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
      <span class="flex-[0.2_0_auto]">OR</span>
    </div>

    <div class=" flex items-center justify-center flex-col gap-y-4 my-8 w-full">
      <button
        on:click={() => login('google')}
        class="flex justify-center items-center gap-x-4 border-[1px] w-full h-10"
      >
        <span><Fa icon={faGoogle} /></span>
        <span>Google</span>
      </button>
      <button
        on:click={() => login('instagram')}
        class="flex justify-center items-center gap-x-4 border-[1px] w-full h-10"
      >
        <span><Fa icon={faInstagram} /></span>
        <span>Instagram</span>
      </button>
    </div>
  </div>

  <div class="flex gap-x-2 text-sm mb-4">
    <a href="/privacy-polcy"> Политика за поверителност </a>
    <div class="border-l-2"></div>
    <a href="/terms"> Условия за ползване</a>
  </div>
  <!-- <button on:click={login}>Gmail login</button> -->
</section>
