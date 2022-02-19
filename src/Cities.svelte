<script>
    import ManageTable from "./components/ManageTable.svelte";
    import { useProviders } from "./hooks/providers";
    import { useRemovers } from "./hooks/removers";
    import { useSavers } from "./hooks/savers";

    const { cities: provider, adm, nextId } = useProviders();
    const { cities: saver } = useSavers();
    const { cities: remover } = useRemovers();
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
            visible: true,
            getDefaultValue: nextId,
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
            id: "population",
            label: "Население",
            type: "text",
            editable: true,
            visible: true,
            getDefaultValue: () => "0",
            span: 6,
        },
        {
            id: "latitude",
            label: "Широта",
            type: "text",
            editable: true,
            getDefaultValue: () => "0",
            span: 3,
        },
        {
            id: "longitude",
            label: "Долгота",
            type: "text",
            editable: true,
            getDefaultValue: () => "0",
            span: 3,
        },
        {
            id: "adm",
            label: "Адм. округ",
            type: "select",
            editable: true,
            visible: true,
            getDisplayValue: (item) =>
                item.adm?.name ?? item.adm?.geoNameId ?? "",
            provider: adm,
            span: 6,
        },
    ]}
/>
