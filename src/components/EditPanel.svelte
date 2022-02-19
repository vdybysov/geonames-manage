<script>
    import Button, { Icon, Label } from "@smui/button";
    import LayoutGrid, { Cell } from "@smui/layout-grid";
    import Textfield from "@smui/textfield";
    import AsyncSelect from "./AsyncSelect.svelte";

    export let props;
    export let item;
    export let save;
    export let remove;
</script>

<div class="edit-panel">
    <LayoutGrid>
        {#each props as prop (prop.id)}
            <Cell span={prop.span || 3}>
                {#if prop.type === "text"}
                    <Textfield
                        disabled={!prop.editable}
                        variant="outlined"
                        bind:value={item[prop.id]}
                        label={prop.label}
                    />
                {/if}
                {#if prop.type === "select"}
                    <AsyncSelect
                        label={prop.label}
                        provider={prop.provider}
                        bind:value={item[prop.id]}
                        getOptionLabel={(option) => option?.name || ""}
                    />
                {/if}
            </Cell>
        {/each}
        <Cell span={12}>
            <Button on:click={save} variant="raised">
                <Icon class="material-icons">save</Icon>
                <Label>Сохранить</Label>
            </Button>
            <Button on:click={remove} variant="outlined">
                <Icon class="material-icons">delete</Icon>
                <Label>Удалить</Label>
            </Button>
        </Cell>
    </LayoutGrid>
</div>

<style>
    .edit-panel :global(.mdc-layout-grid) {
        padding: 16px 0;
    }
    .edit-panel :global(.smui-autocomplete) {
        width: 100%;
    }
</style>
