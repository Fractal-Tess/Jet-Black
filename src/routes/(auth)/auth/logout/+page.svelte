<script lang="ts">
  import {
    faCheckCircle,
    faHome,
    faXmarkCircle
  } from '@fortawesome/free-solid-svg-icons'
  import type { PageData } from './$types'
  import Fa from 'svelte-fa'

  export let data: PageData
  const { state, message } = data
</script>

<section class="flex-1 flex items-center justify-center space-y-40 flex-col">
  <div
    class="text-center flex items-center w-full before:border-b-[1px] before:flex-1 before:mr-8 after:border-b-[1px] after:flex-1 after:ml-8"
  >
    <div>
      {#if state === 'SUCCESS'}
        <Fa icon={faCheckCircle} size="5x" />
      {:else}
        <Fa icon={faXmarkCircle} size="5x" />
      {/if}
    </div>
  </div>
  <h1 class="h1">{message}</h1>

  <a
    class="flex items-center justify-center space-x-4 text-2xl font-bold italic btn variant-filled"
    href="/"
  >
    <span> Върни се обратно </span>
    <Fa icon={faHome} />
  </a>
</section>
