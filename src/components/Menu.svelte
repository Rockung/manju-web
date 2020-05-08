<script>
  export let menus
</script>

<style>
</style>

<ul class="navigation">
  {#each menus as m}
    <li><a href="#/menu/{m.href}">{m.text}</a></li>
  {/each}
</ul>
