<script>
  import Adm from "./Adm.svelte";
  import Cities from "./Cities.svelte";
  import TopNav from "./components/TopNav.svelte";
  import Countries from "./Countries.svelte";
  import { setTabs,useTabs } from "./hooks/tabs";

  setTabs();

  const { current } = useTabs();
</script>

<main>
  <TopNav />
  {#if $current.id === "cities"}
    <Cities />
  {/if}
  {#if $current.id === "adm"}
    <Adm />
  {/if}
  {#if $current.id === "countries"}
    <Countries />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: auto;
  }
</style>
