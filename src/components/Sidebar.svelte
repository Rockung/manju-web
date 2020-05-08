<script>
  export let sidebar;
</script>

<style>

</style>

<ul>
  {#each sidebar as bar}
    <li>{bar.title}</li>
    <ul>
      {#each bar.children as b}
        <li><a href="#/sidebar/{b.href}">{b.text}</a></li>
      {/each}
    </ul>
  {/each}
</ul>
