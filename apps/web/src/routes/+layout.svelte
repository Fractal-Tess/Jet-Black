<script lang="ts">
  import '../app.postcss'

  import { Toast, initializeStores } from '@skeletonlabs/skeleton'
  import { storePopup } from '@skeletonlabs/skeleton'
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow
  } from '@floating-ui/dom'
  import { createDrawerStore } from '$lib/stores'
  import { onMount, setContext } from 'svelte'
  import SubjectDrawer from '$lib/components/SubjectDrawer.svelte'

  import type { LayoutData } from './$types'
  import { onNavigate } from '$app/navigation'

  export let data: LayoutData
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })
  initializeStores()

  const drawerStore = createDrawerStore()
  setContext('jb_drawerStore', drawerStore)
  onNavigate(n => drawerStore.close({ withHistory: false }))
</script>

<!-- Background -->
<div
  class="absolute inset-0 -z-50 !bg-[url('/bg.svg')] bg-repeat opacity-20 animate-bg-move-fast md:animate-none"
></div>

<SubjectDrawer subjects={data.subjects} />
<Toast />
<slot />
