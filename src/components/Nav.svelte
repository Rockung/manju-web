<script>
  export let anchors;
</script>

<style>

</style>

<ul id="manjusri-scroll-spy">
  {#each anchors as anchor}
    <li>
      <a href="#{anchor.slug}">{anchor.title}</a>
    </li>
  {/each}
</ul>
