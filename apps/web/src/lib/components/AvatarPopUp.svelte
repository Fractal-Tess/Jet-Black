<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import { directusAsset, type getUser } from '$lib/directus'
  export let user: NonNullable<Awaited<ReturnType<typeof getUser>>>
</script>

<div class="card p-4 w-72 shadow-xl" data-popup="userAvatarPopup">
  <div class="space-y-4 flex items-center justify-center flex-col">
    <Avatar
      src={directusAsset(user.avatar?.toString() + '?height=64&width=64')}
      width="w-16"
      background={'bg-transparent'}
    />
    <div>
      <p class="font-bold">{user.first_name} {user.last_name}</p>
    </div>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
    <div class="w-full flex justify-around"></div>
    <a class="btn variant-filled w-full" href="/dashboard"> Табло</a>
    <a
      data-sveltekit-preload-data="off"
      data-sveltekit-preload-code="off"
      href="/logout"
      class="btn variant-outline w-full">Излез</a
    >
  </div>
  <div class="arrow bg-surface-100-800-token" />
</div>
