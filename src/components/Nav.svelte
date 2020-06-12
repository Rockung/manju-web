<script>
  import { afterUpdate, onDestroy } from "svelte";

  import ScrollSpy from "../utils/scrollspy";

  export let anchors;

  // scroll-spy functions
  let spy;

  afterUpdate(async () => {
    spy = new ScrollSpy("#manju-web-scroll-spy a", { offset: 300 });
    spy.init();
  });

  onDestroy(() => {
    spy.destroy();
  });
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
