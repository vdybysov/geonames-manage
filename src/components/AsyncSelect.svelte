<script>
    import Autocomplete from "@smui-extra/autocomplete";
    import CircularProgress from "@smui/circular-progress";
    import { Text } from "@smui/list";
    export let provider;
    export let value;
    export let label;
    export let getOptionLabel;

    let counter = 0;

    const search = async (query) => {
        const cnt = ++counter;
        const loaded = await provider(query);
        if (counter !== cnt) {
            return false;
        }
        return loaded;
    };
</script>

<Autocomplete
    textfield$variant="outlined"
    {search}
    bind:value
    showMenuWithNoInput={false}
    {label}
    {getOptionLabel}
>
    <Text
        slot="loading"
        style="display: flex; width: 100%; justify-content: center; align-items: center;"
    >
        <CircularProgress style="height: 24px; width: 24px;" indeterminate />
    </Text>
</Autocomplete>
