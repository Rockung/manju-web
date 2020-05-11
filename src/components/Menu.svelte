<script>
  export let menus;
  
  let current = null;
</script>

<style>

</style>

<ul class="manjusri-menu">
  {#each menus as m}
    <li>
      <a
        href="/#/menu/{m.href}"
        class:manjusri-menu-a-active={current === m}
        on:click={() => (current = m)}>
        {m.text}
      </a>
    </li>
  {/each}
</ul>
