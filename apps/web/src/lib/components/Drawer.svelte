<script lang="ts">
  import { Drawer } from '@skeletonlabs/skeleton'
  import { directusAsset, type Subject } from '$lib/directus'
  import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import { getContext } from 'svelte'
  import type { createDrawerStore } from '$lib/stores'
  import { page } from '$app/stores'

  export let subjects: Subject[]

  const drawerStore = getContext('jb_drawerStore') as ReturnType<
    typeof createDrawerStore
  >

  $: if (!$page.state.showDrawer) drawerStore.close()
</script>

<svelte:window
  on:keydown={e => {
    if (e.key === 'Escape' && $drawerStore)
      drawerStore.close({ withHistory: true })
  }}
/>

<Drawer on:backdrop={() => drawerStore.close({ withHistory: true })}>
  <aside class="flex flex-col flex-1 h-full py-8 justify-around mx-auto">
    <div class="relative flex items-center">
      <a href="/" class=" mx-auto p-4">
        <img src="/logo_white.svg" alt="logo" class="w-24 md:w-20 mx-auto" />
      </a>
      <!-- Mobile backward button -->
      <button
        on:click={() => drawerStore.close()}
        class="absolute md:hidden p-4"
      >
        <Fa icon={faArrowLeftLong} size="2.5x" />
      </button>
    </div>

    <ul class="p-8 flex-col mx-auto flex-1 flex items-center justify-center">
      {#each subjects as subject, i}
        <li
          class="first:rounded-t-md last:rounded-b-md variant-outline-primary font-bold w-full"
        >
          <a
            href={`/learn/${encodeURI(subject.label)}`}
            class="inline-flex px-12 md:px-8 items-center gap-4 py-4"
          >
            <img
              src={directusAsset(subject.icon)}
              alt="subject icon"
              class="h-6 w-6"
            />
            <p class="text-lg">
              {subject.label}
            </p>
          </a>
        </li>
      {/each}
    </ul>
  </aside>
</Drawer>
