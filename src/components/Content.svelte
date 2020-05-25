<script>
  import { afterUpdate, onDestroy } from "svelte";
  import ScrollSpy from "../scrollspy";
  import Mermaid, { mermaidParse } from "../ext/mermaid";

  export let contents;

  // scroll-spy functions
  let spy;

  afterUpdate(async () => {
    spy = new ScrollSpy("#manjusri-scroll-spy a", { offset: 300 });
    spy.init();

    // https://docs.mathjax.org/en/latest/advanced/typeset.html#
    if (MathJax && MathJax.typeset) {
      MathJax.typeset();
    }

    if (Mermaid.mermaidRender) {
      Mermaid.mermaidRender()
    }
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
