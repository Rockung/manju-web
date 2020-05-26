<script>
  import { HASH_SIDEBAR } from "../constants";

  export let baseDir;
  export let sidebar;

  let current = null;
</script>

<style>

</style>

<ul>
  {#each sidebar as bar}
    <li>{bar.title}</li>
    <ul>
      {#each bar.children as b}
        <li>
          <a
            href="/#{HASH_SIDEBAR}{baseDir}{b.href}"
            class:manju-web-aside-active={current === b}
            on:click={() => (current = b)}>
            {b.text}
          </a>
        </li>
      {/each}
    </ul>
  {/each}
</ul>
