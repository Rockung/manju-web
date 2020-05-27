<script>
  import { afterUpdate, onDestroy } from "svelte";

  import ScrollSpy from "../scrollspy";
  import { triggerMathJax, triggerMermaid, triggerVega } from "../ext";

  export let contents;

  // scroll-spy functions
  let spy;

  afterUpdate(async () => {
    spy = new ScrollSpy("#manju-web-scroll-spy a", { offset: 300 });
    spy.init();

    triggerMathJax();
    triggerMermaid();
    triggerVega();
  });

  onDestroy(() => {
    spy.destroy();
  });
</script>

<style>
  div {
    margin-left: 20px;
  }
</style>

<div>
  {@html contents}
</div>
