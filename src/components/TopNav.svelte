<script>
    import Tab,{ Label } from "@smui/tab";
    import TabBar from "@smui/tab-bar";
    import { useTabs } from "../hooks/tabs";

    const tabs = useTabs();

    const tabList = [
        {
            id: "cities",
            label: "Города",
        },
        {
            id: "adm",
            label: "Адм. округа",
        },
        {
            id: "countries",
            label: "Страны",
        },
    ];

    let active = tabList[0];

    $: tabs.set(active);
</script>

<TabBar tabs={tabList} let:tab bind:active>
    <Tab {tab}>
        <Label>{tab.label}</Label>
    </Tab>
</TabBar>

<style>
</style>
