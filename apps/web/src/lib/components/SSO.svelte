<script lang="ts">
  import { page } from '$app/stores'
  import { env } from '$env/dynamic/public'
  import { faGoogle } from '@fortawesome/free-brands-svg-icons'
  import Fa from 'svelte-fa'
  let redirect = $page.url.searchParams.get('redirect') || ''
</script>

<ul class="w-full">
  <li class="w-full">
    <a
      href={`https://directus-jet-black.app.jet-black.xyz/auth/login/google?redirect=${env.PUBLIC_ORIGIN}${redirect}`}
      class="flex justify-center items-center gap-x-4 variant-outline w-full h-10"
    >
      <span><Fa icon={faGoogle} /></span>
      Google
    </a>
  </li>
</ul>
