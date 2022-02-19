<script>
    import ManageTable from "./components/ManageTable.svelte";
    import { useProviders } from "./hooks/providers";
    import { useSavers } from "./hooks/savers";

    const { countries: provider, nextId } = useProviders();
    const { countries: saver } = useSavers();
</script>

<ManageTable
    {saver}
    {provider}
    idProp="geoNameId"
    props={[
        {
            id: "geoNameId",
            label: "ID",
            type: "text",
            visible: true,
            span: 12,
            getDefaultValue: nextId,
        },
        {
            id: "name",
            label: "Название",
            type: "text",
            editable: true,
            visible: true,
            span: 6,
            getDefaultValue: () => "",
        },
        {
            id: "code",
            label: "Код",
            type: "text",
            editable: true,
            visible: true,
            span: 6,
            getDefaultValue: () => "",
        },
    ]}
/>
