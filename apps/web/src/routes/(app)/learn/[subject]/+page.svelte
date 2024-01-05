<script lang="ts">
  import Chapter from '$lib/components/Chapter.svelte'
  import { TreeView } from '@skeletonlabs/skeleton'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<section
  class="relative container mx-auto flex h-full max-w-md md:max-w-lg py-8"
>
  {#each data.chapters as chapter}
    <Chapter {chapter} />
  {:else}
    <h1>Sorry, so subjects...</h1>
  {/each}
</section>
