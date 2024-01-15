<script lang="ts">
  import Header from '$lib/components/Header.svelte'
  import { AppShell } from '@skeletonlabs/skeleton'
  import type { PageData } from './$types'
  export let data: PageData
  const { user } = data
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Header {user} />
  </svelte:fragment>
  <slot />
</AppShell>
