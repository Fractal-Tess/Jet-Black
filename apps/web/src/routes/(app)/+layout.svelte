<script lang="ts">
  import { Avatar, popup } from '@skeletonlabs/skeleton'
  import type { PopupSettings } from '@skeletonlabs/skeleton'
  import { AppShell, AppBar } from '@skeletonlabs/skeleton'
  import Fa from 'svelte-fa'
  import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
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
</script>

<AppShell>
  <!-- HEADER -->
  <svelte:fragment slot="header">
    <!-- HEADER APP-BAR -->
    <AppBar
      shadow="shadow-2xl"
      class={`${
        mounted ? '-translate-y-0' : '-translate-y-full '
      } transition-all duration-1000 delay-1000`}
    >
      <svelte:fragment slot="lead">
        <!-- LEFT SIDE-->
        <button
          class:opacity-0={$drawerStore}
          class="btn max-md:btn-sm variant-filled transition-opacity"
          on:click={drawerStore.open}
        >
          <Fa icon={faBarsStaggered} />
        </button>
      </svelte:fragment>

      <svelte:fragment slot="trail">
        <!-- RIGHT SIDE -->

        <!-- Login/Register /-/ User -->
        {#if user}
          <!-- User -->
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
        {:else}
          <!-- Login/Register -->
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

  <!-- Main content -->
  <slot />
</AppShell>
