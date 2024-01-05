<script lang="ts">
  import { page } from '$app/stores'
  import type { getChapters } from '$lib/directus'
  import { faFile, faFolderBlank } from '@fortawesome/free-solid-svg-icons'
  import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton'
  import Fa from 'svelte-fa'
  export let chapter: Awaited<ReturnType<typeof getChapters>>[number]
  export let path = ''

  const arr = decodeURI($page.url.pathname).split('/', 3)
  arr.shift()
  let basePath = `/${arr.join('/')}`
</script>

<TreeView
  class="select-none"
  open={chapter.label.toLocaleLowerCase() ===
    decodeURI($page.url.hash).replace('#', '')}
>
  <TreeViewItem value={chapter.label}>
    <svelte:fragment slot="lead"><Fa icon={faFolderBlank} /></svelte:fragment>
    <p>{chapter.label}</p>

    <svelte:fragment slot="children">
      {#each chapter.sub_chapters || [] as childSection}
        <svelte:self chapter={childSection} path={`${path}/${chapter.label}`} />
      {/each}
      {#each chapter.lessons || [] as lesson, id}
        <a href={`${basePath}${path}/${lesson.label}`} class="contents">
          <TreeViewItem value={lesson.label}>
            <svelte:fragment slot="lead"><Fa icon={faFile} /></svelte:fragment>
            <p>{lesson.label}</p>
          </TreeViewItem>
        </a>
      {/each}
    </svelte:fragment>
  </TreeViewItem>
</TreeView>
