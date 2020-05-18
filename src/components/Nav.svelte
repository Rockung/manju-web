<script>
  export let sections;  
</script>

<style>

</style>

<ul id="manjusri-scroll-spy">
  {#each sections as sec}
    <li>
      <a href="#{sec.slug}">{sec.title}</a>
    </li>
  {/each}
</ul>
