<script>
  import { HASH_MENU } from "../store";

  export let menu;

  let current = null;
</script>

<style>

</style>

<div class="container">
  <a href="/" class="logo">文殊Web</a>
  <nav>
    <ul>
      {#each menu as m}
        <li>
          <a
            href="#{HASH_MENU}{m.href}"
            class:current={current === m}
            on:click={() => (current = m)}>
            {m.text}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</div>
