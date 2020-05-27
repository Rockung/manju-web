<script>
  import { HASH_MENU } from "../store";

  export let menu;

  let current = null;
</script>

<style>

</style>

<ul class="manju-web-menu">
  {#each menu as m}
    <li>
      <a
        href="#{HASH_MENU}{m.href}"
        class:manju-web-menu-a-active={current === m}
        on:click={() => (current = m)}>
        {m.text}
      </a>
    </li>
  {/each}
</ul>
