<script>
    import ManageTable from "./components/ManageTable.svelte";
    import { useProviders } from "./hooks/providers";
    import { useRemovers } from "./hooks/removers";
    import { useSavers } from "./hooks/savers";

    const { adm: provider, countries, nextId } = useProviders();
    const { adm: saver } = useSavers();
    const { adm: remover } = useRemovers();
</script>

<ManageTable
    {saver}
    {remover}
    {provider}
    idProp="geoNameId"
    props={[
        {
            id: "geoNameId",
            label: "ID",
            type: "text",
            span: 12,
            getDefaultValue: nextId,
            visible: true,
        },
        {
            id: "name",
            label: "Название",
            type: "text",
            editable: true,
            visible: true,
            getDefaultValue: () => "",
            span: 6,
        },
        {
            id: "country",
            label: "Страна",
            type: "select",
            editable: true,
            visible: true,
            getDisplayValue: (item) =>
                item.country?.name ?? item.country?.geoNameId ?? "",
            provider: countries,
            span: 6,
        },
    ]}
/>
