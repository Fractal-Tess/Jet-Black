// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    user:
      | {
          info: import('$lib/user').User
          directus: typeof import('$lib/directus').directus
        }
      | {
          info: null
          directus: typeof import('$lib/directus').directus
        }
  }
  interface PageState {
    showDrawer: boolean
  }
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
}
