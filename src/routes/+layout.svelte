<script lang="ts">
  import '../app.postcss'
  import { Toast, initializeStores } from '@skeletonlabs/skeleton'
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow
  } from '@floating-ui/dom'

  import { storePopup } from '@skeletonlabs/skeleton'
  import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
  import PocketBase from 'pocketbase'
  import { setContext } from 'svelte'
  import type { LayoutData } from './$types'
  export let data: LayoutData

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })
  initializeStores()

  const pb = new PocketBase(PUBLIC_POCKETBASE_URL)
  pb.authStore.loadFromCookie(data.pbCookie)
  setContext('pb', pb)
</script>

<Toast />
<slot />
