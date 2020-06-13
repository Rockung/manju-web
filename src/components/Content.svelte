<script>
  import { afterUpdate } from "svelte";

  import { triggerMathJax, triggerMermaid, triggerVega } from "../extentions";

  export let contents;

  afterUpdate(async () => {
    triggerMathJax();
    triggerMermaid();
    triggerVega();
  });
</script>

<style>

</style>

<div>
  {@html contents}
</div>
