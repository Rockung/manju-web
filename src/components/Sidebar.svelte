<script>
  import { afterUpdate } from "svelte";

  import Menu from "../utils/menu";

  export let sidebar;

  let nav;

  afterUpdate(async () => {
    nav = new Menu("#manju-web-sidebar a", "current");
    nav.init();
  });
</script>

<style>

</style>

<nav id="manju-web-sidebar" class="navigation">
  {@html sidebar}
</nav>
