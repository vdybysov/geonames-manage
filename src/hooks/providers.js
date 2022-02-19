import { useRest } from "./rest"

export const useProviders = () => {

    const provider = rest => (query) =>
        rest.list({ query })
            .then(({ list }) => list)

    return {
        cities: provider(useRest('/manage/city')),
        adm: provider(useRest('/manage/adm')),
        countries: provider(useRest('/manage/country')),
        nextId: () => useRest('/manage/geoName').nextId().then(({ nextId }) => nextId)
    }
}