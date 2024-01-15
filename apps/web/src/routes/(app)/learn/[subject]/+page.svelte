<script lang="ts">
  import { directusAsset } from '$lib/directus'
  import { faFile, faVial } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import type { PageData } from './$types'

  export let data: PageData

  $: ({ subSubjects, subject } = data)
</script>

<section
  class="container mx-auto h-full py-20 text-center flex flex-col gap-20 px-4"
>
  <h1
    class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-primary-50 relative max-w-min mx-auto p-2 h1"
  >
    <span class="relative text-surface-500 italic font-extrabold font-roboto">
      {subject}
    </span>
  </h1>
  <ul class="grid grid-cols-1 md:grid-cols-2 gap-12 flex-col">
    {#if subSubjects}
      {#each subSubjects as subSubject}
        <li class="">
          <a
            href={`/learn/${subject}/${subSubject.label}`}
            class="variant-outline rounded-md flex items-end px-4 py-2 gap-4"
          >
            <img
              class="h-20 w-min"
              alt="subject icon"
              src={directusAsset(subSubject.icon)}
            />

            <h3 class="h3 font-bold flex-1 text-left">
              {subSubject.label}
            </h3>
            <div class="flex opacity-50 flex-col">
              <span class="inline-flex gap-2 items-center"
                >3/4<Fa icon={faFile} />
              </span>
              <span class="inline-flex gap-2 items-center"
                >2/4 <Fa icon={faVial} /></span
              >
            </div>
          </a>
        </li>
      {/each}
    {/if}
  </ul>
</section>
