<script lang="ts">
  import { Drawer, ListBox, ListBoxItem } from '@skeletonlabs/skeleton'
  import type { Subject } from '$lib/directus'
  import {
    faArrowLeftLong,
    faLeftLong
  } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import { getContext } from 'svelte'
  import type { createDrawerStore } from '$lib/stores'
  import SubjectNav from './SubjectNav.svelte'

  let activeSlug = 'Физика'
  const drawerStore = getContext('jb_drawerStore') as ReturnType<
    typeof createDrawerStore
  >

  export let subjects: Subject[]

  // $: if (!$page.state.showDrawer) drawerStore.close({ withHistory: false })
</script>

<svelte:window
  on:keydown={e => {
    if (e.key === 'Escape' && $drawerStore)
      drawerStore.close({ withHistory: false })
  }}
/>

<Drawer on:backdrop={() => drawerStore.close({ withHistory: false })}>
  <section
    class="relative flex flex-col flex-1 h-full p-4 justify-around mx-auto"
  >
    <div class="relative flex items-center">
      <img
        src="/jb/Jet-Black.svg"
        alt="logo"
        class="w-16 mx-auto invert md:hidden"
      />
      <button on:click={close} class=" absolute md:hidden p-4">
        <Fa icon={faArrowLeftLong} size="2.5x" />
      </button>
    </div>

    <SubjectNav {subjects} />
    <div></div>
  </section>
</Drawer>
