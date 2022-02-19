<script>
    import Button, {
        Icon as ButtonIcon,
        Label as ButtonLabel,
    } from "@smui/button";
    import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
    import LinearProgress from "@smui/linear-progress";
    import Snackbar, { Label } from "@smui/snackbar";
    import Textfield from "@smui/textfield";
    import Icon from "@smui/textfield/icon";
    import { useErrors } from "../hooks/errors";
    import { slide } from "svelte/transition";
    import AccordionRow from "./AccordionRow.svelte";
    import EditPanel from "./EditPanel.svelte";

    const { mapError } = useErrors();

    let errorSnackbar;

    export let idProp;
    export let props;
    export let provider;
    export let saver;

    let loading = false;
    let items = [];
    let searchQuery = "";
    let newItem;
    let expandedItem;
    let errorText = "";
    let loadingQuery;

    const load = async (searchQuery) => {
        loadingQuery = searchQuery;
        loading = true;
        items = [];
        try {
            const loaded = await provider(searchQuery);
            if (loadingQuery !== searchQuery) {
                return;
            }
            for (const item of loaded) {
                await ensureProps(item);
            }
            items = loaded;
        } catch (e) {
            console.error(e);
            errorText = e;
            errorSnackbar && errorSnackbar.open();
        } finally {
            loading = false;
        }
    };

    $: load(searchQuery);

    const ensureProps = async (item) => {
        for (const { id, getDefaultValue } of props) {
            if (getDefaultValue) {
                item[id] = item[id] || (await getDefaultValue());
            }
        }
    };

    const add = async () => {
        if (!newItem) {
            newItem = {};
            await ensureProps(newItem);
            items = [...items, newItem];
        }
        expandedItem = newItem;
    };

    $: visibleProps = props.filter(({ visible }) => visible);

    const save = async (item) => {
        try {
            await saver(item);
            items = items.map((i) => (i[idProp] === item[idProp] ? item : i));
            expandedItem = null;
            newItem = null;
        } catch (e) {
            console.error(e.response);
            errorText = mapError(e.response.data.error);
            errorSnackbar && errorSnackbar.open();
        }
    };
</script>

<Snackbar bind:this={errorSnackbar} labelText={errorText}>
    <Label />
</Snackbar>

<div class="manage-table">
    <Textfield variant="filled" bind:value={searchQuery} label="Поиск">
        <Icon class="material-icons" slot="trailingIcon">search</Icon>
    </Textfield>
    <DataTable>
        <Head>
            <Row>
                {#each visibleProps as prop (prop.id)}
                    <Cell>{prop.label}</Cell>
                {/each}
            </Row>
        </Head>
        <Body>
            {#each items as item}
                <AccordionRow
                    collapsed={item !== expandedItem}
                    onExpand={() => (expandedItem = item)}
                >
                    <slot slot="header">
                        {#each visibleProps as prop (prop.id)}
                            <Cell>
                                {#if prop.getDisplayValue}
                                    {prop.getDisplayValue(item)}
                                {:else}
                                    {item[prop.id]}
                                {/if}
                            </Cell>
                        {/each}
                    </slot>
                    <Cell colspan={visibleProps.length} slot="content">
                        <div transition:slide>
                            <EditPanel {props} {item} save={() => save(item)} />
                        </div>
                    </Cell>
                </AccordionRow>
            {/each}
        </Body>

        <LinearProgress
            indeterminate
            closed={!loading}
            aria-label="Загрузка..."
            slot="progress"
        />
    </DataTable>
    <div class="bottom">
        <Button on:click={add}>
            <ButtonIcon class="material-icons">add</ButtonIcon>
            <ButtonLabel>Добавить</ButtonLabel>
        </Button>
    </div>
</div>

<style>
    .manage-table {
        width: 100%;
        margin-top: 10px;
    }
    .manage-table :global(.mdc-data-table) {
        width: 100%;
        margin-top: 10px;
    }
    .manage-table :global(.mdc-data-table__table-container),
    .manage-table :global(.mdc-data-table__cell) {
        overflow: visible;
    }
    .manage-table :global(.mdc-text-field) {
        width: 100%;
    }
    .manage-table .bottom {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }
</style>
