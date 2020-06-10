<script>
  import { HASH_SIDEBAR } from "../store";

  export let baseDir;
  export let sidebar;

  let current = null;
</script>

<style>

</style>

<nav class="navigation">
  <ul>
    {#each sidebar as bar}
      <li>{bar.title}</li>
      <ul>
        {#each bar.children as b}
          <li class="item">
            {#if b.href.endsWith('.ppt.md')}
              <a href="manju-show.html?{baseDir}{b.href}" target="_blank">{b.text}</a>
            {:else}
              <a
                href="#{HASH_SIDEBAR}{baseDir}{b.href}"
                class:current={current === b}
                on:click={() => (current = b)}>
                {b.text}
              </a>
            {/if}
          </li>
        {/each}
      </ul>
    {/each}
  </ul>
</nav>
