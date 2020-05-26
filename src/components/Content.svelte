<script>
  import { afterUpdate, onDestroy } from "svelte";

  import ScrollSpy from "../scrollspy";
  import { triggerMathJax } from "../ext/mathjax";
  import { triggerMermaid } from "../ext/mermaid";

  export let contents;

  // scroll-spy functions
  let spy;

  afterUpdate(async () => {
    spy = new ScrollSpy("#manjusri-scroll-spy a", { offset: 300 });
    spy.init();


    triggerMathJax();
    triggerMermaid();
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
