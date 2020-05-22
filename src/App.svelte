<script>
  import { onMount } from "svelte";

  import Menu from "./components/Menu";
  import Sidebar from "./components/Sidebar";
  import Content from "./components/Content";
  import Nav from "./components/Nav.svelte";
  import Footer from "./components/Footer";

  import { HASH_MENU, HASH_SIDEBAR } from "./constants";
  import { handleIndexPage, handleMenuPage, handleSidebarPage } from "./app.js";

  let page = {
    baseDir: "",
    menu: [],
    sidebar: [],
    contents: "",
    anchors: []
  };

  let baseUrl;

  // load index.md
  onMount(async () => {
    let href = window.location.href;
    let pos = href.lastIndexOf("/");
    baseUrl = href.substring(0, pos + 1);

    let result = await handleIndexPage(baseUrl + "index.md");
    page = { ...page, ...result, baseDir: "/" };
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
    const hashPath = window.location.hash.slice(1);
    let baseDir, basePath, result;

    if (hashPath.startsWith(HASH_MENU)) {
      basePath = hashPath.substring(HASH_MENU.length);
      result = await handleMenuPage(baseUrl + basePath);
    } else if (hashPath.startsWith(HASH_SIDEBAR)) {
      basePath = hashPath.substring(HASH_SIDEBAR.length);
      result = await handleSidebarPage(baseUrl + basePath);
    }

    if (result) {
      baseDir = basePath.substring(0, basePath.lastIndexOf("/") + 1);
      page = { ...page, ...result, baseDir };
    }
  }
</script>

<svelte:window on:hashchange={hashChange} />

<div class="manjusri-wrapper">
  <header class="manjusri-header">
    <Menu menu={page.menu} />
  </header>
  <main class="manjusri-main">
    <!-- Left sidebar -->
    <aside class="manjusri-aside">
      <Sidebar baseDir={page.baseDir} sidebar={page.sidebar} />
    </aside>

    <!-- Main content -->
    <article class="manjusri-article">
      <Content contents={page.contents} />
    </article>

    <!-- Right sidebar -->
    <nav class="manjusri-nav">
      <Nav anchors={page.anchors} />
    </nav>
  </main>
  <footer class="manjusri-footer">
    <Footer />
  </footer>
</div>
