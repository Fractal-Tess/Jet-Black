import { writable } from 'svelte/store'
import { getDrawerStore, type DrawerSettings } from '@skeletonlabs/skeleton'
import { pushState } from '$app/navigation'

const drawerSettings: DrawerSettings = {
  bgBackdrop: 'bg-gradient-to-tr from-black to-black-500/75',
  duration: 500,
  width: 'max-md:w-full'
}

export function createDrawerStore() {
  const drawer = getDrawerStore()
  const { subscribe, set } = writable(false)

  function close(
    opts: { withHistory: boolean } = {
      withHistory: false
    }
  ) {
    set(false)
    drawer.close()
    if (opts.withHistory) history.back()
  }

  function open() {
    set(true)
    drawer.open(drawerSettings)
    pushState('', {
      showDrawer: true
    })
  }
  return {
    subscribe,
    close,
    open
  }
}
