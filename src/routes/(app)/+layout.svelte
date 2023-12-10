<script lang="ts">
  import { popup } from '@skeletonlabs/skeleton'
  import type { PopupSettings } from '@skeletonlabs/skeleton'

  import {
    AppShell,
    AppBar,
    Drawer,
    type DrawerSettings,
    Avatar
  } from '@skeletonlabs/skeleton'
  import Fa from 'svelte-fa'
  import {
    faBarsStaggered,
    faMagnifyingGlass
  } from '@fortawesome/free-solid-svg-icons'
  import type { PageData } from './$types'
  import { pb } from '$lib/pocketbase/pocketbase'
  import { getDrawerStore } from '@skeletonlabs/skeleton'
  import AvatarPopUp from './AvatarPopUp.svelte'
  import MobileDrawer from './MobileDrawer.svelte'
  export let data: PageData

  const { user } = data

  const drawerStore = getDrawerStore()
  const drawerSettings: DrawerSettings = {
    bgBackdrop: 'bg-gradient-to-tr from-black to-black-500/50',
    width: 'w-[280px] md:w-[480px]',
    padding: 'p-4'
  }

  const userAvatarPopup: PopupSettings = {
    // Represents the type of event that opens/closed the popup
    event: 'click',
    // Matches the data-popup value on your popup element
    target: 'userAvatarPopup',
    // Defines which side of your trigger the popup will appear
    placement: 'bottom'
  }
</script>

<MobileDrawer />

<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <a href="/" class="block from-primar">
          <img src="/logo.png" alt="logo" class="h-10 dark:invert-0 invert" />
        </a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <!-- TODO: Implement a search function -->
        <button class="btn"><Fa icon={faMagnifyingGlass} /></button>
        <button
          class="btn variant-filled md:hidden"
          on:click={() => drawerStore.open(drawerSettings)}
        >
          <Fa icon={faBarsStaggered} />
        </button>

        {#if user}
          {@const avatarUrl = pb.files.getUrl(
            { collectionId: 'users', id: data.user?.id },
            user.avatar,
            {
              thumb: '100x100'
            }
          )}
          <button
            class="transition-all after:inset-0 relative after:absolute
               after:pointer-events-none after:select-none after:hover:outline-dashed after:hover:animate-spin-slow after:rounded-full after:hover:outline-1"
            use:popup={userAvatarPopup}
          >
            <AvatarPopUp {avatarUrl} {user} />
            <Avatar src={avatarUrl} width="w-10" rounded="rounded-full" />
          </button>
          <!-- Display profile -->
        {:else}
          <a href="/auth/sign-in" class="btn variant-outline">Вход</a>
          <a href="/auth/register" class="btn variant-filled">Регистрация</a>
        {/if}
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <slot />
</AppShell>
