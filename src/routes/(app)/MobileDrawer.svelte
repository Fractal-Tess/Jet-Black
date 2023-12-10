<script>
  import { faCalculator, faAtom } from '@fortawesome/free-solid-svg-icons'

  import { Drawer } from '@skeletonlabs/skeleton'
  import Fa from 'svelte-fa'
</script>

<Drawer>
  <div class=" flex flex-col h-full pt-4">
    <span class="text-token text-opacity-50">Уроци, упражнения, тестове</span>
    <ul class="list-dl flex-1 text-xl">
      <li class="list-item">
        <a href="/math" class="flex items-center">
          <span class="badge"><Fa size="1.5x" icon={faCalculator} /></span>
          <span class="flex-auto">Математика</span>
        </a>
      </li>

      <li class="list-item">
        <a href="/math" class="flex items-center">
          <span class="badge"><Fa size="1.5x" icon={faAtom} /></span>
          <span class="flex-auto">Физика</span>
        </a>
      </li>
      <!-- ... -->
    </ul>
  </div>
</Drawer>
