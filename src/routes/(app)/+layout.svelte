<script lang="ts">
  import {
    AppShell,
    AppBar,
    Drawer,
    type DrawerSettings
  } from '@skeletonlabs/skeleton'
  import Fa from 'svelte-fa'
  import {
    faAtom,
    faBarsStaggered,
    faCalculator,
    faMagnifyingGlass
  } from '@fortawesome/free-solid-svg-icons'

  import { pb } from '$lib/pocketbase'

  import { getDrawerStore } from '@skeletonlabs/skeleton'

  const drawerStore = getDrawerStore()
  const drawerSettings: DrawerSettings = {
    bgBackdrop: 'bg-gradient-to-tr from-black to-black-500/50',
    width: 'w-[280px] md:w-[480px]',
    padding: 'p-4'
  }
</script>

<Drawer>
  <div class=" flex flex-col h-full pt-4">
    <span class="text-token text-opacity-50">Уроци, упражнения, тестове</span>
    <ul class="list-dl flex-1 text-xl">
      <li class="list-item">
        <a href="/math" class="flex items-center">
          <span class="badge"><Fa size="1.5x" icon={faCalculator} /></span>
          <span class="flex-auto">Математика</span>
        </a>
      </li>

      <li class="list-item">
        <a href="/math" class="flex items-center">
          <span class="badge"><Fa size="1.5x" icon={faAtom} /></span>
          <span class="flex-auto">Физика</span>
        </a>
      </li>
      <!-- ... -->
    </ul>
  </div>
</Drawer>

<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <a href="/" class="block from-primar">
          <img src="/logo_typo.png" alt="logo" class="h-8 dark:invert" />
        </a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <!-- TODO: Implement a search function -->
        <button class="btn"><Fa icon={faMagnifyingGlass} /></button>
        <button
          class="btn variant-filled"
          on:click={() => drawerStore.open(drawerSettings)}
        >
          <Fa icon={faBarsStaggered} />
        </button>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />
</AppShell>
