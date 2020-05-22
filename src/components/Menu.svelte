<script>
  import { HASH_MENU } from "../constants";

  export let menu;

  let current = null;
</script>

<style>

</style>

<ul class="manjusri-menu">
  {#each menu as m}
    <li>
      <a
        href="/#{HASH_MENU}{m.href}"
        class:manjusri-menu-a-active={current === m}
        on:click={() => (current = m)}>
        {m.text}
      </a>
    </li>
  {/each}
</ul>
