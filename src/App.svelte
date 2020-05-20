<script>
  import { onMount } from "svelte";

  import Menu from "./components/Menu";
  import Sidebar from "./components/Sidebar";
  import Content from "./components/Content";
  import Nav from "./components/Nav.svelte";
  import Footer from "./components/Footer";

  import { get_file } from "./utils/network.js";
  import { get_menus } from "./utils/menu_tools";
  import { gen_html_with_spy } from "./utils/md_tools";
  import { MENU, CONTENTS, split_index_file } from "./utils/text_tools.js";

  let menus = [];
  let sidebar = [];
  let contents = "";
  let anchors = [];

  // load index.md
  onMount(async () => {
    let markdown = await get_file("index.md");
    let splits = split_index_file(markdown);
    menus = get_menus(splits[MENU]);
    let html_spy = gen_html_with_spy(splits[CONTENTS]);
    contents = html_spy.html;
    anchors = html_spy.anchors;
  });

  // scroll-spy functions
  let spy;
  import { afterUpdate, onDestroy } from "svelte";
  import ScrollSpy from "./scrollspy";

  afterUpdate(async () => {
    spy = new ScrollSpy("#manjusri-scroll-spy a", { offset: 300 });
    spy.init();
  });

  onDestroy(() => {
    spy.destroy();
  });

  // hash-routing
  async function hashChange() {
    const path = window.location.hash.slice(1);
    if (path.startsWith("/m/")) {
      let markdown = await get_file(path.substring("/m/".length));
      let html_spy = gen_html_with_spy(markdown);
      contents = html_spy.html;
      anchors = html_spy.anchors;
    } else if (path.startsWith("/s/")) {
      // let tokens = tokenMap[path.substring("/s/".length)];
      // if (tokens) {
      //   content = gen_html(tokens);
      // }
    }
  }
</script>

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
      <Content {contents} />
    </article>

    <!-- Right sidebar -->
    <nav class="manjusri-nav">
      <Nav {anchors} />
    </nav>
  </main>
  <footer class="manjusri-footer">
    <Footer />
  </footer>
</div>
