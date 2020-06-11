<script>
  import { onMount } from "svelte";

  import Menu from "./components/Menu";
  import Sidebar from "./components/Sidebar";
  import Content from "./components/Content";
  import Nav from "./components/Nav.svelte";
  import Footer from "./components/Footer";

  import { pageStore } from "./store";
  import { handleMount, handleHashChange } from "./route";

  let currPage;
  const unsubscribe = pageStore.subscribe(page => {
    currPage = page;
  });

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

<div>
  <header>
    <Menu
      website={currPage.website}
      baseUrl={currPage.baseUrl}
      menu={currPage.menu} />
  </header>
  <section class="content">
    <div class="container main">
      <div class="row">
        <div class="col-sm-2">
          <Sidebar sidebar={currPage.sidebar} />
        </div>
        <div class="col-sm-7 typography">
          <Content contents={currPage.contents} />
        </div>
        <div class="col-sm-3 toc-container">
          <Nav anchors={currPage.anchors} />
        </div>
      </div>
    </div>
  </section>
  <footer />
</div>
