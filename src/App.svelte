<script>
  import { onMount } from "svelte";

  import Menu from "./components/Menu";
  import Sidebar from "./components/Sidebar";
  import Content from "./components/Content";
  import Nav from "./components/Nav.svelte";
  import Footer from "./components/Footer";

  import { pageStore } from "./store";
  import { handleMount, handleHashChange } from './route'

  let currPage;
  const unsubscribe = pageStore.subscribe((page) => {
    currPage = page;
  })

  // load index.md
  onMount(async () => {
    handleMount();
  });

  // hash-routing
  async function hashChange() {
    handleHashChange();
  }
</script>

<svelte:window on:hashchange={hashChange} />

<div class="manju-web-wrapper">
  <header class="manju-web-header">
    <Menu menu={currPage.menu} />
  </header>
  <main class="manju-web-main">
    <!-- Left sidebar -->
    <aside class="manju-web-aside">
      <Sidebar baseDir={currPage.baseDir} sidebar={currPage.sidebar} />
    </aside>

    <!-- Main content -->
    <article class="manju-web-article">
      <Content contents={currPage.contents} />
    </article>

    <!-- Right sidebar -->
    <nav class="manju-web-nav">
      <Nav anchors={currPage.anchors} />
    </nav>
  </main>
  <footer class="manju-web-footer">
    <Footer />
  </footer>
</div>
