<script lang="ts">
  import { Drawer, ListBox, ListBoxItem } from '@skeletonlabs/skeleton'
  import type { Subject } from '$lib/directus'
  import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import { getContext } from 'svelte'
  import type { createDrawerStore } from '$lib/stores'
  import SubjectNav from './SubjectList.svelte'
  import { page } from '$app/stores'

  const drawerStore = getContext('jb_drawerStore') as ReturnType<
    typeof createDrawerStore
  >

  export let subjects: Subject[]

  $: if (!$page.state.showDrawer) drawerStore.close()
</script>

<svelte:window
  on:keydown={e => {
    if (e.key === 'Escape' && $drawerStore)
      drawerStore.close({ withHistory: true })
  }}
/>

<Drawer on:backdrop={() => drawerStore.close({ withHistory: true })}>
  <section
    class="relative flex flex-col flex-1 h-full p-4 justify-around mx-auto"
  >
    <div class="relative flex items-center">
      <a href="/" class=" mx-auto p-4">
        <img src="/logo_white.svg" alt="logo" class="w-16 mx-auto" />
      </a>
      <button on:click={close} class=" absolute md:hidden p-4">
        <Fa icon={faArrowLeftLong} size="2.5x" />
      </button>
    </div>

    <SubjectNav {subjects} />
    <div></div>
  </section>
</Drawer>
