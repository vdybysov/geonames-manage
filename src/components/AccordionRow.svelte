<script>
    import { Row } from "@smui/data-table";

    export let collapsed = true;
    export let onExpand;

    const toggle = () => {
        collapsed = !collapsed;
        if (!collapsed && onExpand) {
            onExpand();
        }
    };
</script>

<Row class="accordion-row" on:click={toggle}>
    <slot name="header" />
</Row>
{#if !collapsed}
    <slot name="content" />
{/if}

<style>
    :global(.accordion-row) {
        cursor: pointer;
    }
</style>
