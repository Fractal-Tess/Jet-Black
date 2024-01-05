<script lang="ts">
  import { shortcut } from '@svelte-put/shortcut'
  import { Avatar, getToastStore, popup } from '@skeletonlabs/skeleton'
  import type { PopupSettings } from '@skeletonlabs/skeleton'
  import { AppShell, AppBar } from '@skeletonlabs/skeleton'
  import Fa from 'svelte-fa'
  import {
    faBarsStaggered,
    faMagnifyingGlass
  } from '@fortawesome/free-solid-svg-icons'
  import { page } from '$app/stores'
  import { getContext, onMount } from 'svelte'
  import type { createDrawerStore } from '$lib/stores'

  import type { PageData } from './$types'
  import AvatarPopUp from '$lib/components/AvatarPopUp.svelte'
  import { directusAsset } from '$lib/directus'
  export let data: PageData

  const { user } = data

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

  const toast = getToastStore()
  function search() {
    toast.trigger({
      message: 'Все още не работи',
      background: 'variant-filled-error'
    })
  }
</script>

<svelte:window
  use:shortcut={{
    trigger: {
      preventDefault: true,
      key: 'k',
      modifier: ['ctrl', 'meta'],
      callback: search
    }
  }}
/>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar
      shadow="shadow-2xl"
      class={`${
        mounted ? '-translate-y-0' : '-translate-y-full '
      } transition-all duration-1000 delay-1000`}
    >
      <svelte:fragment slot="lead">
        <a href="/" class="block">
          <img
            src="/logo_white.svg"
            alt="logo"
            class={`h-10 duration-1000 transition-all ${
              $drawerStore ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
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
        {#if user}
          <AvatarPopUp {user} />
          <button
            class="transition-all after:inset-0 relative after:absolute
               after:pointer-events-none after:select-none after:hover:outline-dashed after:hover:animate-spin-slow after:rounded-full after:hover:outline-1"
            use:popup={userAvatarPopup}
          >
            <Avatar
              src={directusAsset(
                user.avatar?.toString() + '?height=40&width=40'
              )}
              width="w-10"
              rounded="rounded-full"
            />
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
