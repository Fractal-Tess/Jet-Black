<script lang="ts">
  import { getToastStore, popup } from '@skeletonlabs/skeleton'
  import type { PopupSettings } from '@skeletonlabs/skeleton'
  import { AppShell, AppBar } from '@skeletonlabs/skeleton'
  import Fa from 'svelte-fa'
  import {
    faBarsStaggered,
    faMagnifyingGlass
  } from '@fortawesome/free-solid-svg-icons'
  import type { PageData } from './$types'
  import { page } from '$app/stores'
  import { getContext, onMount } from 'svelte'
  import type { createDrawerStore } from '$lib/stores'
  export let data: PageData

  let mounted = false
  onMount(() => (mounted = true))

  const userAvatarPopup: PopupSettings = {
    event: 'click',
    target: 'userAvatarPopup',
    placement: 'bottom'
  }

  const drawerStore = getContext('jb_drawerStore') as ReturnType<
    typeof createDrawerStore
  >

  // TODO: Implement search functionality
  const toast = getToastStore()
  function search() {
    toast.trigger({
      message: 'Имплементацията на тази функция все още не е приключила',
      background: 'variant-filled-error'
    })
  }
</script>

<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->

    <AppBar
      shadow="shadow-2xl"
      class={`${
        mounted ? '-translate-y-0' : '-translate-y-full '
      } transition-all duration-1000 delay-1000`}
    >
      <svelte:fragment slot="lead">
        <a href="/" class="block">
          <img src="/jb/Jet-Black.svg" alt="logo" class="h-10 invert" />
        </a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <!-- TODO: Implement a search function -->
        <button
          on:click={search}
          class="hidden md:flex btn space-x-4 variant-soft hover:variant-soft-primary"
          ><Fa icon={faMagnifyingGlass} />
          <span class="hidden md:block"> Ctrl + K </span></button
        >
        <button
          class="btn max-md:btn-sm variant-filled"
          on:click={drawerStore.open}
        >
          <Fa icon={faBarsStaggered} />
        </button>
        <div class="border-l-[1px] opacity-50 block h-8" />
        {#if false}
          <button
            class="transition-all after:inset-0 relative after:absolute
               after:pointer-events-none after:select-none after:hover:outline-dashed after:hover:animate-spin-slow after:rounded-full after:hover:outline-1"
            use:popup={userAvatarPopup}
          >
            <!-- <AvatarPopUp {avatarUrl} {user} /> -->
            <!-- <Avatar src={avatarUrl} width="w-10" rounded="rounded-full" /> -->
          </button>
          <!-- Display profile -->
        {:else}
          <a
            href={`/sign-in?redirect=${$page.url.pathname}`}
            class="btn max-md:btn-sm variant-outline no-underline">Вход</a
          >
          <a
            href="/register?redirect={$page.url.pathname}"
            class="btn max-md:btn-sm variant-filled no-underline">Регистрация</a
          >
        {/if}
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <slot />
</AppShell>
