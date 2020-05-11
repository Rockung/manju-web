<script>
  import { onMount } from "svelte";

  import Menu from "./components/Menu";
  import Sidebar from "./components/Sidebar";
  import Content from "./components/Content";
  import Footer from "./components/Footer";

  import { get_menus } from "./utils/menu_tools";
  // import { get_sidebar, gen_html } from "./utils/sidebar_tools";
  import { get_markdown, gen_html } from "./utils/md_tools";

  let menus = [];
  let sidebar = [];
  let tokenMap = {};
  let content = "";

  onMount(async () => {
    menus = await get_menus();
    // sidebar = await get_sidebar();
  });

  async function hashChange() {
    const path = window.location.hash.slice(1);
    console.log(path);
    if (path.startsWith("/menu/")) {
      console.log(path.substring("/menu/".length));
      let markdown = await get_markdown(path.substring("/menu/".length));
      sidebar = markdown.sidebar;
      tokenMap = markdown.tokenMap;
    } else if (path.startsWith("/sidebar/")) {
      let tokens = tokenMap[path.substring("/sidebar/".length)];
      if (tokens) {
        content = gen_html(tokens);
      }
    }
  }
</script>

<style>

</style>

<svelte:window on:hashchange={hashChange} />

<div class="manjusri-wrapper">
  <header class="manjusri-header">
    <Menu {menus} />
  </header>
  <main class="manjusri-main">
    <!-- Left sidebar -->
    <aside class="manjusri-aside">
      <Sidebar {sidebar} />
    </aside>

    <!-- Main content -->
    <article class="manjusri-article">
      <Content {content} />
    </article>

    <!-- Right sidebar -->
    <nav class="manjusri-nav">nav</nav>
  </main>
  <footer class="manjusri-footer">
    <Footer />
  </footer>
</div>
