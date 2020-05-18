<script>
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
            href={b.href}
            class:manjusri-aside-active={current === b}
            on:click={() => (current = b)}>
            {b.text}
          </a>
        </li>
      {/each}
    </ul>
  {/each}
</ul>
