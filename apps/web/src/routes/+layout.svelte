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
  import { setContext } from 'svelte'
  import Drawer from '$lib/components/Drawer.svelte'

  import type { LayoutData } from './$types'
  export let data: LayoutData
  let { subjects } = data

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })
  initializeStores()

  const drawerStore = createDrawerStore()
  setContext('jb_drawerStore', drawerStore)
</script>

<Drawer {subjects} />
<Toast />
<slot />
