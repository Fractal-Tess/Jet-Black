<script lang="ts">
  import type { User } from '$lib/user'
  import { Avatar } from '@skeletonlabs/skeleton'
  export let user: User
  export let avatarUrl: string
</script>

<div class="card p-4 w-72 shadow-xl" data-popup="userAvatarPopup">
  <div class="space-y-4 flex items-center justify-center flex-col">
    <Avatar src={avatarUrl} width="w-16" background={'bg-transparent'} />
    <div>
      <p class="font-bold">{user.username}</p>
    </div>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
    <div class="w-full flex justify-around"></div>
    <a
      class="btn variant-filled w-full"
      data-sveltekit-preload-data="off"
      data-sveltekit-preload-code="off"
      href="/dashboard"
    >
      Табло</a
    >
    <a href="/auth/logout" class="btn variant-soft-surface w-full">Излез</a>
  </div>
  <div class="arrow bg-surface-100-800-token" />
</div>
