<script>
  import { onMount } from "svelte";

  import Menu from "./components/Menu";
  import Sidebar from "./components/Sidebar";
  import Content from "./components/Content";
  import Nav from "./components/Nav.svelte";
  import Footer from "./components/Footer";

  import { get_menus } from "./utils/menu_tools";
  import { gen_html_from_file } from "./utils/md_tools";

  let menus = [];
  let sidebar = [];
  let tokenMap = {};
  let content = "";
  let sections = [];

  onMount(async () => {
    menus = await get_menus();
    let dart  = await gen_html_from_file('dart.md')
    content = dart.html
    sections = dart.sections
  });

  let spy
  import { afterUpdate, onDestroy } from 'svelte'
  import ScrollSpy from './scrollspy'

  afterUpdate( async () =>  {
    spy = new ScrollSpy('#manjusri-scroll-spy a', { offset: 300 })
    spy.init()
  })

  onDestroy( () => {
    spy.destroy()
  })
</script>

<style>

</style>

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
    <nav class="manjusri-nav">
      <Nav {sections} />
    </nav>
  </main>
  <footer class="manjusri-footer">
    <Footer />
  </footer>
</div>
