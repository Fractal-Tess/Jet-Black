<script lang="ts">
  import { page } from '$app/stores'
  import { directusAsset, type getUser } from '$lib/directus'
  import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
  import {
    AppBar,
    popup,
    Avatar,
    type PopupSettings
  } from '@skeletonlabs/skeleton'
  import Fa from 'svelte-fa'
  import AvatarPopUp from './AvatarPopUp.svelte'
  import { getContext } from 'svelte'
  import type { createDrawerStore } from '$lib/stores'

  const userAvatarPopup: PopupSettings = {
    event: 'click',
    target: 'userAvatarPopup',
    placement: 'bottom'
  }

  const drawerStore = getContext('jb_drawerStore') as ReturnType<
    typeof createDrawerStore
  >

  export let user: Awaited<ReturnType<typeof getUser>>
</script>

<AppBar shadow="shadow-2xl" class="border-b-[1px] border-surface-500">
  <svelte:fragment slot="lead">
    <button
      class:opacity-0={$drawerStore}
      class="btn max-md:btn-sm variant-filled transition-opacity"
      on:click={drawerStore.open}
    >
      <Fa icon={faBarsStaggered} />
    </button>
  </svelte:fragment>

  <svelte:fragment slot="trail">
    {#if user}
      <AvatarPopUp {user} />
      <button
        class="transition-all after:inset-0 relative after:absolute
               after:pointer-events-none after:select-none after:hover:outline-dashed after:hover:animate-spin-slow after:rounded-full after:hover:outline-1"
        use:popup={userAvatarPopup}
      >
        <Avatar
          src={directusAsset(user.avatar?.toString() + '?height=40&width=40')}
          width="w-10"
          rounded="rounded-full"
        />
      </button>
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
