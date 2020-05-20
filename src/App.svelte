<script>
  import { onMount } from "svelte";

  import Menu from "./components/Menu";
  import Sidebar from "./components/Sidebar";
  import Content from "./components/Content";
  import Nav from "./components/Nav.svelte";
  import Footer from "./components/Footer";

  import {
    handleIndexPage,
    handleMenuPage,
  } from './app';

  let page = {
    menus: [],
    sidebar: [],
    contents: [],
    anchors: [],
  }

  // load index.md
  onMount(async () => {
    let result = await handleIndexPage();
    page = { ...page, ...result }
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
      let result = await handleMenuPage(path.substring("/m/".length));
      page = { ...page, ...result }
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
    <Menu menus="{ page.menus }" />
  </header>
  <main class="manjusri-main">
    <!-- Left sidebar -->
    <aside class="manjusri-aside">
      <Sidebar sidebar="{ page.sidebar }" />
    </aside>

    <!-- Main content -->
    <article class="manjusri-article">
      <Content contents="{ page.contents }" />
    </article>

    <!-- Right sidebar -->
    <nav class="manjusri-nav">
      <Nav anchors="{ page.anchors }" />
    </nav>
  </main>
  <footer class="manjusri-footer">
    <Footer />
  </footer>
</div>
