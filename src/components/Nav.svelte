<script>
  export let anchors;
</script>

<style>

</style>

<ul id="manju-web-scroll-spy" class="toc">
  {#each anchors as anchor}
    <li>
      <a href="#{anchor.slug}" class="toc-entry">{anchor.title}</a>
    </li>
  {/each}
</ul>
