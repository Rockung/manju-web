<script>
  import { onMount } from "svelte";

  import Menu from "./components/Menu";
  import Sidebar from "./components/Sidebar";
  import Content from "./components/Content";
  import Footer from "./components/Footer";

  import { get_menus } from "./utils/menu_tools";
  import { get_sidebar, gen_html } from "./utils/sidebar_tools";

  let menus = [];
  let sidebar = [];
  let content = ''

  onMount(async () => {
    menus = await get_menus();
    sidebar = await get_sidebar();
  });

  async function hashChange() {
    console.log(window.location.hash)
    const path = window.location.hash.slice(1);
    console.log(path)
    content = await gen_html('dart.md')
  }
</script>

<style>

</style>

<svelte:window on:hashchange={hashChange}/>

<div class="wrapper">
  <header class="header">
    <Menu {menus} />
  </header>
  <article class="main">
    <Content {content} />
  </article>
  <aside class="aside sidebar">
    <Sidebar {sidebar} />
  </aside>
  <aside class="aside aside-2">Aside 2</aside>
  <footer class="footer">
    <Footer />
  </footer>
</div>
