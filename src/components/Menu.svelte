<script>
  import { afterUpdate } from "svelte";

  import Menu from "../utils/menu";

  export let website;
  export let baseUrl;
  export let menu;

  let nav;

  afterUpdate(async () => {
    nav = new Menu("#manju-web-menu a", "current");
    nav.init();
  });
</script>

<style>

</style>

<div class="container">
  <a href={baseUrl} class="logo">{website}</a>
  <nav id="manju-web-menu">
    {@html menu}
  </nav>
</div>
