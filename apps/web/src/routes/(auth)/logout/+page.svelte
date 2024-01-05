<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import type { PageData } from './$types'
  import {
    faCheckCircle,
    faHome,
    faXmarkCircle
  } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import Fa from 'svelte-fa'

  export let data: PageData
  const { success } = data

  onMount(invalidateAll)
</script>

<section class="flex flex-col items-center justify-between gap-20">
  <h1 class="h1">Излизане</h1>
  <div
    class="text-center flex items-center w-full before:border-b-[1px] before:flex-1 before:mr-8 after:border-b-[1px] after:flex-1 after:ml-8"
  >
    {#if success}
      <Fa icon={faCheckCircle} size="5x" />
    {:else}
      <Fa icon={faXmarkCircle} size="5x" />
    {/if}
  </div>
  {#if success}
    <p class="text-lg">Вие излязохте от профила си!</p>
  {:else}
    <p class="text-lg">
      Хъмм...Нещо грешно се случи. Най-вероятно не сте в профила си.
    </p>
  {/if}

  <a
    class="flex w-full items-center justify-center space-x-4 text-2xl font-bold italic btn variant-filled"
    href="/"
  >
    <span>Върни се обратно</span>
    <Fa icon={faHome} />
  </a>
</section>
